import React, { useEffect, useState } from "react";
import axios from "axios";
import { hotel_list, hotelGeoLookup } from "../../assets/assets";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const GeoIntelligence = ({ hotelId }) => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hotelId) {
      setError("Hotel ID is missing.");
      setLoading(false);
      return;
    }

    const fetchGeoData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/hotels/${hotelId}/details`
        );
        setGeoData(response.data);
        setError("");
      } catch (err) {
        const message =
          err.response?.data?.error ||
          `Failed to fetch geo intelligence (status ${err.response?.status || 500})`;
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoData();
  }, [hotelId]);

  if (loading) return <p className="text-gray-500 text-sm">Loading Geo Intelligence...</p>;
  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  return (
    <div className="bg-gray-100 p-3 mt-3 rounded-xl border">
      <h3 className="text-md font-semibold text-green-700 mb-2">Geo Intelligence</h3>
      <div className="text-sm mb-2">
        <p className="font-medium text-gray-700 mb-1">Nearby Points of Interest:</p>
        <ul className="list-disc list-inside text-gray-600">
          {geoData?.Distances?.map((poi, index) => (
            <li key={index}>
              <strong>{poi.POI}</strong> – {poi.KM} km
            </li>
          ))}
        </ul>
      </div>
      <div className="text-sm">
        <p><strong>Sentiment Score:</strong> {geoData.Sentiment.Score}</p>
        <p><strong>Key Phrase:</strong> {geoData.Sentiment.KeyPhrase}</p>
      </div>
    </div>
  );
};

const MapUpdater = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.setView([coords.Lat, coords.Lng], 12);
    }
  }, [coords, map]);

  return null;
};

const HotelList = () => {
  const center = [20.5937, 78.9629];
  const [search, setSearch] = useState("");
  const [searchedCoords, setSearchedCoords] = useState(null);

  const handleSearch = () => {
    const foundHotel = hotel_list.find(
      (hotel) => hotel.name.toLowerCase().includes(search.toLowerCase())
    );

    if (foundHotel) {
      const id = foundHotel.id.toString();
      const coords = hotelGeoLookup[id];
      if (coords) setSearchedCoords(coords);
    } else {
      alert("Hotel not found!");
    }
  };

  const markers = hotel_list.map((hotel) => {
    const id = hotel.id.toString();
    const coords = hotelGeoLookup[id];
    return coords ? (
      <Marker key={id} position={[coords.Lat, coords.Lng]}>
        <Popup>
          <strong>{hotel.name}</strong><br />{hotel.location}<br />{hotel.price} • {hotel.rating}
        </Popup>
      </Marker>
    ) : null;
  });

  return (
    <div className="relative z-0">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-6 z-10 relative">
        <h1 className="text-3xl font-bold pt-20 mb-6 text-center">Discover Your Stay</h1>

        <div className="flex justify-center mb-4 gap-2">
          <input
            type="text"
            placeholder="Search hotel name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-md w-1/2"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="order-1 md:order-2 h-[400px] md:h-[650px] w-full rounded-2xl overflow-hidden">
            <MapContainer center={center} zoom={5} scrollWheelZoom={true} style={{ height: "100%", width: "100%", zIndex: 0 }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              {markers}
              <MapUpdater coords={searchedCoords} />
            </MapContainer>
          </div>

          <div className="order-2 md:order-1 space-y-6">
            {hotel_list.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={hotel.logo}
                    alt={hotel.name}
                    className="w-20 h-20 rounded-xl object-cover border"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{hotel.name}</h2>
                    <p className="text-gray-600">{hotel.location}</p>
                    <p className="text-sm text-gray-500">
                      {hotel.price} • {hotel.rating}
                    </p>
                  </div>
                </div>
                <GeoIntelligence hotelId={hotel.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HotelList;
