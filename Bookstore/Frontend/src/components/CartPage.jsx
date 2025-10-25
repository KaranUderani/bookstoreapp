import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartProvider';
import { useAuth } from '../contexts/AuthProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

function Cart() {
    const { cart, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();
    const { authUser } = useAuth();
    const navigate = useNavigate();

    // Redirect if not logged in
    React.useEffect(() => {
        if (!authUser) {
            navigate('/signup');
        }
    }, [authUser, navigate]);

    const handleQuantityChange = (bookId, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(bookId, newQuantity);
    };

    const handleRemove = async (bookId) => {
        await removeFromCart(bookId);
        toast.success('Item removed from cart');
    };

    const handleClearCart = async () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            await clearCart();
            toast.success('Cart cleared');
        }
    };

    if (!authUser) return null;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
                <div className="max-w-7xl container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                        Shopping Cart
                    </h1>

                    {cart.items.length === 0 ? (
                        <div className="text-center py-16">
                            <svg
                                className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Add some books to get started!
                            </p>
                            <button
                                onClick={() => navigate('/course')}
                                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
                            >
                                Browse Books
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2">
                                <div className="space-y-4">
                                    {cart.items.map((item) => (
                                        <div
                                            key={item.bookId}
                                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex gap-4"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-32 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {item.name}
                                                </h3>
                                                {item.author && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        by {item.author}
                                                    </p>
                                                )}
                                                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                                    {item.title}
                                                </p>
                                                <div className="mt-3 flex items-center gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.bookId, item.quantity - 1)}
                                                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.bookId, item.quantity + 1)}
                                                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemove(item.bookId)}
                                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-500">
                                                    ${item.price.toFixed(2)} each
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleClearCart}
                                    className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                    Clear Cart
                                </button>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                                        Order Summary
                                    </h2>
                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                            <span>Subtotal</span>
                                            <span>${getTotal().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                            <span>Shipping</span>
                                            <span className="text-green-600">Free</span>
                                        </div>
                                        <div className="border-t border-gray-300 dark:border-gray-700 pt-3 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                                            <span>Total</span>
                                            <span>${getTotal().toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all">
                                        Proceed to Checkout
                                    </button>
                                    <button
                                        onClick={() => navigate('/course')}
                                        className="w-full mt-3 py-3 border-2 border-cyan-500 text-cyan-500 font-semibold rounded-lg hover:bg-cyan-50 dark:hover:bg-gray-700 transition-all"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Cart;
