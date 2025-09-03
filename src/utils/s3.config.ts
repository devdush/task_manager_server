import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
  region: process.env.REACT_APP_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
  },
});
console.log("S3 Client Configured", s3Client);

export default s3Client;
