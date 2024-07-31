import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProducts,
  getProductsByID,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middlewares/authMidlleware.js";
const router = express.Router();

router.route("/top").get(getTopProducts);
router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductsByID)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router.route("/:id/review").post(protect, createProductReview);

export default router;
