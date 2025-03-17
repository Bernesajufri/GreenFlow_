"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { BiMenuAltRight } from "react-icons/bi";
import { useCart } from "./CartContext"; // Import our cart hook

const Navbar = () => {
  const pathname = usePathname();
  const { cartItems } = useCart(); // Get cart items from context

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md flex justify-between items-center p-6 border-b transition-all duration-300 ease-in-out">
      <div className="text-xl font-bold">GREENFLOW</div>

      <div className="flex gap-6">
        <Link
          href="/"
          className={`font-medium ${
            pathname === "/" ? "text-black scale-110" : "text-gray-500"
          } transition-all duration-200 ease-in-out`}
        >
          Home
        </Link>
        <Link
          href="/products"
          className={`font-medium ${
            pathname === "/products" ? "text-black scale-110" : "text-gray-500"
          } transition-all duration-200 ease-in-out`}
        >
          Products
        </Link>
        <Link
          href="/contact"
          className={`font-medium ${
            pathname === "/contact" ? "text-black scale-110" : "text-gray-500"
          } transition-all duration-200 ease-in-out`}
        >
          Message us
        </Link>
      </div>

      <div className="flex gap-3">
        {/* Cart Button - Wrapped in Link with cart count */}
        <Link href="/cart">
          <div className="relative">
            <button className="text-gray-500 hover:scale-110 transition-transform duration-200">
              <FiShoppingCart size={18} />
            </button>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>

        <button className="text-gray-500 hover:scale-110 transition-transform duration-200">
          <FaRegUser size={18} />
        </button>
        <button className="text-gray-500 hover:scale-110 transition-transform duration-200">
          <BiMenuAltRight size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;