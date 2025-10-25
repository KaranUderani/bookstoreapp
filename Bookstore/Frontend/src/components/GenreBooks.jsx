import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartProvider';
import { useAuth } from '../contexts/AuthProvider';
import toast from 'react-hot-toast';

function GenreBooks() {
    const { genre } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { authUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                // Map genre names to file names
                const genreMap = {
                    'philosophy': 'philosophy',
                    'self-help': 'selfhelp',
                    'fantasy': 'fantasy',
                    'sci-fi': 'scifi',
                    'mystery': 'mystery',
                    'romance': 'romance'
                };
                
                const fileName = genreMap[genre.toLowerCase()] || genre.toLowerCase();
                const response = await fetch(`/books/${fileName}.json`);
                
                if (!response.ok) {
                    throw new Error('Failed to load books');
                }
                
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error loading books:', error);
                toast.error('Failed to load books');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [genre]);

    const handleAddToCart = async (book) => {
        if (!authUser) {
            toast.error('Please login to add items to cart');
            navigate('/signup');
            return;
        }

        try {
            await addToCart(book);
            toast.success(`${book.name} added to cart!`);
        } catch (error) {
            toast.error('Failed to add to cart');
        }
    };

    const formatGenreName = (genre) => {
        return genre
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-white dark:bg-slate-900 pt-20 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto"></div>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">Loading books...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
                <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-10">
                    {/* Header */}
                    <div className="mb-8">
                        <Link to="/course">
                            <button className="mb-4 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Categories
                            </button>
                        </Link>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                            {formatGenreName(genre)} Books
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Explore our collection of {formatGenreName(genre).toLowerCase()} books
                        </p>
                    </div>

                    {/* Books Grid */}
                    {books.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-700 dark:text-gray-300 text-lg">
                                No books found in this category.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {books.map((book) => (
                                <div
                                    key={book.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105"
                                >
                                    <img
                                        className="w-full h-64 object-cover"
                                        src={book.image}
                                        alt={book.name}
                                    />
                                    <div className="p-6">
                                        <span className="inline-block bg-cyan-100 text-cyan-800 text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide dark:bg-cyan-900 dark:text-cyan-200">
                                            {book.category}
                                        </span>
                                        <h3 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
                                            {book.name}
                                        </h3>
                                        {book.author && (
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 font-medium">
                                                by {book.author}
                                            </p>
                                        )}
                                        <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {book.title}
                                        </p>
                                        {book.description && (
                                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500 line-clamp-3">
                                                {book.description}
                                            </p>
                                        )}
                                        <div className="mt-5 flex justify-between items-center">
                                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                                ${book.price.toFixed(2)}
                                            </span>
                                            <button
                                                onClick={() => handleAddToCart(book)}
                                                className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default GenreBooks;
