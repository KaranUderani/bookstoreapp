import Cart from "../model/cart.model.js";

// Get user's cart
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        
        let cart = await Cart.findOne({ userId });
        
        // If cart doesn't exist, create an empty one
        if (!cart) {
            cart = new Cart({ userId, items: [] });
            await cart.save();
        }
        
        res.status(200).json(cart);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
};

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { bookId, name, author, title, category, price, image } = req.body;
        
        if (!bookId || !name || price === undefined) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        let cart = await Cart.findOne({ userId });
        
        // If cart doesn't exist, create one
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        
        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(item => item.bookId === bookId);
        
        if (existingItemIndex > -1) {
            // Item exists, increment quantity
            cart.items[existingItemIndex].quantity += 1;
        } else {
            // Add new item
            cart.items.push({
                bookId,
                name,
                author,
                title,
                category,
                price,
                image,
                quantity: 1
            });
        }
        
        await cart.save();
        res.status(200).json({ message: "Item added to cart", cart });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
};

// Update item quantity
export const updateCartItem = async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        const { quantity } = req.body;
        
        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: "Invalid quantity" });
        }
        
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        
        const itemIndex = cart.items.findIndex(item => item.bookId === parseInt(bookId));
        
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        
        res.status(200).json({ message: "Cart updated", cart });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Error updating cart", error: error.message });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        
        cart.items = cart.items.filter(item => item.bookId !== parseInt(bookId));
        await cart.save();
        
        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Error removing from cart", error: error.message });
    }
};

// Clear cart
export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        
        cart.items = [];
        await cart.save();
        
        res.status(200).json({ message: "Cart cleared", cart });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Error clearing cart", error: error.message });
    }
};
