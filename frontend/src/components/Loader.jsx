import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />

      <p className="mt-4 text-gray-400 animate-pulse">
        AI is analyzing property...
      </p>

    </div>
  );
}

export default Loader;