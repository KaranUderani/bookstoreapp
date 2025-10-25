import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartProvider';
import { useAuth } from '../contexts/AuthProvider';
import toast from 'react-hot-toast';
// Using the file path you provided
import list from "../../public/list.json"; 

// 1. THIS IS THE NAMED EXPORT
// I have filled in the content section with title, price, and styling.
export function Card({ item, isCategory = false }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { authUser } = useAuth();

  // Handle price display logic
  const displayPrice = item.price === 0 ? 'Free' : `$${item.price.toFixed(2)}`;

  const handleCardClick = () => {
    if (isCategory) {
      // Navigate to genre page
      const genreSlug = item.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/genre/${genreSlug}`);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent card click when clicking button
    
    if (!authUser) {
      toast.error('Please login to add items to cart');
      navigate('/signup');
      return;
    }

    try {
      await addToCart(item);
      toast.success(`${item.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`w-full max-w-sm rounded-lg overflow-hidden shadow-xl bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105 ${isCategory ? 'cursor-pointer' : ''}`}
    >
      
      {/* Card Image */}
      <img 
        className="w-full h-64 object-cover" 
        src={item.image} 
        alt={item.name} 
      />
      
      {/* Card Content */}
      <div className="p-6">
        
        {/* Category Badge (uses cyan) */}
        <span className="inline-block bg-cyan-100 text-cyan-800 text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide dark:bg-cyan-900 dark:text-cyan-200">
          {item.category}
        </span>
        
        {/* Book Name */}
        <h3 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
          {item.name}
        </h3>
        
        {/* Book Title/Subtitle (You asked for this) */}
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          {item.title}
        </p>

        {/* Author if available */}
        {item.author && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
            by {item.author}
          </p>
        )}
        
        <div className="mt-5 flex justify-between items-center">
          
          {/* Price (You asked for this) */}
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {displayPrice}
          </span>
          
          {/* Add to Cart Button (uses the requested gradient) */}
          {!isCategory && (
            <button 
              onClick={handleAddToCart}
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300"
            >
              Add to Cart
            </button>
          )}

          {isCategory && (
            <span className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">
              View Books →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// 2. THIS IS THE DEFAULT EXPORT
// This function renders the *whole grid*
function Cards() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Added responsive grid styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {/* Maps over 'list' from your import */}
        {list.map((item) => (
          <Card key={item.id} item={item} /> // It uses the Card function from above
        ))}
      </div>
    </div>
  );
}

// This line makes 'Cards' (plural) the default export
// This allows: import Cards from './Cards';
export default Cards;