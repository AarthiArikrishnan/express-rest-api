import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateToken = (payload: object, expiresIn: string | number = "1h"): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: expiresIn as any });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const generateRandomToken = (length: number = 32): string => {
    return crypto.randomBytes(length).toString("hex");
};
