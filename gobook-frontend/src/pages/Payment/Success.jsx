import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="flex flex-col items-center bg-white p-10 rounded-2xl shadow-xl"
      >
        <CheckCircle className="text-green-600 w-20 h-20 mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 text-center mb-6">
          Your booking has been confirmed. Thank you for choosing GoBook!
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg"
        >
          Go to Homepage
        </button>
      </motion.div>
    </div>
  );
};

export default Success;
