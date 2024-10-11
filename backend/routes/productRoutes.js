import express from "express";
import formidable from "express-formidable";
const router = express.Router();
import { addProduct, updateProductDetails, removeProduct, fetchProducts, fetchProductById, fetchAllproducts, addProductReview, fetchTopProducts, fetchNewProducts, filterProducts } from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";

router.route("/").get(fetchProducts).post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllproducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router.route("/:id").get(fetchProductById).put(authenticate, authorizeAdmin, formidable(), updateProductDetails).delete(authenticate, authorizeAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;
