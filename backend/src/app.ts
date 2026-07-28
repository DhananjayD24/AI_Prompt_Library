import express from "express";
import cors from "cors";

import promptRoutes from "./routes/prompt.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

app.use("/api/prompts", promptRoutes);

export default app;