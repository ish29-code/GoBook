import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user")) || {
      username: "Guest",
      email: "user@example.com",
    };

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const { flight, hotel } = location.state || {};
  const booking = flight || hotel;
  const bookingType = flight ? "flight" : "hotel";

  useEffect(() => {
    const loadScript = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setSdkReady(true);
      script.onerror = () => setSdkReady(false);
      document.body.appendChild(script);
    };
    loadScript();
  }, []);

  const handlePayment = async () => {
    if (!sdkReady) {
      alert("Razorpay SDK failed to load. Please try again later.");
      return;
    }

    if (!user.username || user.username === "Guest") {
      alert("You must be logged in to make a payment.");
      return;
    }

    const amountInPaise = Number(booking?.price);

    if (!amountInPaise || amountInPaise < 100) {
      alert("Invalid amount. Payment requires at least ₹1.");
      return;
    }

    const payload = {
      amount: amountInPaise,
      userId: user.username, 
      bookingType,
      bookingId: booking?.id?.toString() || "unknown",
    };

    try {
      const result = await axios.post(
        "http://localhost:8080/api/payment/create",
        payload,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const { id: order_id, currency, amount } = result.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "GoBook",
        description: `${bookingType.charAt(0).toUpperCase() + bookingType.slice(1)} Booking Payment`,
        order_id,
        prefill: {
          name: user?.username,
          email: user?.email,
          contact: "9999999999",
        },
        notes: {
          booking_id: booking?.id?.toString(),
        },
        handler: async function (response) {
          await axios.post(
            "http://localhost:8080/api/payment/verify",
            {
              userId: user.username, 
              orderId: order_id,
              amount,
              status: "success",
              bookingType,
              bookingId: booking?.id?.toString(),
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );

          navigate("/payment-success", { state: { [bookingType]: booking } });
        },
        modal: {
          ondismiss: function () {
            navigate("/payment-failure");
          },
        },
        theme: {
          color: "#0f766e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error.response?.data || error);
      alert("Failed to initiate payment. Check backend or Razorpay setup.");
    }
  };

  if (!booking) {
    return <p className="text-center text-red-500 mt-10">No booking data found.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Confirm Your {bookingType.charAt(0).toUpperCase() + bookingType.slice(1)} Payment
          </h2>

          <div className="space-y-1 text-gray-700">
            <p><strong>User:</strong> {user?.username}</p>
            {bookingType === "flight" ? (
              <>
                <p><strong>Airline:</strong> {booking.airline}</p>
                <p><strong>From:</strong> {booking.from} to {booking.to}</p>
                <p><strong>Departure:</strong> {booking.departureTime}</p>
                <p><strong>Duration:</strong> {booking.duration}</p>
              </>
            ) : (
              <>
                <p><strong>Hotel:</strong> {booking.name}</p>
                <p><strong>Location:</strong> {booking.location}</p>
                <p><strong>Rating:</strong> {booking.rating}</p>
              </>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handlePayment}
              disabled={!sdkReady}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg disabled:opacity-50"
            >
              Pay ₹{booking.price}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;

