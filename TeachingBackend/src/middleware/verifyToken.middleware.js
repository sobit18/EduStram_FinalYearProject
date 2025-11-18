import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import ApiError from "../utils/apiError.utils.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.authToken) {
      // fix to authToken cookie name as per your login
      token = req.cookies.authToken;
    }

    if (!token) {
      // Throw ApiError instead of res.status(...)
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded token is: ", decoded);

    let user = null;

    switch (decoded.role) {
      case "admin":
        user = await Admin.findById(decoded._id).select("-password");
        if (!user) throw new ApiError(401, "Admin not found");
        break;
      case "teacher":
        user = await User.findById(decoded._id).select("-password");
        if (!user) throw new ApiError(401, "Teacher not found");
        break;
      default:
        user = await User.findById(decoded._id).select("-password");
        if (!user) throw new ApiError(401, "User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    // If err is a JWT error, transform to ApiError for consistency
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return next(new ApiError(401, "Invalid or expired token"));
    }

    // Pass other errors as is to next middleware (your error handler)
    next(err);
  }
};

export const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized: No user found"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "Forbidden: Access denied"));
    }

    next();
  };
};
