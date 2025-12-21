export default function handler(req, res) {
  if (req.url === "/api/health" && req.method === "GET") {
    return res.status(200).json({
      status: "SUCCESS",
      message: "API is healthy",
    });
  }

  // Default response
  res.status(404).json({ error: "Not found" });
}
