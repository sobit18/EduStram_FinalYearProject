

import mongoose from 'mongoose';
import logger from './logger.config.js';
import { initializeDefaultUser } from './initilizeDefaultAdmin.config.js';



const connectDB = async () => {
    try {
        const dbURI = process.env.MONGODB_URI;
        if (!dbURI) throw new Error('MONGODB_URI is missing from environment variables');

        mongoose.set('strictQuery', false);

        mongoose.connection.on('connected', () => {
            logger.info('Mongoose connected to MongoDB');
        });

        mongoose.connection.once('open', async () => {
            logger.info('MongoDB connection opened');
            try {
                await initializeDefaultUser();
            } catch (error) {
                logger.error('Failed to initialize default admin user:', error);
            }
        });

        mongoose.connection.on('error', (error) => {
            logger.error('Mongoose connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
            logger.warn('Mongoose disconnected from MongoDB');
        });

        const conn = await mongoose.connect(dbURI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
        });

        logger.info(`MongoDB Connected: ${conn.connection.host}`);
        logger.info(`Database Name: ${conn.connection.name}`);

        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                logger.info('MongoDB connection closed through app termination');
                process.exit(0);
            } catch (error) {
                logger.error('Error during MongoDB disconnection:', error);
                process.exit(1);
            }
        });

    } catch (error) {
        logger.error('MongoDB connection error:', error);
        if (error instanceof Error) {
            logger.error('Error message:', error.message);
            logger.error('Error stack:', error.stack);
        }
        process.exit(1);
    }
};

export default connectDB;