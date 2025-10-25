import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema({
    bookId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    author: String,
    title: String,
    category: String,
    price: {
        type: Number,
        required: true,
    },
    image: String,
    quantity: {
        type: Number,
        default: 1,
        min: 1,
    },
});

const cartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    items: [cartItemSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update the updatedAt field before saving
cartSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
