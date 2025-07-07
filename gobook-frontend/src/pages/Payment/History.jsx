import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";

const History = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user")) || {
      username: "Guest",
    };

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user.username || user.username === "Guest") {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/payment/history/${user.username}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Failed to fetch payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user.username, token]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold pt-20 text-center mb-8">
            🧾 Payment History
          </h1>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : !Array.isArray(payments) || payments.length === 0 ? (
            <p className="text-center text-gray-500">No payments found.</p>
          ) : (
            <div className="space-y-6">
              {payments.map((payment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, translateY: 30 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white shadow-md rounded-lg p-6 border border-green-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-green-800 capitalize">
                      {payment.bookingType} Booking
                    </h2>
                    <span className="text-sm text-gray-500">
                      {new Date(payment.paidAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <strong>Booked by:</strong> {payment.userId}
                    </p>
                  <p>
                    <strong>Booking ID:</strong> {payment.bookingId}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{payment.amount / 100}
                  </p>
                  <p>
                    <strong>Status:</strong> {payment.status}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default History;

