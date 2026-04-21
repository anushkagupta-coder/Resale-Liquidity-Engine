import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PricingPage from "./pages/PricingPage";
import ApiDocsPage from "./pages/ApiDocsPage";

// Pages that show the Navbar
function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <Navbar />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"         element={<PageWrap><LandingPage /></PageWrap>} />
            <Route path="/signin"   element={<PageWrap><SignIn /></PageWrap>} />
            <Route path="/signup"   element={<PageWrap><SignUp /></PageWrap>} />
            <Route path="/pricing"  element={<PageWrap><PricingPage /></PageWrap>} />
            <Route path="/api-docs" element={<PageWrap><ApiDocsPage /></PageWrap>} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <PageWrap><Dashboard /></PageWrap>
                </PrivateRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </AuthProvider>
  );
}

function PageWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export default App;