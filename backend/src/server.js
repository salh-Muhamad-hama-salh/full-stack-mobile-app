import express from "express";

const app = express();

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "SUCCESS",
    message: "API is healthy",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
