import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return true;
  });

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-6 right-6 z-50 glass rounded-full px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-foreground/80 hover:text-foreground cursor-pointer select-none transition-colors duration-700"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-700">
          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 1a6 6 0 0 1 0 12V1z" fill="currentColor" />
        </svg>
        {isDark ? "Darkroom" : "Gallery"}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
