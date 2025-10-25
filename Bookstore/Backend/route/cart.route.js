import express from "express";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../controller/cart.controller.js";

const router = express.Router();

// Get user's cart
router.get("/:userId", getCart);

// Add item to cart
router.post("/:userId", addToCart);

// Update item quantity
router.put("/:userId/:bookId", updateCartItem);

// Remove item from cart
router.delete("/:userId/:bookId", removeFromCart);

// Clear cart
router.delete("/:userId", clearCart);

export default router;
