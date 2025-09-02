import { BakeryOrder } from "../../models/Needlu/BakeryOrders.model";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
import { POSCategory } from "../../models/Needlu/Categories.model";
export class BakeryOrdersService {
  static async createOrder(
    cashierId: string,
    items: { productId: string; quantity: number }[],
    totalAmount: number,
    paymentMethod: string
  ) {
    try {
      const order = await BakeryOrder.create({
        cashierId: cashierId,
        items,
        totalAmount,
        paymentMethod,
      });

      return { success: true, data: order };
    } catch (error) {
      console.error("Error creating bakery order:", error);
      return { success: false, error: "Failed to create bakery order" };
    }
  }
  static async getAllOrders() {
    try {
      const orders = await BakeryOrder.find()
        .populate("cashierInfo")
        .populate("items.productId");
      return { success: true, data: orders };
    } catch (error) {
      console.error("Error fetching bakery orders:", error);
      return { success: false, error: "Failed to fetch bakery orders" };
    }
  }
  static async getOrdersOfThisWeekDayByDay() {
    try {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday start
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7); // next Sunday

      const orders = await BakeryOrder.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfWeek, $lt: endOfWeek },
          },
        },
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" }, // 1=Sunday, 7=Saturday
            totalSales: { $sum: "$totalAmount" },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      // map to readable days
      const daysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const formatted = orders.map((o) => ({
        day: daysMap[o._id - 1], // because Mongo starts with Sunday=1
        sales: o.totalSales,
      }));

      return { success: true, data: formatted };
    } catch (error) {
      console.error("Error fetching weekly sales:", error);
      return { success: false, error: "Failed to fetch weekly sales" };
    }
  }
  static async getTodayOrderDetails() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const orders = await BakeryOrder.aggregate([
        {
          $match: {
            createdAt: { $gte: today },
          },
        },
        {
          $project: {
            totalAmount: 1,
            itemsCount: { $size: "$items" }, // count items per order
          },
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$totalAmount" },
            totalOrders: { $sum: 1 },
            totalItems: { $sum: "$itemsCount" }, // sum them up
          },
        },
      ]);

      return { success: true, data: orders };
    } catch (error) {
      console.error("Error fetching today's orders:", error);
      return { success: false, error: "Failed to fetch today's orders" };
    }
  }
  static async getTodaySalesByCategory() {
    try {
      // Get today's start and end time
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const result = await BakeryOrder.aggregate([
        {
          $match: {
            orderDate: { $gte: startOfDay, $lte: endOfDay }, // Only today’s orders
          },
        },
        { $unwind: "$items" }, // Break array of items into separate docs
        {
          $lookup: {
            from: "bakeryitems", // collection name in MongoDB (usually lowercase + plural)
            localField: "items.productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $lookup: {
            from: "poscategories",
            localField: "product.categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $group: {
            _id: "$category.categoryName",
            value: {
              $sum: { $multiply: ["$items.quantity", "$product.price"] }, // qty * price
            },
          },
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            value: 1,
          },
        },
      ]);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error fetching category sales:", error);
      return { success: false, error: "Failed to fetch category sales" };
    }
  }
  static async getDailyCategoryWiseSalesForCurrentMonth() {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    // Get list of all dates in current month
    const allDates = eachDayOfInterval({ start, end }).map((date) =>
      format(date, "yyyy-MM-dd")
    );

    // Get all categories
    const categories = await POSCategory.find({}, { categoryName: 1 }).lean();
    const categoryNames = categories.map((c) => c.categoryName);

    // Get actual sales data
    const rawData = await BakeryOrder.aggregate([
      { $match: { orderDate: { $gte: start, $lte: end } } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "bakeryitems",
          localField: "items.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $lookup: {
          from: "poscategories",
          localField: "product.categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
            category: "$category.categoryName",
          },
          totalSales: {
            $sum: {
              $multiply: ["$items.quantity", "$product.price"],
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          categories: {
            $push: {
              category: "$_id.category",
              sales: "$totalSales",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          categories: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);

    // Convert rawData into a Map for faster lookup
    const dataMap = new Map<string, Record<string, number>>();
    for (const entry of rawData) {
      const salesMap: Record<string, number> = {};
      for (const name of categoryNames) {
        salesMap[name] = 0;
      }
      for (const cat of entry.categories) {
        salesMap[cat.category] = cat.sales;
      }
      dataMap.set(entry.date, salesMap);
    }

    // Create final result with all dates, filling missing ones with 0s
    const result = allDates.map((date) => {
      const sales =
        dataMap.get(date) ||
        Object.fromEntries(categoryNames.map((name) => [name, 0]));
      return { date, ...sales };
    });

    return { success: true, data: result };
  }
}
