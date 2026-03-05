import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPos({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Mouse parallax for background elements
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated orbs with mouse parallax */}
      <motion.div
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#bcfc00]/[0.04] blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-[#bcfc00]/[0.03] blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#d4fc4d]/[0.03] blur-[80px]"
        />
      </motion.div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* Horizontal lines */}
      <motion.div style={{ y: textY }} className="absolute top-[12%] left-0 right-0 flex flex-col gap-[100vh]">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2 + i * 0.2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1px] bg-white/[0.04] origin-left"
          />
        ))}
      </motion.div>

      <motion.div style={{ y, opacity, scale }} className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        {/* Role tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 1 }}
          className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl mb-8 sm:mb-10"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-[#bcfc00]"
          />
          <span className="text-white/50 text-[13px] tracking-[0.15em] uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Available for work &mdash; 2026
          </span>
        </motion.div>

        {/* Main heading with line-by-line reveal */}
        <div className="mb-4">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white tracking-[-0.04em] leading-[1.05]"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2.8rem, 9vw, 7rem)", fontWeight: 700 }}
            >
              Full-Stack
            </motion.div>
          </div>
        </div>
        <div className="mb-3 flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-white tracking-[-0.04em] leading-[1.05]"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2.8rem, 9vw, 7rem)", fontWeight: 700 }}
            >
              Developer
            </motion.span>
          </div>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "clamp(80px, 12vw, 160px)", opacity: 1 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-[3px] rounded-full bg-[#bcfc00] hidden md:block"
          />
        </div>
        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/20 tracking-[-0.02em] leading-[1.1]"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: 300 }}
          >
            & Creative Technologist
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-white/30 max-w-md mx-auto mb-10 md:mb-14 px-2"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.8 }}
        >
          I build exceptional digital products at the intersection of
          design engineering and creative development.
        </motion.p>

        {/* CTA + Socials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <MagneticButton>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative px-8 py-4 rounded-full bg-[#bcfc00] text-[#0a0a0a] overflow-hidden"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "0.95rem" }}
            >
              <span className="relative z-10 group-hover:text-[#0a0a0a] transition-colors duration-500">
                View My Work
              </span>
              <motion.div
                className="absolute inset-0 bg-[#d4fc4d]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.button>
          </MagneticButton>

          <div className="flex items-center gap-3">
            {[
              { Icon: Github, label: "GitHub" },
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Twitter, label: "Twitter" },
            ].map(({ Icon, label }, i) => (
              <MagneticButton key={label}>
                <motion.a
                  href="#"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + i * 0.1, type: "spring", stiffness: 200 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/30 hover:text-[#bcfc00] hover:border-[#bcfc00]/20 hover:bg-[#bcfc00]/[0.06] transition-all duration-500"
                >
                  <Icon size={17} />
                </motion.a>
              </MagneticButton>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <motion.div
          className="w-[1px] h-12 bg-[#bcfc00]/20 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Side text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 right-8 hidden lg:block z-20"
      >
        <span
          className="text-white/10 text-xs tracking-[0.4em] uppercase"
          style={{ fontFamily: "Space Grotesk, sans-serif", writingMode: "vertical-rl" }}
        >
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}