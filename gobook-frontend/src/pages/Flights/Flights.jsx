import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { flight_list } from "../../assets/assets";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Flights = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchResults = location.state?.searchResults || flight_list;

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-8 bg-gray-50 ">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 pt-23">
          Available Flights
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 bg-white rounded-lg shadow-sm">
            <thead className="bg-blue-100 text-gray-800">
              <tr className="text-sm sm:text-base">
                <th className="px-10 py-2 text-left whitespace-nowrap">Logo</th>
                <th className="px-10 py-2 text-left whitespace-nowrap">Airline</th>
                <th className="px-10 py-2 text-left whitespace-nowrap">Departure</th>
                <th className="px-10 py-2 text-left whitespace-nowrap">Duration</th>
                <th className="px-10 py-2 text-left whitespace-nowrap">Price</th>
                <th className="px-10 py-2 text-left whitespace-nowrap">Book</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((flight) => (
                <tr
                  key={flight.id}
                  className="hover:bg-gray-100 transition duration-150 text-sm sm:text-base"
                >
                  <td className="px-2 py-0">
                    <img
                      src={flight.logo}
                      alt="Airline Logo"
                      className="w-24 h-16 sm:w-28 sm:h-20 object-contain"
                    />
                  </td>
                  <td className="px-10 py-2">{flight.airline}</td>
                  <td className="px-10 py-2">{flight.departureTime}</td>
                  <td className="px-10 py-2">{flight.duration}</td>
                  <td className="px-10 py-2 font-semibold text-green-600">
                    ₹{flight.price}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => navigate("/payment", { state: { flight } })}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md transition"
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Flights;
