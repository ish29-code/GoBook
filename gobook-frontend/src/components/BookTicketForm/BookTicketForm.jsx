import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { flight_list, hotel_list } from "../../assets/assets";

const BookingTicketForm = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(localStorage.getItem("token") !== null);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    Guests : 1,
    days: 1, 
    checkInTime: "", // For hotel only
    departuretime: "", // For flights only
  });

  const [activeTab, setActiveTab] = useState("flights");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };



  const handleSubmit = (e) => {
  e.preventDefault();
  let results;

  if (activeTab === "flights") {
    results = flight_list.filter(
      (flight) =>
        flight.from.toLowerCase() === formData.from.toLowerCase() &&
        flight.to.toLowerCase() === formData.to.toLowerCase()
    );
  } else {
    results = hotel_list.filter(
      (hotel) =>
        hotel.location.toLowerCase() === formData.to.toLowerCase()
    );
  }

  navigate(`/${activeTab}`, { state: { searchResults: results, formData } });
};


  if (!isLoggedIn) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-2xl mb-6">Please Log in to Book Your Ticket</h2>
        <button
          className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-center text-2xl font-semibold text-black/80 mb-6">Book Your Ticket from GoBook</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-5 py-2 border rounded ${
            activeTab === "flights" ? "bg-blue-600 text-white" : "bg-gray-100 text-black"
          }`}
          onClick={() => handleTabChange("flights")}
        >
          Flights
        </button>
        <button
          className={`px-5 py-2 border rounded ${
            activeTab === "hotels" ? "bg-blue-600 text-white" : "bg-gray-100 text-black"
          }`}
          onClick={() => handleTabChange("hotels")}
        >
          Hotels
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="flex flex-col">
          <label htmlFor="from" className="font-semibold mb-1">From</label>
          <input
            type="text"
            id="from"
            name="from"
            placeholder="Departure Location"
            value={formData.from}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-xl text-black/70"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="to" className="font-semibold mb-1">To</label>
          <input
            type="text"
            id="to"
            name="to"
            placeholder="Destination Location"
            value={formData.to}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-xl text-black/70"
          />
        </div>

        {activeTab === "flights" && (
          <>
            <div className="flex flex-col">
              <label htmlFor="departureDate" className="font-semibold mb-1">Departure Date</label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-xl text-black/70"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="returnDate" className="font-semibold mb-1">Return Date</label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-xl text-black/70"
              />
            </div>
          </>
        )}

        {activeTab === "hotels" && (
          <div className="flex flex-col">
            <label htmlFor="days" className="font-semibold mb-1">Days of Booking</label>
            <input
              type="number"
              id="days"
              name="days"
              min="1"
              value={formData.days}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-xl text-black/70"
            />
          </div>
        )}
        {activeTab === "hotels" && (
          <div className="flex flex-col">
          <label htmlFor="checkInTime" className="font-semibold mb-1">Check-In Time</label>
          <input
           type="time"
           id="checkInTime"
           name="checkInTime"
           value={formData.checkInTime}
           onChange={handleChange}
           required
           className="p-3 border border-gray-300 rounded-xl text-black/70"
         />
         </div>
       )}

       {activeTab === "flights" && (
          <div className="flex flex-col">
          <label htmlFor="departuretime" className="font-semibold mb-1">Departure-Time</label>
          <input
           type="time"
           id="departuretime"
           name="departuretime"
           value={formData.checkInTime}
           onChange={handleChange}
           required
           className="p-3 border border-gray-300 rounded-xl text-black/70"
         />
         </div>
       )}

       {activeTab === "hotels" && (
        <div className="flex flex-col">
          <label htmlFor="Guests" className="font-semibold mb-1">Guests</label>
          <input
            type="number"
            id="Guests"
            name="Guests"
            min="1"
            value={formData.passengers}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-xl text-black/70"
          />
        </div>
        )}
        {activeTab === "flights" && (
          <div className="flex flex-col">
            <label htmlFor="passengers" className="font-semibold mb-1">Passengers</label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              min="1"
              value={formData.passengers}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-xl text-black/70"
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md mx-auto block"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default BookingTicketForm;
