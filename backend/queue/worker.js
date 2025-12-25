import { Worker } from "bullmq";
import dotenv from "dotenv";
dotenv.config();

const messageQueue = new Worker(
  "message-queue",

  async (job) => {
    const { username, message } = job.data;

    // Do async task (DB save, logging, analytics, etc.)
    // await new Promise((r) => setTimeout(r, 300));

    console.log(`Processed message from ${username}: ${message}`);
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    // This will run number of task at a time you can change it according to your need
    concurrency: 5,
  }
);

messageQueue.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

messageQueue.on("failed", (job) => {
  console.log(`Job ${job.id} failed`);
});
