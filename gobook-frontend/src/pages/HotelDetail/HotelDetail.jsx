import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HotelDetail() {
  const { id } = useParams();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch(`https://gogeo-api.onrender.com/api/hotels/${id}/details`)
      .then(res => res.json())
      .then(setInfo);
  }, [id]);

  if (!info) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Hotel Insights</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Nearby POIs</h3>
        <ul className="list-disc pl-5">
          {info.Distances.map((d, i) => (
            <li key={i}>{d.POI}: {d.KM} km</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Review Sentiment</h3>
        <p>Score: {info.Sentiment.Score.toFixed(2)}</p>
        <p>Highlight: {info.Sentiment.KeyPhrase}</p>
      </div>
    </div>
  );
}
