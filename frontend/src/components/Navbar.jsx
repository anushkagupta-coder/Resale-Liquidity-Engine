import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
      
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer text-gray-900 tracking-tight"
        >
          ResaleIQ
        </h1>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-sm">

          <button
            onClick={() => navigate("/")}
            className={`transition ${
              location.pathname === "/" 
                ? "text-blue-600 font-semibold" 
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className={`transition ${
              location.pathname === "/dashboard" 
                ? "text-blue-600 font-semibold" 
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Dashboard
          </button>

        </div>

        {/* CTA BUTTON */}
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium 
          hover:bg-blue-700 transition shadow-sm"
        >
          Analyze
        </button>

      </div>
    </div>
  );
}

export default Navbar;