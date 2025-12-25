import { Queue } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

const messageQueue = new Queue("message-queue", {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

export const addMessageJob = async (data) => {
  await messageQueue.add("process-message", data);
};
