import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    isVerifiedEmail: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["student", "teacher"],
      required: true,
    },
    phone: { type: String },
  },
  { timestamps: true }
);

// Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// Generate tokens
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });
};

userSchema.methods.generateResetToken = function () {
  return crypto.randomBytes(32).toString("hex").slice(0, 6);
};

const User = mongoose.model("User", userSchema);
export default User;
