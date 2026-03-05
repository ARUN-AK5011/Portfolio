import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 100) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <span
          className="text-white tracking-[-0.06em]"
          style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2.5rem", fontWeight: 700 }}
        >
          A<span className="text-[#bcfc00]">.</span>K
        </span>
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-[2px] bg-white/[0.05] rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-[#bcfc00] rounded-full"
          style={{ width: `${count}%` }}
        />
      </div>

      {/* Counter */}
      <span
        className="text-white/20 text-xs tracking-[0.3em]"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {count}%
      </span>
    </motion.div>
  );
}