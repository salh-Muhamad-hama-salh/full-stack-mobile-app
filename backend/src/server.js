import express from "express";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "SUCCESS",
    message: "API is healthy",
  });
});

// Add your other API routes here

export default app;
