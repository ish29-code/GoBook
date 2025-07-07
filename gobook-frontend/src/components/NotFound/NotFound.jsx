import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-4">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6 text-gray-600">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium transition duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;

