import { motion } from "framer-motion";

const endpoints = [
  {
    method: "POST",
    path: "/predict",
    desc: "Run a full liquidity and valuation analysis on a property asset.",
    params: [
      { name: "address", type: "string", req: true, desc: "Full property address including city and state." },
      { name: "size", type: "number", req: true, desc: "Built-up area in square feet." },
      { name: "age", type: "number", req: true, desc: "Age of the property in years." },
      { name: "type", type: "string", req: false, desc: "Property type: 1BHK, 2BHK, 3BHK, Villa, Commercial. Default: 2BHK." },
    ],
    response: `{
  "market_value_range": [1200000, 1450000],
  "distress_value_range": [950000, 1100000],
  "resale_index": 74,
  "time_to_sell": "3–5 weeks",
  "confidence_score": "High (0.91)",
  "lat": 12.9716,
  "lon": 77.5946,
  "risk_flags": ["High vacancy zone", "Flood plain proximity"],
  "key_drivers": ["Metro access", "Low age", "Corner plot"]
}`,
  },
  {
    method: "GET",
    path: "/",
    desc: "Health check — confirms the engine is running.",
    params: [],
    response: `{ "message": "AI Resale Engine Running 🚀" }`,
  },
];

const METHOD_COLOR = {
  POST: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  GET:  "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <span className="section-label inline-block mb-4">API Reference</span>
          <h1 className="text-5xl font-black mb-4">PropLiq Engine API</h1>
          <p className="text-slate-400 max-w-xl">
            A REST API for property valuation and liquidity analysis. The production base URL is hosted on Render.
          </p>

          <div className="mt-6 glass-panel p-4 flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Base URL</span>
            <code className="text-indigo-300 text-sm font-mono bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
              https://resale-liquidity-engine.onrender.com
            </code>
          </div>
        </motion.div>

        <div className="space-y-8">
          {endpoints.map((ep, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6"
            >
              {/* Endpoint header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg border uppercase tracking-wider ${METHOD_COLOR[ep.method]}`}>
                  {ep.method}
                </span>
                <code className="text-white font-mono text-sm">{ep.path}</code>
              </div>
              <p className="text-slate-400 text-sm mb-6">{ep.desc}</p>

              {ep.params.length > 0 && (
                <div className="mb-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Request Body</p>
                  <div className="rounded-xl overflow-hidden border border-white/5">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-white/[0.03]">
                          <th className="text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600">Field</th>
                          <th className="text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600">Type</th>
                          <th className="text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600">Required</th>
                          <th className="text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ep.params.map((p, j) => (
                          <tr key={j} className="border-t border-white/[0.04]">
                            <td className="px-4 py-3 font-mono text-indigo-300 text-xs">{p.name}</td>
                            <td className="px-4 py-3 text-amber-300 text-xs font-mono">{p.type}</td>
                            <td className="px-4 py-3">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${p.req ? "bg-rose-500/20 text-rose-300" : "bg-slate-800 text-slate-500"}`}>
                                {p.req ? "required" : "optional"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-400 text-xs">{p.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Response Example</p>
                <pre className="bg-slate-900/80 border border-white/5 rounded-xl p-4 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed">
                  {ep.response}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-12 glass-panel p-6 bg-indigo-500/5 border-indigo-500/15">
          <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-2">Note</p>
          <p className="text-slate-400 text-sm">
            The prediction endpoint may take 10–60 seconds on first call if the Render instance is cold-starting.
            Subsequent calls complete in under 2 seconds.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
