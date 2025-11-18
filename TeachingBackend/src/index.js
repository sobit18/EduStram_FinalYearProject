import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import connectDB from "./config/database.config.js";
import logger from "./config/logger.config.js";
import emailconfig from "./config/email.config.js";
import { config } from "./config/config.js";

const initialize = async () => {
  try {
    await connectDB();
    logger.info("Database connected successfully!");

    const PORT = Number(config.port) || 3000;
    emailconfig.initializeEmail();
    logger.info("Initialize email successfully!");

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to initialize server:", error);
    process.exit(1);
  }
};

initialize();
