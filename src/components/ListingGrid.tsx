"use client";

import { useState } from "react";
import { FaRegStar, FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useCart } from "./CartContext"; // Import our cart hook

// Define the type for the Listing
interface Listing {
  id: number;
  title: string;
  price: string;
  desc: string;
  images: string[];
}

const listings: Listing[] = [
  { id: 1, title: "Your Listing 1", price: "100", desc: "This is a detailed description of the listing.", images: ["assets/plant1.jpg", "assets/google.png"] },
  { id: 2, title: "Your Listing 2", price: "200", desc: "Another detailed description for this listing.", images: ["assets/plant3.jpg", "assets/plant4.jpg"] },
  { id: 3, title: "Your Listing 3", price: "300", desc: "Description for listing 3.", images: ["assets/plant5.jpg", "assets/plant6.jpg"] },
  { id: 4, title: "Your Listing 4", price: "400", desc: "Description for listing 4.", images: ["assets/plant7.jpg", "assets/plant8.jpg"] },
  { id: 5, title: "Your Listing 5", price: "500", desc: "Description for listing 5.", images: ["assets/plant9.jpg", "assets/plant10.jpg"] },
];

const ListingGrid = () => {
  // Use the cart context instead of local state
  const { cartItems, addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentListing, setCurrentListing] = useState<Listing | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Convert listing to cart item and add to cart
  const handleAddToCart = (listing: Listing, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Create cart item from listing
    const cartItem = {
      id: listing.id,
      name: listing.title,
      seller: "GREENFLOW", // Default seller
      price: parseFloat(listing.price),
      quantity: 1,
      image: listing.images[0],
      options: { description: listing.desc }
    };
    
    // Add to cart
    addToCart(cartItem);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const openModal = (listing: Listing) => {
    setCurrentListing(listing);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentListing(null);
    setIsFavorite(false);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentListing) {
      setCurrentImageIndex((prev) =>
        prev === currentListing.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentListing) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? currentListing.images.length - 1 : prev - 1
      );
    }
  };

  const selectThumbnail = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Function to check if an item is in the cart
  const isInCart = (id: number) => {
    return cartItems.some(item => item.id === id);
  };

  // Function to handle background click
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only close if the click is directly on the background overlay
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div>
      <div className="w-[65%] flex flex-wrap justify-start gap-8 gap-y-20 p-6 mx-auto">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="w-60 border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white cursor-pointer"
            onClick={() => openModal(listing)}
          >
            {/* Image Placeholder */}
            <img src={listing.images[0]} className="h-36 w-full object-cover" alt={listing.title}></img>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{listing.title}</h3>
              <p className="text-gray-600">${listing.price}</p>
              <p className="text-gray-500">{listing.desc}</p>
            </div>

            {/* Bottom Buttons */}
            <div className="flex justify-between items-center p-4 border-t">
              <button 
                onClick={(e) => handleAddToCart(listing, e)}
                className={`px-3 py-1 rounded-md flex items-center ${
                  isInCart(listing.id) 
                    ? "bg-green-500 text-white" 
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                <FaShoppingCart className="mr-1" />
                {isInCart(listing.id) ? "Added" : "Add to Cart"}
              </button>

              <FaRegStar className="text-gray-600 text-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Cart Items Count Badge */}
      {cartItems.length > 0 && (
        <div className="fixed top-4 right-4 bg-red-500 text-white rounded-full px-3 py-1 flex items-center">
          <FaShoppingCart className="mr-1" /> {cartItems.length}
        </div>
      )}

      {/* Modal with background click handler */}
      {isModalOpen && currentListing && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleBackgroundClick}
        >
          <div className="bg-white rounded-lg w-[90%] max-w-5xl flex flex-col md:flex-row h-[90vh] max-h-[700px] overflow-hidden">
            {/* Left Side - Images */}
            <div className="relative w-full md:w-2/3 bg-gray-200 flex flex-col">
              {/* Main Image */}
              <div className="relative flex-grow flex items-center justify-center">
                <img
                  src={currentListing.images[currentImageIndex]}
                  alt={currentListing.title}
                  className="max-h-full max-w-full object-contain"
                />

                {/* Favorite Button */}
                <button
                  onClick={toggleFavorite}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md"
                >
                  {isFavorite ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-500 text-xl" />
                  )}
                </button>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md"
                >
                  <IoIosArrowBack className="text-gray-700 text-xl" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md"
                >
                  <IoIosArrowForward className="text-gray-700 text-xl" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="h-20 p-2 flex items-center">
                {currentListing.images.map((image, index) => (
                  <div
                    key={index}
                    className={`h-16 w-16 mr-2 cursor-pointer border-2 ${index === currentImageIndex ? 'border-gray-700' : 'border-gray-300'}`}
                    onClick={() => selectThumbnail(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="w-full md:w-1/3 p-6 flex flex-col">
              {/* Price */}
              <div className="text-2xl font-semibold mb-6">
                $ {currentListing.price}
              </div>

              {/* Add to Cart Button in Modal */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentListing) {
                    handleAddToCart(currentListing, e);
                  }
                }}
                className={`mb-6 py-2 px-4 rounded-md flex items-center justify-center ${
                  isInCart(currentListing.id) 
                    ? "bg-green-500 text-white" 
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                }`}
              >
                <FaShoppingCart className="mr-2" />
                {isInCart(currentListing.id) ? "Added to Cart" : "Add to Cart"}
              </button>

              {/* Account Section */}
              <div className="mb-8">
                <h3 className="text-sm font-bold mb-2">YOUR ACCOUNT</h3>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase">EXAMPLE</p>
                  <select className="w-full p-2 border border-gray-300 rounded mt-1">
                    <option>Select an example</option>
                  </select>
                </div>
              </div>

              {/* Related Items */}
              <div className="mt-auto">
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex flex-col items-center">
                      <div className="w-full aspect-square bg-gray-300 mb-1"></div>
                      <p className="text-xs text-center">Example Item</p>
                      <p className="text-xs text-gray-500 text-center">Your Account</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingGrid;