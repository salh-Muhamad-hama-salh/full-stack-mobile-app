export default function handler(req, res) {
  // Parse the URL to remove query parameters
  const path = (req.url || "/").split("?")[0];

  if (
    (path === "/health" || path === "/api/health" || path === "/") &&
    req.method === "GET"
  ) {
    return res.status(200).json({
      status: "SUCCESS",
      message: "API is healthy",
    });
  }

  // Default response
  res.status(404).json({ error: "Not found", path: path });
}
