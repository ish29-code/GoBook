import { flight_list, hotel_list } from "../../assets/assets";

export default function TopRoutes() {
  const topFlights = flight_list.slice(0, 9); 
  const topHotels = hotel_list.slice(0, 9);   

  return (
    <div className="max-w-6xl mx-auto p-6">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Top Flights from India</h2>
        <p className="text-gray-600 mb-6">Explore destinations you can reach from India and start making new plans</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topFlights.map((flight) => (
            <div key={flight.id} className="flex items-center space-x-4 bg-white shadow-md p-4 rounded hover:shadow-lg transition">
              <img src={flight.logo} alt={flight.airline} className="w-16 h-16 object-cover rounded" />
              <div className="text-sm font-medium">
                {flight.from} → <span className="font-bold">{flight.to}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">Top Hotels in India</h2>
        <p className="text-gray-600 mb-6">Popular hotels to stay at across major Indian cities</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topHotels.map((hotel) => (
            <div key={hotel.id} className="flex items-center space-x-4 bg-white shadow-md p-4 rounded hover:shadow-lg transition">
              <img src={hotel.logo} alt={hotel.name} className="w-16 h-16 object-cover rounded" />
              <div className="text-sm font-medium">
                {hotel.name} <span className="text-gray-600">({hotel.location})</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
