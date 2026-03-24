import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

const metrics = [
  { value: "13+", label: "Production Applications" },
  { value: "2M+", label: "API Requests / Month" },
  { value: "5+", label: "Automated CI/CD Pipelines" },
  { value: "5+", label: "Developer Tools & Platforms" },
];
export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center bg-[#050505] overflow-hidden"
    >
      <h1 className="sr-only">
        Arun Kumar - Go Developer and Full Stack Software Engineer
      </h1>
      <motion.div style={{ opacity, y }} className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-20 md:pt-28 pb-16 md:pb-20 relative z-10">
        {/* Main headline */}
        <div className="max-w-5xl mb-10">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-white tracking-[-0.04em]"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                fontWeight: 600,
                lineHeight: 1.05,
              }}
            >
             I build scalable
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="text-white tracking-[-0.04em]"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                fontWeight: 600,
                lineHeight: 1.05,
              }}
            >
              backend systems and <span className="text-[#bcfc00]">modern web applications.</span>
            </motion.h1>
          </div>
          {/* <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#bcfc00] tracking-[-0.04em]"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                fontWeight: 600,
                lineHeight: 1.05,
              }}
            >
              solutions.
            </motion.h1>
          </div> */}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <p
            className="text-white/30"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.9 }}
          >
            I'm Arun Kumar, a full-stack developer based in{" "}
            <span className="text-[#bcfc00]/60">Chennai, India</span>{" "}
            I specialize in Go (Golang), backend architecture, REST APIs, and modern web applications.
            I focus on building reliable, scalable systems and developer-friendly tools that power real-world products.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex flex-wrap items-center gap-4 mb-16 md:mb-24"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("projects")}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-[#bcfc00] text-[#0a0a0a] overflow-hidden"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
          >
            <span className="relative z-10 text-sm tracking-wide">View Projects</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            <motion.div
              className="absolute inset-0 bg-[#d4fc4d]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("contact")}
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
          >
            <span
              className="text-white/50 group-hover:text-white/80 text-sm tracking-wide transition-colors duration-300"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 500 }}
            >
              Get in Touch
            </span>
          </motion.button>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 + i * 0.08 }}
              className="group bg-[#050505] p-5 md:p-8 text-center hover:bg-white/[0.02] transition-colors duration-700"
            >
              <span
                className="block text-white group-hover:text-[#bcfc00] transition-colors duration-500 mb-1"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                }}
              >
                {metric.value}
              </span>
              <span
                className="text-white/15 text-[11px] tracking-wider uppercase"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {metric.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

        {/* SEO Hidden Content */}
        <div className="sr-only">
          <h1>Arun Kumar - Go Developer | Freelance Golang Developer | Software Developer Chennai</h1>
          <p>Freelance Go Developer from Chennai, India specializing in Golang backend development, REST APIs, microservices, concurrent programming, goroutines.</p>
          <p>Hire Arun Kumar for Golang development, Go programming, backend architecture, API design, system design, cloud development.</p>
          <p>Arun Kumar software developer, full stack developer, remote freelance developer available for hire.</p>
        </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={() => {
            const nextSection = sectionRef.current?.nextElementSibling;
            nextSection?.scrollIntoView({ behavior: "smooth" });
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/15 hover:text-white/30 transition-colors duration-300"
        >
          <span
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Scroll
          </span>
          <ArrowDown size={14} />
        </motion.button>
      </motion.div>
    </section>
  );
}