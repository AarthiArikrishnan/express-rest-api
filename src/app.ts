import express from "express";

import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes"
import { requestLogger } from "./middleware/logger";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(requestLogger)

app.use("/auth", authRoutes);
app.use("/posts", postRoutes); 

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

export default app;
