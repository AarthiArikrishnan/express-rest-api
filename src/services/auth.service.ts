import { User } from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/password.utils";
import { generateRandomToken, generateToken } from "../utils/token.utils";

export const registerUser = async (userDat: any) => {
    const { name, email, password } = userDat;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);
    const verificationToken = generateRandomToken();

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken,
    });

    return user;
};

export const verifyEmail = async (token: string) => {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
        throw new Error("Invalid token");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return user;
};

export const loginUser = async (loginData: any) => {
    const { email, password } = loginData;

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    if (!user.isVerified) {
        throw new Error("Email not verified");
    }

    const token = generateToken({ id: user._id });
    return token;
};
