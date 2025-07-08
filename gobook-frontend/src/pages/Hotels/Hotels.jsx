import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { hotel_list } from "../../assets/assets";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


const Hotels = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchResults = location.state?.searchResults || hotel_list;


  return (
    <>
      <Navbar />
      <div className="px-4 py-8 min-h-screen bg-gray-100">
        <h1 className="text-3xl pt-35 sm:text-4xl font-bold text-center mb-6">Available Hotels</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md text-sm sm:text-base">
            <thead className="bg-blue-100 text-gray-800">
              <tr>
                <th className="px-10 py-3 text-left whitespace-nowrap">Logo</th>
                <th className="px-10 py-3 text-left whitespace-nowrap">Hotel Name</th>
                <th className="px-10 py-3 text-left whitespace-nowrap">Location</th>
                <th className="px-10 py-3 text-left whitespace-nowrap">Price</th>
                <th className="px-10 py-3 text-left whitespace-nowrap">Rating</th>
                <th className="px-10 py-3 text-left whitespace-nowrap">Book</th>
              </tr>
            </thead>
            <tbody>
              {(searchResults).map((hotel)=> (
                <tr key={hotel.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <img
                      src={hotel.logo}
                      alt={`${hotel.name} Logo`}
                      className="w-40 sm:w-28 h-16 object-contain"
                    />
                  </td>
                  <td className="px-10 py-2">{hotel.name}</td>
                  <td className="px-10 py-3">{hotel.location}</td>
                  <td className="px-10 py-3 font-semibold text-green-600">{hotel.price}</td>
                  <td className="px-10 py-3">{hotel.rating}</td>
                  <td className="px-10 py-3">
                    <button
                      onClick={() => navigate("/payment", { state: { hotel } })}
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

export default Hotels;

