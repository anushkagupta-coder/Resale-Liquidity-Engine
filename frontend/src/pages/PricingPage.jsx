import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    period: "/ month",
    desc: "Perfect for individual analysts and developers exploring the engine.",
    features: ["50 analyses / month", "Standard valuation model", "Location map overlay", "Risk flag report", "Email support"],
    cta: "Get Started Free",
    accent: "border-white/10",
    badge: null,
  },
  {
    name: "Pro",
    price: "₹2,999",
    period: "/ month",
    desc: "For lending teams that need high-volume, high-accuracy valuations.",
    features: ["2,000 analyses / month", "CPPN enhanced model", "Distress value scoring", "Confidence scoring", "Priority support", "CSV export"],
    cta: "Start Pro Trial",
    accent: "border-indigo-500/40",
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For NBFCs and banks requiring white-label API access and SLA guarantees.",
    features: ["Unlimited analyses", "Dedicated model tuning", "White-label API", "Webhook integrations", "SLA guarantee", "Onboarding support"],
    cta: "Contact Sales",
    accent: "border-purple-500/40",
    badge: null,
  },
];

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="section-label inline-block mb-4">Pricing</span>
          <h1 className="text-5xl font-black mb-4">Simple, transparent pricing</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Start free, scale as you grow. All plans include the PropLiq valuation engine and risk intelligence layer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-panel p-8 flex flex-col border ${p.accent} relative`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest">
                  {p.badge}
                </div>
              )}
              <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">{p.name}</p>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-4xl font-black text-white">{p.price}</span>
                  <span className="text-slate-500 text-sm mb-1">{p.period}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/signup")}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  p.badge
                    ? "btn-primary"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                {p.cta} →
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 glass-panel p-8 text-center"
        >
          <h3 className="text-xl font-black mb-2">Need a custom integration?</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            We work directly with NBFCs, banks, and lending platforms to build tailored liquidity scoring workflows.
          </p>
          <button className="btn-primary px-8 py-3 text-sm">Talk to the Team →</button>
        </motion.div>
      </div>
    </div>
  );
}
