import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req?.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await AuthService.registerUser({ name, email, password });
    // TODO: Send verification email with the token (handled in service, potential improvement to return token/logic here)

    res.status(201).json({ message: "Registered successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    await AuthService.verifyEmail(token);
    res.json({ message: "Email verified" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const token = await AuthService.loginUser({ email, password });
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
