import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { motion } from "framer-motion";

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center bg-white p-10 rounded-2xl shadow-xl"
      >
        <XCircle className="text-red-600 w-20 h-20 mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Failed</h1>
        <p className="text-gray-600 text-center mb-6">
          Oops! Something went wrong. Please try again.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg"
        >
          Retry / Go Home
        </button>
      </motion.div>
    </div>
  );
};

export default Failure;
