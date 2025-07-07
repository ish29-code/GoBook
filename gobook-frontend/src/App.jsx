import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Flights from "./pages/Flights/Flights";
import Hotels from "./pages/Hotels/Hotels";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import About from "./pages/About/About";
import Chatbot from "./pages/Chatbot/Chatbot";
import Itinerary from "./pages/Itinerary/Itinerary";
import PricePredictor from "./pages/PricePredictor/PricePredictor.jsx";
import HotelList from "./pages/GeoIntelligence/HotelList.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import Success from "./pages/Payment/Success.jsx";
import Failure from "./pages/Payment/Faliure.jsx";
import History from "./pages/Payment/History.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/footer" element={<Footer />} />
        
        <Route path="/flights" element={<Flights />}  />

        <Route path="/hotels" element={<Hotels />} />

        <Route path="/about" element={<About />} />
        
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/chatbot" element={<Chatbot />} />

        <Route path="/itinerary" element={<Itinerary />} />

        <Route path="/price-predictor" element={<PricePredictor />} />

        <Route path="/geo" element={<HotelList />} />

        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-failure" element={<Failure />} />
        <Route path="/payment-history" element={<History />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
