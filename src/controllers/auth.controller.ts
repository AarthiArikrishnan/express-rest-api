import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../models/user.model";

export const register = async (req: Request, res: Response) => {
  console.log("Request Body:", req.body);

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(32).toString("hex");

  await User.create({
    name,
    email,
    password: hashedPassword,
    verificationToken: token,
  });

  // TODO: Send verification email with the token

  res.status(201).json({ message: "Registered successfully" });
};

export const verify = async (req: Request, res: Response) => {
  const { token } = req.params;

  const user = await User.findOne({ verificationToken: token });
  if (!user) return res.status(400).json({ message: "Invalid token" });

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  res.json({ message: "Email verified" });
};
