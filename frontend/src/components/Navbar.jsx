import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate        = useNavigate();
  const location        = useLocation();
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!userMenu) return;
    const close = (e) => setUserMenu(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [userMenu]);

  const is = (path) => location.pathname === path;

  const navBtn = (label, path) => (
    <button
      key={path}
      onClick={() => navigate(path)}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
        is(path)
          ? "text-white bg-white/10"
          : "text-slate-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {label}
    </button>
  );

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-[60] transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-slate-950/85 border-b border-white/[0.08] shadow-2xl shadow-black/50"
          : "backdrop-blur-md bg-slate-950/20 border-b border-transparent"
      }`}
    >
      {/* Outer: full-width, relative for absolute center */}
      <div className="relative max-w-[1600px] mx-auto flex items-center justify-between px-6 py-4">

        {/* LEFT: Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-black tracking-tighter group z-10"
        >
          <span className="text-white group-hover:text-slate-200 transition-colors">Prop</span>
          <span className="text-gradient">Liq</span>
        </button>

        {/* CENTER: Nav links — truly centered via absolute positioning */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1">
          {navBtn("Overview",  "/")}
          {user && navBtn("Analyzer", "/dashboard")}
          {navBtn("API Docs",  "/api-docs")}
          {navBtn("Pricing",   "/pricing")}
        </div>

        {/* RIGHT: Auth controls */}
        <div className="flex items-center gap-3 z-10">
          {user ? (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-black text-white">
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <span className="text-sm font-semibold text-slate-300 hidden sm:block">{user.name}</span>
                <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {userMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 glass-panel py-1 shadow-2xl shadow-black/60">
                  <button
                    onClick={() => { signOut(); setUserMenu(false); navigate("/"); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/signin")}
                className="hidden sm:block text-sm text-slate-400 hover:text-white font-semibold transition-colors px-3 py-2"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="btn-primary text-sm px-5 py-2.5"
              >
                Get Started →
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;