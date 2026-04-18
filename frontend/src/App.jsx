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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-10">
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🏠 Resale Intelligence Engine</h1>

      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
      /><br /><br />

      <input
        name="size"
        placeholder="Size (sq ft)"
        onChange={handleChange}
      /><br /><br />

      <input
        name="age"
        placeholder="Age"
        onChange={handleChange}
      /><br /><br />

      <select name="type" onChange={handleChange}>
        <option>2BHK</option>
        <option>3BHK</option>
      </select><br /><br />

      <button onClick={handleSubmit}>Predict</button>

      {result && (
  <div className="mt-10 grid gap-4">

    <div className="bg-gray-800 p-4 rounded-xl shadow">
      💰 <b>Market Value</b>
      <p>₹{result.market_value_range[0]} - ₹{result.market_value_range[1]}</p>
    </div>

    <div className="bg-red-900 p-4 rounded-xl shadow">
      ⚠ <b>Distress Value</b>
      <p>₹{result.distress_value_range[0]} - ₹{result.distress_value_range[1]}</p>
    </div>

    <div className="bg-gray-800 p-4 rounded-xl shadow">
      📈 <b>Resale Index: {result.resale_index}</b>

      <div className="w-full bg-gray-700 h-3 rounded mt-2">
        <div
          className="bg-green-500 h-3 rounded"
          style={{ width: `${result.resale_index}%` }}
        ></div>
      </div>
    </div>

    <div className="bg-gray-800 p-4 rounded-xl shadow">
      ⏱ <b>Time to Sell:</b> {result.time_to_sell}
    </div>

    <div className="bg-gray-800 p-4 rounded-xl shadow">
      🧠 <b>Confidence:</b> {result.confidence_score}
    </div>

    <div className="bg-gray-800 p-4 rounded-xl shadow">
      🚩 <b>Risks:</b> {result.risk_flags.join(", ") || "None"}
    </div>

    <div className="bg-yellow-700 p-4 rounded-xl shadow">
      ⭐ <b>Key Drivers:</b> {result.key_drivers.join(", ")}
    </div>

  </div>
)}
    </div>
    </div>
  );
}

export default App;