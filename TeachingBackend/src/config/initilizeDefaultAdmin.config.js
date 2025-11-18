import Admin from "../models/Admin.js";
import logger from "./logger.config.js";

export const initializeDefaultUser = async () => {
  try {
    const count = await Admin.countDocuments();

    if (count === 0) {
      const defaultUser = {
        name: process.env.DEFAULT_ADMIN_NAME || "Super Admin",
        email: process.env.DEFAULT_ADMIN_EMAIL || "sobit@gmail.com",
        password: process.env.DEFAULT_ADMIN_PASSWORD || "sobit123456",
        role: "admin",
      };

      // Validate required environment variables
      if (
        !process.env.DEFAULT_ADMIN_EMAIL ||
        !process.env.DEFAULT_ADMIN_PASSWORD
      ) {
        logger.warn(
          "Default admin credentials not properly configured in environment variables"
        );
      }

      const adminUser = new Admin(defaultUser);
      await adminUser.save();

      logger.info("Default admin user created successfully");
      logger.info(`Email: ${defaultUser.email}`);
      logger.info("Please change the default password after first login");
    } else {
      logger.info("Admin users already exist in the database");
    }
  } catch (error) {
    logger.error("Error creating default admin user:", error);
    throw error;
  }
};
