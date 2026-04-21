import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DarkVeil from "../components/effects/DarkVeil";

const metrics = [
  { value: "98.4%", label: "Valuation Accuracy" },
  { value: "< 2s",  label: "Analysis Time" },
  { value: "50M+",  label: "Data Points Indexed" },
  { value: "40+",   label: "Risk Signals Tracked" },
];

const features = [
  {
    icon: "🧠",
    title: "CPPN-Powered Valuation",
    desc: "A Compositional Pattern-Producing Network distills decades of market transactions into a single, high-fidelity price estimate—no black-box regression.",
  },
  {
    icon: "📍",
    title: "Hyper-Local Intelligence",
    desc: "Geocoded comparables, transit proximity, flood-zone overlays, and school ratings are weighted dynamically against your asset.",
  },
  {
    icon: "🚩",
    title: "Distress Signal Radar",
    desc: "40+ engineered risk flags surface illiquidity drivers before they manifest: over-leveraged submarkets, vacancy drift, and permit anomalies.",
  },
  {
    icon: "⏱",
    title: "Liquidity Velocity",
    desc: "Time-to-sell forecasts derived from rolling absorption rates, days-on-market distributions, and seasonal demand cycles.",
  },
  {
    icon: "📊",
    title: "Confidence Scoring",
    desc: "Every output ships with a data-density score so underwriters know exactly how much weight to assign each prediction.",
  },
  {
    icon: "🗺",
    title: "Interactive Map Layer",
    desc: "Pin any address and instantly overlay comp clusters, risk zones, and price-heat gradients on a live Leaflet map.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Input Asset Details",
    desc: "Enter the address, built-up area, age of construction, and property type.",
  },
  {
    step: "02",
    title: "Engine Runs Analysis",
    desc: "PropLiq geocodes the asset, pulls live comparables, and runs the CPPN evaluation model.",
  },
  {
    step: "03",
    title: "Receive Intelligence Report",
    desc: "Market value range, distress floor, resale index, velocity forecast, and tagged risk drivers—delivered in under 2 seconds.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-slate-950">

      {/* ─── HERO ─── */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">

        {/* DarkVeil — full opacity, default props */}
        <div className="absolute inset-0 z-0">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={0.5}
            scanlineFrequency={0}
            warpAmount={0}
          />
        </div>

        {/* Thin dark scrim for text legibility */}
        <div className="absolute inset-0 z-[1] bg-slate-950/45 pointer-events-none" />

        {/* Top fade — blends DarkVeil behind the navbar */}
        <div className="absolute top-0 left-0 right-0 h-36 z-[2] pointer-events-none"
             style={{ background: "linear-gradient(to bottom, #020617 0%, transparent 100%)" }} />

        {/* Bottom fade — blends into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-56 z-[2] pointer-events-none"
             style={{ background: "linear-gradient(to top, #020617 0%, transparent 100%)" }} />

        {/* Hero copy */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Property Intelligence Platform
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-none">
              <span className="text-white">Prop</span>
              <span className="text-gradient">Liq</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              The data-led valuation and liquidity engine that estimates both
              asset value <em>and</em> resale risk for property-backed lending—in under 2 seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate("/signin")}
                className="btn-primary text-lg px-10 py-4"
              >
                Run First Analysis →
              </button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all duration-300">
                See How It Works
              </button>
            </div>
          </motion.div>
        </div>

      </section>

      {/* ─── METRICS STRIP ─── */}
      <section className="relative py-16 bg-slate-950 z-20 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="text-4xl font-black text-gradient mb-2">{m.value}</p>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="relative py-28 bg-slate-950 z-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">Capabilities</p>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Beyond simple comparables
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              PropLiq combines neural valuation, real-time market data, and risk
              engineering into a single, API-ready intelligence layer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass-panel p-8 hover:bg-white/[0.07] transition-all duration-500 group cursor-default"
              >
                <div className="text-3xl mb-5 group-hover:scale-110 transition-transform duration-300 w-fit">
                  {f.icon}
                </div>
                <h3 className="text-base font-black mb-3 text-white tracking-tight">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CSS gradient fade: features → next section */}
        <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-[5]"
             style={{ background: "linear-gradient(to bottom, #020617 0%, transparent 100%)" }} />

      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="relative py-28 bg-slate-950 z-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">Workflow</p>
            <h2 className="text-4xl md:text-5xl font-black">Three steps. Full picture.</h2>
          </motion.div>

          <div className="space-y-6">
            {howItWorks.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 flex items-start gap-8 hover:bg-white/[0.07] transition-all duration-500"
              >
                <span className="text-5xl font-black text-gradient opacity-60 leading-none flex-shrink-0">
                  {h.step}
                </span>
                <div>
                  <h3 className="text-xl font-black text-white mb-2">{h.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="relative py-28 z-20 overflow-hidden">
        {/* Subtle DarkVeil echo */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <DarkVeil
            speed={0.15}
            hueShift={0}
            noiseIntensity={0}
            scanlineIntensity={0}
            scanlineFrequency={0}
            warpAmount={0}
          />
        </div>
        <div className="absolute inset-0 bg-slate-950/75 pointer-events-none" />
        {/* CSS gradient fades: CTA top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-[5]"
             style={{ background: "linear-gradient(to bottom, #020617 0%, transparent 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[5]"
             style={{ background: "linear-gradient(to top, #020617 0%, transparent 100%)" }} />


        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              See your first valuation{" "}
              <span className="text-gradient">live</span>.
            </h2>
            <p className="text-slate-400 mb-10 text-lg">
              No sign-up required. Enter an address and the engine does the rest.
            </p>
            <button
              onClick={() => navigate("/signin")}
              className="btn-primary text-xl px-14 py-5"
            >
              Launch Analyzer →
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 border-t border-white/5 z-20 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-black tracking-tighter">
            <span className="text-white">Prop</span>
            <span className="text-gradient">Liq</span>
          </div>
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} PropLiq Intelligence Engine. Built for property-backed lending.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-white transition-colors cursor-pointer">API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
