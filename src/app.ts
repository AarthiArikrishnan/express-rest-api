import express from "express";

import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes"

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/posts", postRoutes); 

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

export default app;
