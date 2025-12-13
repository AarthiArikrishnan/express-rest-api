import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req?.body;

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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are requierd" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  if (!user.isVerified)
    return res.status(400).json({ message: "Email not verified" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.json({ token });
};
