import { Router } from "express";
import { BakeryOrdersController } from "../../controllers/Needlu/bakeryOrders.controller";
export const bakeryOrders = Router();

bakeryOrders.post("/", BakeryOrdersController.createOrder);
bakeryOrders.get("/", BakeryOrdersController.getAllOrders);
bakeryOrders.get(
  "/this-week",
  BakeryOrdersController.getOrdersOfThisWeekDayByDay
);
bakeryOrders.get("/today-details", BakeryOrdersController.getTodayOrderDetails);
bakeryOrders.get(
  "/today-sales",
  BakeryOrdersController.getTodaySalesByCategory
);
bakeryOrders.get(
  "/daily-category-sales",
  BakeryOrdersController.getDailyCategoryWiseSalesForCurrentMonth
);
