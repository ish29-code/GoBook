import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 mt-24">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-blue-500 text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm leading-relaxed">
            GoBook is your ultimate platform for booking flights and hotels at
            the best prices. We aim to make your travel hassle-free and enjoyable!
          </p>
        </div>

        <div className="flex-1 min-w-[250px]">
          <h3 className="text-blue-500 text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/flights" className="hover:text-blue-400 transition-colors">Flights</Link>
            </li>
            <li>
              <Link to="/hotels" className="hover:text-blue-400 transition-colors">Hotels</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="flex-1 min-w-[250px]">
          <h3 className="text-blue-500 text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm mb-2">Email: support@gobook.com</p>
          <p className="text-sm mb-2">Phone: +123 456 7890</p>
          <p className="text-sm">Address: 123 Travel Lane, Wanderlust City</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center mt-10 pt-4 text-sm">
        &copy; 2025 GoBook. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
