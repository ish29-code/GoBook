import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Itinerary from "../../pages/Itinerary/Itinerary";
import PricePredictor from "../../pages/PricePredictor/PricePredictor";

const About = () => {
  const [showPredictor, setShowPredictor] = useState(false);

  return (
    <>
      <Navbar />

      <div className="mt-20 px-4 md:px-10 max-w-8xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-6 items-start">
          <div className="w-full md:w-auto md:min-w-[450px] md:max-w-[320px]">
            <Itinerary />
          </div>

          <div className="w-full flex-1 p-6 bg-gray-50 rounded shadow min-h-[600px]">
            <h1 className="text-4xl font-bold text-black-800 mb-4">About GoBook</h1>

            <p className="text-gray-700 leading-relaxed text-lg">
              <strong>GoBook</strong> is your AI-powered travel planner built to make trip planning smarter, faster, and easier. We’ve packed it with modern features that actually work — not just buzzwords.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              From booking flights and hotels to creating personalized itineraries, GoBook uses machine learning to simplify every step. Our <strong>Smart Itinerary Generator</strong> gives you tailored trip suggestions. The <strong>Price Prediction</strong> tool helps you know when to book flights or hotels for the best rates.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              There’s also a friendly <strong>AI Chatbot</strong> to answer your questions, a <strong>Geo Intelligence</strong> service that shows nearby attractions and sentiment analysis.
            </p>

            <p className="mt-4 text-gray-700">
              Security and reliability are paramount. GoBook uses secure authentication protocols for login, account management, and payment. Whether it’s signing up or making a booking, your data is protected with modern encryption and cloud best practices.
            </p>

            <p className="mt-4 text-gray-700">
              The platform is built with a microservices architecture for scalability and modularity. Each feature — whether it’s itinerary generation, flight/hotel price prediction, sentiment analysis, or chatbot communication — is encapsulated in its own service, ensuring high availability and maintainability.
            </p>

            <p className="mt-4 text-gray-700">
              Our database is backed by a robust NoSQL system, MongoDB, which ensures that user data, booking history, search patterns, and preferences are stored and queried with efficiency. This backbone allows GoBook to deliver fast responses and rich personalization.
            </p>

            <p className="mt-4 text-gray-700">
              With the integration of cloud services, GoBook is not bound by region or device. Whether you access it on mobile, tablet, or desktop, the platform provides a consistent, optimized experience powered by distributed servers and efficient APIs.
            </p>

            <div className="mt-6">
              <button
                className="px-6 py-3 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800 transition"
                onClick={() => setShowPredictor(!showPredictor)}
              >
                {showPredictor ? "Hide Price Prediction" : "Predict Flight & Hotel Prices"}
              </button>
            </div>

            {showPredictor && (
              <div className="mt-8">
                <PricePredictor />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default About;
