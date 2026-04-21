import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-16 h-16">
        <motion.div
           className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute inset-0 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-2 border-2 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full opacity-50"
        />
      </div>

      <p className="mt-6 text-sm font-bold tracking-widest text-slate-500 uppercase animate-pulse">
        Initializing Engine Analysis
      </p>
    </div>
  );
}

export default Loader;