import authRoutes from "./routes/auth.routes";

import express from "express";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

export default app;
