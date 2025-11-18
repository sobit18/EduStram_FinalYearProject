import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "./config/logger.config.js";
import compression from "compression";
import router from "./routes/index.js";
import errorMiddleware from "./middleware/error.middleware.js";
import rateLimit from "express-rate-limit";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";
import passport from "passport";
import "./config/passport.js"; // <-- make sure this path is correct


const app = express();

const isProd = process.env.NODE_ENV === "production";

app.set("trust proxy", isProd ? "loopback, linklocal, uniquelocal" : false);

app.use(helmet());

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174","http://localhost:5175"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 1000,
});
app.use("/api/", limiter);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProd,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// 🔹 Passport initialization (must be after session)
app.use(passport.initialize());
app.use(passport.session());



app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(compression());

app.use(cookieParser());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });
  next();
});

app.set("view engine", "hbs");

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api", router);

// Error middleware (no type casting needed in JS)
app.use(errorMiddleware);

export { app };
