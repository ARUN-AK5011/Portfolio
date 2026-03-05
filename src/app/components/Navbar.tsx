import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";

const links = ["About", "Skills", "Process", "Experience", "Projects", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  // Refs for measuring button positions
  const navContainerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
    const sections = links.map((l) => document.getElementById(l.toLowerCase()));
    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (sec && sec.getBoundingClientRect().top <= 200) {
        setActive(links[i]);
        return;
      }
    }
    setActive("");
  });

  // Update pill position whenever active changes
  useEffect(() => {
    const idx = links.indexOf(active);
    const btn = btnRefs.current[idx];
    const container = navContainerRef.current;
    if (btn && container && idx !== -1) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setPillStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
        opacity: 1,
      });
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [active]);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className="transition-all duration-700"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20 relative">
            {/* Logo - left */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 min-w-[48px]"
            >
              <motion.span
                className="text-white tracking-[-0.04em] block flex items-center"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "1.5rem" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>A</span>
                <motion.span
                  className="inline-block overflow-hidden whitespace-nowrap"
                  animate={{
                    width: scrolled ? 0 : "auto",
                    opacity: scrolled ? 0 : 1,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  run
                </motion.span>
                <motion.span
                  className="text-[#bcfc00] inline-block overflow-hidden whitespace-nowrap"
                  animate={{
                    width: scrolled ? "auto" : 0,
                    opacity: scrolled ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: scrolled ? 0.15 : 0 }}
                >
                  .
                </motion.span>
                <span>k</span>
                <motion.span
                  className="inline-block overflow-hidden whitespace-nowrap"
                  animate={{
                    width: scrolled ? 0 : "auto",
                    opacity: scrolled ? 0 : 1,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  umar
                </motion.span>
              </motion.span>
            </motion.button>

            {/* Desktop nav */}
            <motion.div
              ref={navContainerRef}
              className="hidden md:flex items-center gap-0.5 p-1 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.04] absolute"
              animate={{
                left: scrolled ? "50%" : "calc(100% - 108px)",
                x: scrolled ? "-50%" : "-100%",
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Sliding pill - single element, always rendered */}
              <motion.div
                className="absolute top-1 bottom-1 rounded-full bg-white/[0.08] pointer-events-none"
                animate={{
                  left: pillStyle.left,
                  width: pillStyle.width,
                  opacity: pillStyle.opacity,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 36, mass: 0.8 }}
              />

              {links.map((link, i) => (
                <motion.button
                  key={link}
                  ref={(el) => { btnRefs.current[i] = el; }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  onClick={() => scrollTo(link)}
                  className="relative px-5 py-2 text-[13px] tracking-wide transition-colors"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  <span className={`relative z-10 transition-colors duration-300 ${active === link ? "text-white" : "text-white/40 hover:text-white/70"}`}>
                    {link}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Download resume icon button - right */}
            <div className="hidden md:flex items-center">
              <motion.a
                href="https://docs.google.com/document/d/1jmfB7O81YhBY3dF3CyszF8VqSaD7mAyxDaIwIL0DP4Y/export?format=pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 h-10 px-3 rounded-full bg-[#bcfc00] flex items-center justify-center text-[#0a0a0a] hover:bg-[#d4fc4d] transition-all duration-500 overflow-hidden"
                title="Download Resume"
              >
                <motion.div
                  className="flex items-center gap-2 whitespace-nowrap"
                  animate={{
                    paddingLeft: scrolled ? "4px" : "0px",
                    paddingRight: scrolled ? "4px" : "0px",
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{ justifyContent: "center" }}
                >
                  <Download size={15} className="shrink-0" />
                  <motion.span
                    animate={{
                      width: scrolled ? "auto" : 0,
                      opacity: scrolled ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden text-[13px] tracking-wide"
                    style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
                  >
                    Download Resume
                  </motion.span>
                </motion.div>
              </motion.a>
            </div>

            {/* Mobile toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center text-white"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-5"
      >
        {links.map((link, i) => (
          <motion.button
            key={link}
            initial={{ opacity: 0, y: 20 }}
            animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: mobileOpen ? 0.08 * i + 0.05 : 0, duration: 0.4 }}
            onClick={() => scrollTo(link)}
            className="text-white/60 hover:text-white transition-colors"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(1.6rem, 6vw, 2rem)", fontWeight: 500 }}
          >
            {link}
          </motion.button>
        ))}

        {/* Resume download in mobile menu */}
        <motion.a
          href="https://docs.google.com/document/d/1jmfB7O81YhBY3dF3CyszF8VqSaD7mAyxDaIwIL0DP4Y/export?format=pdf"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: mobileOpen ? 0.08 * links.length + 0.05 : 0, duration: 0.4 }}
          onClick={() => setMobileOpen(false)}
          className="mt-4 flex items-center gap-2 px-6 py-3 rounded-full bg-[#bcfc00] text-[#0a0a0a] hover:bg-[#d4fc4d] transition-all duration-400"
          style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "0.9rem" }}
        >
          <Download size={15} />
          Download Resume
        </motion.a>
      </motion.div>
    </>
  );
}