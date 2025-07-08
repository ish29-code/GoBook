import { useState, useEffect } from "react";
import { flight_list, hotel_list } from "../../assets/assets";

export default function PricePredictor() {
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [flightPrices, setFlightPrices] = useState({});
  const [hotelPrices, setHotelPrices] = useState({});

  const getRandomItems = (list, count = 3) => {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setFlights(getRandomItems(flight_list));
    setHotels(getRandomItems(hotel_list));
  }, []);

  const predictFlight = async (item) => {
    const body = {
      from: item.from,
      to: item.to,
      days_to_dep: 7,
    };

    try {
      const res = await fetch("https://goback-s4mh.onrender.com/api/predict/flight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok && data.price !== undefined) {
        setFlightPrices((prev) => ({ ...prev, [item.id]: data.price }));
      } else {
        console.error("Flight prediction failed:", data);
        alert("Flight prediction failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Network error during flight prediction:", err);
      alert("Network error during flight prediction.");
    }
  };

  const predictHotel = async (item) => {
    const body = {
      location: item.location,
      nights: 3,
    };

    try {
      const res = await fetch("https://goback-s4mh.onrender.com/api/predict/hotel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok && data.price !== undefined) {
        setHotelPrices((prev) => ({ ...prev, [item.id]: data.price }));
      } else {
        console.error("Hotel prediction failed:", data);
        alert("Hotel prediction failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Network error during hotel prediction:", err);
      alert("Network error during hotel prediction.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">AI Price Prediction</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Flights</h3>
        <ul className="space-y-4">
          {flights.map((f) => (
            <li key={f.id} className="flex justify-between items-center bg-gray-50 p-4 rounded border-l-4 border-blue-500">
              <div>
                <p className="text-lg font-medium text-gray-800">
                  {f.airline}: {f.from} → {f.to}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <button
                  onClick={() => predictFlight(f)}
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Predict
                </button>
                {flightPrices[f.id] !== undefined && (
                  <p className="mt-2 text-green-600 font-semibold">
                    ₹{flightPrices[f.id].toFixed(2)}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Hotels</h3>
        <ul className="space-y-4">
          {hotels.map((h) => (
            <li key={h.id} className="flex justify-between items-center bg-gray-50 p-4 rounded border-l-4 border-blue-500">
              <div>
                <p className="text-lg font-medium text-gray-800">
                  {h.name} ({h.location})
                </p>
              </div>
              <div className="flex flex-col items-end">
                <button
                  onClick={() => predictHotel(h)}
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Predict
                </button>
                {hotelPrices[h.id] !== undefined && (
                  <p className="mt-2 text-green-600 font-semibold">
                    ₹{hotelPrices[h.id].toFixed(2)}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
