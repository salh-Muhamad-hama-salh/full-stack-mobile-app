import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/admin.controller.js";
import { adminOnly, protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, adminOnly);

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", updateProduct);
export default router;
