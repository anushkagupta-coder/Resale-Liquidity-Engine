import { useState } from "react";
import axios from "axios";
import Gauge from "../components/Gauge";
import MapView from "../components/MapView";
import Loader from "../components/Loader";

function Dashboard() {
  const [form, setForm] = useState({
    address: "",
    size: "",
    age: "",
    type: "2BHK"
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://resale-liquidity-engine.onrender.com/predict",
        {
          address: form.address,
          size: Number(form.size),
          age: Number(form.age),
          type: form.type
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900 p-6 transition-all duration-300">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Analyze Property
      </h2>

      {/* FORM */}
      <div className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="size"
          placeholder="Size (sq ft)"
          onChange={handleChange}
          className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="age"
          placeholder="Age"
          onChange={handleChange}
          className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 
          text-white font-semibold shadow-md hover:scale-105 transition active:scale-95"
        >
          {loading ? "Analyzing..." : "Predict"}
        </button>
      </div>

      {/* LOADER */}
      {loading && <Loader />}

      {/* RESULTS */}
      {result && (
        <div className="mt-10 grid gap-6 max-w-xl mx-auto">

          {/* MARKET VALUE */}
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 transition hover:scale-[1.02]">
            💰 <b>Market Value</b>
            <p>₹{result.market_value_range[0]} - ₹{result.market_value_range[1]}</p>
          </div>

          {/* DISTRESS VALUE */}
          <div className="bg-red-50 p-4 rounded-xl shadow-md border border-red-200 transition hover:scale-[1.02]">
            ⚠ <b>Distress Value</b>
            <p>₹{result.distress_value_range[0]} - ₹{result.distress_value_range[1]}</p>
          </div>

          {/* GAUGE */}
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 flex flex-col items-center transition hover:scale-[1.02]">
            <h3>Resale Score</h3>
            <Gauge value={result.resale_index} />
            <p>{result.resale_index}/100</p>
          </div>

          {/* TIME */}
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 transition hover:scale-[1.02]">
            ⏱ <b>Time to Sell:</b> {result.time_to_sell}
          </div>

          {/* CONFIDENCE */}
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 transition hover:scale-[1.02]">
            🧠 <b>Confidence:</b> {result.confidence_score}
          </div>

          {/* MAP */}
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 transition hover:scale-[1.02]">
            📍 Location
            <MapView lat={result.lat} lon={result.lon} />
          </div>

          {/* RISKS */}
          <div className="bg-red-50 p-4 rounded-xl shadow-md border border-red-200 transition hover:scale-[1.02]">
            🚩 <b>Risks:</b> {result.risk_flags?.join(", ") || "None"}
          </div>

          {/* DRIVERS */}
          <div className="bg-yellow-50 p-4 rounded-xl shadow-md border border-yellow-200 transition hover:scale-[1.02]">
            ⭐ <b>Key Drivers:</b> {result.key_drivers?.join(", ")}
          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;