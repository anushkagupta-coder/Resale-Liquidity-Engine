import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Gauge from "../components/Gauge";
import MapView from "../components/MapView";
import Loader from "../components/Loader";
import DarkVeil from "../components/effects/DarkVeil";
import MapPicker from "../components/MapPicker";

const INPUT_FIELD =
  "w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/40 transition-all text-sm";
const LABEL =
  "block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2";

function StatCard({ label, value, sub, accent = "indigo" }) {
  const colors = {
    indigo: "border-l-indigo-500 text-indigo-400",
    rose:   "border-l-rose-500   text-rose-400",
    emerald:"border-l-emerald-500 text-emerald-400",
    amber:  "border-l-amber-500  text-amber-400",
  };
  return (
    <div className={`glass-panel p-5 border-l-4 hover:bg-white/[0.07] transition-all duration-300 ${colors[accent].split(" ")[0]}`}>
      <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${colors[accent].split(" ")[1]}`}>
        {label}
      </p>
      <p className="text-2xl font-black text-white leading-tight">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{sub}</p>}
    </div>
  );
}

function TagList({ tags, color }) {
  const styles = {
    rose:    "bg-rose-500/15 text-rose-300 border-rose-500/25",
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  };
  if (!tags?.length) return <p className="text-slate-600 text-xs">None detected</p>;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t, i) => (
        <span key={i} className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${styles[color]}`}>
          {t}
        </span>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [form, setForm] = useState({ address: "", size: "", age: "", type: "1BHK" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.address || !form.size || !form.age) {
      setError("Please fill in all fields before running the engine.");
      return;
    }
    setError(null);
    try {
      setLoading(true);
      setResult(null);
      const res = await axios.post("http://localhost:8000/predict", {
        address: form.address,
        size:    Number(form.size),
        age:     Number(form.age),
        type:    form.type,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Engine error — check the address format or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      {/* Subtle DarkVeil background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <DarkVeil hueShift={0} noiseIntensity={0} scanlineIntensity={0} speed={0.15} scanlineFrequency={0} warpAmount={0} />
      </div>
      {/* Gradient fade at top and bottom over the veil */}
      <div className="absolute top-0 left-0 right-0 h-32 z-[1] pointer-events-none"
           style={{ background: "linear-gradient(to bottom, #020617, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] pointer-events-none"
           style={{ background: "linear-gradient(to top, #020617, transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* PAGE HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-indigo-400">
              PropLiq Engine
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            Asset <span className="text-gradient">Analyzer</span>
          </h1>
          <p className="text-slate-400 max-w-xl">
            Input property parameters and receive a full liquidity intelligence report
            in under 2 seconds — valuation, distress floor, resale index, and risk flags.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT: FORM ── */}
          <div className="lg:col-span-4 space-y-5">
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/5">
                <h2 className="text-sm font-black text-white uppercase tracking-widest">Parameters</h2>
                <span className="text-[10px] px-2 py-1 rounded-md bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/20">
                  v2.1
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={LABEL}>Property Address</label>
                  <div className="relative group">
                    <input
                      name="address"
                      value={form.address}
                      placeholder="e.g. 12 MG Road, Bangalore"
                      onChange={handleChange}
                      className={INPUT_FIELD + " pr-12"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowMap(true)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all border border-indigo-500/20"
                      title="Pick on Map"
                    >
                      📍
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Area (sq ft)</label>
                    <input
                      name="size"
                      type="number"
                      placeholder="1200"
                      onChange={handleChange}
                      className={INPUT_FIELD}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Age (years)</label>
                    <input
                      name="age"
                      type="number"
                      placeholder="5"
                      onChange={handleChange}
                      className={INPUT_FIELD}
                    />
                  </div>
                </div>

                <div>
                  <label className={LABEL}>Property Type</label>
                  <select
                    name="type"
                    onChange={handleChange}
                    className={INPUT_FIELD + " cursor-pointer"}
                  >
                    {["1BHK", "2BHK", "3BHK", "4BHK", "5BHK", "Villa", "Penthouse", "Plot", "Shop"].map((t) => (
                      <option key={t} value={t} className="bg-slate-900">{t}</option>
                    ))}
                  </select>
                </div>

                {error && (
                  <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 btn-primary mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Running Engine...
                    </span>
                  ) : (
                    "Execute Analysis →"
                  )}
                </button>
              </div>
            </div>

            {/* INFO BOX */}
            <div className="glass-panel p-5 bg-indigo-500/5 border-indigo-500/15">
              <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-3">What you'll get</p>
              <ul className="space-y-2">
                {[
                  "Market value range",
                  "Distress value floor",
                  "Resale score / 100",
                  "Liquidity velocity estimate",
                  "Risk flag breakdown",
                  "Key value drivers",
                  "Interactive location map",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-1 h-1 rounded-full bg-indigo-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── RIGHT: RESULTS ── */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-panel h-80 flex flex-col items-center justify-center"
                >
                  <Loader />
                </motion.div>

              ) : result ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* VALUATION CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <StatCard
                      label="Market Valuation"
                      value={`₹${result.market_value_range?.[0].toLocaleString()} – ₹${result.market_value_range?.[1].toLocaleString()}`}
                      sub="Estimated range based on live comparable pool."
                      accent="indigo"
                    />
                    <StatCard
                      label="Distress Floor"
                      value={`₹${result.distress_value_range?.[0].toLocaleString()} – ₹${result.distress_value_range?.[1].toLocaleString()}`}
                      sub="Liquidation floor under high-urgency scenarios."
                      accent="rose"
                    />
                  </div>

                      {/* MARKET ANALYSIS PANEL */}
                      {result.ai_insights && (
                        <div className="mt-6 p-5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-indigo-500/20 rounded-lg">
                              <span className="text-xl">📊</span>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Market Analysis & Insights</h4>
                              <p className="text-xs text-indigo-300">Live sentiment: {result.market_sentiment}</p>
                            </div>
                          </div>
                          <ul className="space-y-3">
                            {result.ai_insights.map((insight, i) => (
                              <li key={i} className="flex gap-3 text-sm text-slate-300">
                                <span className="text-indigo-400 font-bold">•</span>
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                  {/* VALUATION DETAILS ROW */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="glass-panel p-4 border-l-2 border-slate-700">
                      <p className={LABEL}>Rate per Sqft</p>
                      <p className="text-xl font-bold text-white">₹{result.valuation_details?.rate_per_sqft.toLocaleString()}</p>
                    </div>
                    <div className="glass-panel p-4 border-l-2 border-slate-700">
                      <p className={LABEL}>Neighborhood Tier</p>
                      <p className="text-xl font-bold text-indigo-400">{result.valuation_details?.neighborhood_tier}</p>
                    </div>
                    <div className="glass-panel p-4 border-l-2 border-slate-700">
                      <p className={LABEL}>Depreciation</p>
                      <p className="text-xl font-bold text-rose-400">{result.valuation_details?.depreciation_applied}</p>
                    </div>
                  </div>

                  {/* SCORE ROW */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* GAUGE */}
                    <div className="glass-panel p-5 flex flex-col items-center">
                      <p className={LABEL + " self-start"}>Resale Index</p>
                      <Gauge value={result.resale_index ?? 0} />
                      <div className="text-center -mt-2">
                        <span className="text-3xl font-black text-white">{result.resale_index}</span>
                        <span className="text-slate-500 text-sm">/100</span>
                      </div>
                    </div>

                    <StatCard
                      label="Liquidity Velocity"
                      value={result.time_to_sell}
                      sub="Estimated time from listing to settled sale."
                      accent="amber"
                    />
                    <StatCard
                      label="Engine Confidence"
                      value={result.confidence_score}
                      sub="Data density certainty score for this asset."
                      accent="emerald"
                    />
                  </div>

                  {/* MAP + TAGS ROW */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* MAP */}
                    <div className="lg:col-span-7 glass-panel overflow-hidden p-0">
                      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                          Asset Location
                        </span>
                      </div>
                      <MapView lat={result.lat} lon={result.lon} />
                    </div>

                    {/* TAGS */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="glass-panel p-5 h-full space-y-5">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-3">
                            Risk Modalities
                          </p>
                          <TagList tags={result.risk_flags} color="rose" />
                        </div>
                        <div className="border-t border-white/5 pt-5">
                          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3">
                            Value Drivers
                          </p>
                          <TagList tags={result.key_drivers} color="emerald" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-panel h-80 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">
                    📡
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-400">No analysis yet</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Fill in the parameters and execute to generate a report.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {showMap && (
        <MapPicker 
          onAddressSelected={(addr) => setForm({ ...form, address: addr })}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
}