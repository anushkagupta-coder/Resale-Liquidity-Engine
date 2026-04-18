import { useState } from "react";
import axios from "axios";

function App() {
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

      const res = await axios.post("http://127.0.0.1:8000/predict", {
        address: form.address,
        size: Number(form.size),
        age: Number(form.age),
        type: form.type
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex justify-center items-start pt-10 px-4">
      
      <div className="w-full max-w-xl space-y-6">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Resale Intelligence Engine
        </h1>

        <p className="text-center text-gray-400">
          AI-powered property valuation & liquidity insights
        </p>

        {/* FORM */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/10 p-6 rounded-2xl shadow-xl space-y-4">

          <input
            name="address"
            placeholder="Enter Address"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="size"
            placeholder="Size (sq ft)"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="type"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-700"
          >
            <option>2BHK</option>
            <option>3BHK</option>
          </select>

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition transform font-semibold shadow-lg"
          >
            {loading ? "Analyzing..." : "Predict"}
          </button>

        </div>

        {/* RESULTS */}
        {result && (
          <div className="grid gap-4">

            <div className="backdrop-blur bg-white/10 p-4 rounded-xl shadow">
              💰 <b>Market Value</b>
              <p>₹{result.market_value_range[0]} - ₹{result.market_value_range[1]}</p>
            </div>

            <div className="backdrop-blur bg-red-500/20 p-4 rounded-xl shadow">
              ⚠ <b>Distress Value</b>
              <p>₹{result.distress_value_range[0]} - ₹{result.distress_value_range[1]}</p>
            </div>

            <div className="backdrop-blur bg-white/10 p-4 rounded-xl shadow">
              📈 <b>Resale Index: {result.resale_index}</b>

              <div className="w-full bg-gray-700 h-3 rounded mt-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded"
                  style={{ width: `${result.resale_index}%` }}
                ></div>
              </div>
            </div>

            <div className="backdrop-blur bg-white/10 p-4 rounded-xl shadow">
              ⏱ <b>Time to Sell:</b> {result.time_to_sell}
            </div>

            <div className="backdrop-blur bg-white/10 p-4 rounded-xl shadow">
              🧠 <b>Confidence:</b> {result.confidence_score}
            </div>

            <div className="backdrop-blur bg-white/10 p-4 rounded-xl shadow">
              🚩 <b>Risks:</b> {result.risk_flags.join(", ") || "None"}
            </div>

            <div className="backdrop-blur bg-yellow-400/20 p-4 rounded-xl shadow">
              ⭐ <b>Key Drivers:</b> {result.key_drivers.join(", ")}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;