import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900 flex flex-col justify-center items-center text-center px-4 transition-all duration-300">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-gray-900"
      >
        ResaleIQ
      </motion.h1>

      {/* SUBTEXT */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-gray-600 max-w-xl"
      >
        AI-powered property resale intelligence platform that helps you estimate value, risk, and liquidity instantly.
      </motion.p>

      {/* BUTTON */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={() => navigate("/dashboard")}
        className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md 
        hover:scale-105 transition active:scale-95 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
      >
        Analyze Property 🚀
      </motion.button>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl">

        {/* CARD 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transition"
        >
          📊
          <h3 className="font-semibold mt-2">AI Prediction</h3>
          <p className="text-sm text-gray-500">Smart price estimation</p>
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transition"
        >
          📍
          <h3 className="font-semibold mt-2">Location Intelligence</h3>
          <p className="text-sm text-gray-500">Nearby insights</p>
        </motion.div>

        {/* CARD 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transition"
        >
          ⚠
          <h3 className="font-semibold mt-2">Risk Analysis</h3>
          <p className="text-sm text-gray-500">Investment safety</p>
        </motion.div>

      </div>

    </div>
  );
}

export default Home;