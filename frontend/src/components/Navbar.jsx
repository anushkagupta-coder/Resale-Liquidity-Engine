import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          ResaleIQ
        </h1>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-sm">

          <button
            onClick={() => navigate("/")}
            className={`hover:text-blue-400 transition ${
              location.pathname === "/" ? "text-blue-400" : ""
            }`}
          >
            Home
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className={`hover:text-blue-400 transition ${
              location.pathname === "/dashboard" ? "text-blue-400" : ""
            }`}
          >
            Dashboard
          </button>

        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm hover:scale-105 transition"
        >
          Analyze 🚀
        </button>

      </div>
    </div>
  );
}

export default Navbar;