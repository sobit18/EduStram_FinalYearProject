import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ES modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
});

function ensureEnv(name, fallback) {
    const value = process.env[name] || fallback;
    if (value === undefined) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const config = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "3000", 10),
    mongoURI: ensureEnv("MONGODB_URI"),
    jwt: {
        secret: ensureEnv("JWT_SECRET"),
        expiresIn: ensureEnv("JWT_EXPIRES_IN"),
        refreshTokenExpiry: ensureEnv("REFRESH_TOKEN_EXPIERY"),
    },
    // CORS
    allowedOrigins: ensureEnv("ALLOWED_ORIGINS").split(","),
    // Frontend
    frontendUrl: ensureEnv("FRONT_URL"),
    // Logger
    logLevel: process.env.LOG_LEVEL || "info",
};
