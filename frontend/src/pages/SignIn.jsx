import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import DarkVeil from "../components/effects/DarkVeil";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setError(null);
    await new Promise(r => setTimeout(r, 600));
    const result = signIn({ email: form.email, password: form.password });
    setLoading(false);
    if (!result.ok) { setError(result.error); return; }
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center px-4 pt-20">
      {/* DarkVeil background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil hueShift={0} noiseIntensity={0} scanlineIntensity={0} speed={0.3} scanlineFrequency={0} warpAmount={0} />
      </div>
      {/* Dark scrim */}
      <div className="absolute inset-0 z-[1] bg-slate-950/60 pointer-events-none" />
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none"
           style={{ background: "linear-gradient(to bottom, transparent, #020617)" }} />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm">Sign in to access the PropLiq engine.</p>
        </div>

        <div className="glass-panel p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="input-base"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Password
                </label>
                <span className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors">
                  Forgot password?
                </span>
              </div>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="input-base"
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full py-3.5 btn-primary text-sm font-bold disabled:opacity-60">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : "Sign In →"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                Create one free
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          © {new Date().getFullYear()} PropLiq Intelligence Engine
        </p>
      </motion.div>
    </div>
  );
}
