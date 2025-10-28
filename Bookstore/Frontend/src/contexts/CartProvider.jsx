import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });
    const [cartCount, setCartCount] = useState(0);
    const { authUser } = useAuth();

    // Fetch cart when user is logged in
    useEffect(() => {
        if (authUser) {
            fetchCart();
        } else {
            setCart({ items: [] });
            setCartCount(0);
        }
    }, [authUser]);

    // Update cart count whenever cart items change
    useEffect(() => {
        const count = cart.items.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
    }, [cart]);

    const fetchCart = async () => {
        if (!authUser) return;
        
        try {
            const response = await axios.get(`https://bookstoreapp-01kq.onrender.com/cart/${authUser._id}`);
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const addToCart = async (book) => {
        if (!authUser) {
            alert('Please login to add items to cart');
            return;
        }

        try {
            const response = await axios.post(`https://bookstoreapp-01kq.onrender.com/cart/${authUser._id}`, {
                bookId: book.id,
                name: book.name,
                author: book.author,
                title: book.title,
                category: book.category,
                price: book.price,
                image: book.image
            });
            setCart(response.data.cart);
            return response.data;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };

    const updateQuantity = async (bookId, quantity) => {
        if (!authUser) return;

        try {
            const response = await axios.put(`https://bookstoreapp-01kq.onrender.com/cart/${authUser._id}/${bookId}`, {
                quantity
            });
            setCart(response.data.cart);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const removeFromCart = async (bookId) => {
        if (!authUser) return;

        try {
            const response = await axios.delete(`https://bookstoreapp-01kq.onrender.com/cart/${authUser._id}/${bookId}`);
            setCart(response.data.cart);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const clearCart = async () => {
        if (!authUser) return;

        try {
            const response = await axios.delete(`https://bookstoreapp-01kq.onrender.com/cart/${authUser._id}`);
            setCart(response.data.cart);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const getTotal = () => {
        return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            cartCount,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            getTotal,
            fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
