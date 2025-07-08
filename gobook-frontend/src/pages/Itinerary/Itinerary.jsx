import { useEffect, useState } from "react";

export default function Itinerary() {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.username || "";

  const fetchItinerary = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://goback-s4mh.onrender.com/api/itinerary/suggest?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      let finalList = [];

      if (search.trim()) {
        const searchTerm = search.trim().toLowerCase();
        finalList = data.filter(item => item.destination.toLowerCase() === searchTerm);
      } else {
        finalList = data.slice(0, 3); 
      }

      setList(finalList);
      setError("");
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Could not load trip data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, []);

  const handleSearch = () => {
    fetchItinerary();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Trip Planner Service</h2>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search destination..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-blue-500">Loading...</p>}

      <ul className="space-y-4">
        {list.map((it, i) => (
          <li key={i} className="p-4 bg-white rounded-lg shadow border-l-4 border-blue-500">
            <div className="text-lg font-bold text-gray-800">{it.destination}</div>
            <div className="text-sm text-gray-600">{it.dateRange}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
