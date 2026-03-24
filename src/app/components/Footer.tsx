import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowUp, Download } from "lucide-react";

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="relative bg-[#030303] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.04]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-20">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span
              className="text-white tracking-[-0.06em] block mb-3"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2rem", fontWeight: 700 }}
            >
              A<span className="text-[#bcfc00]">.</span>K
            </span>
            <p
              className="text-white/15 text-sm max-w-xs"
              style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
            >
              Building exceptional digital experiences with clean code and thoughtful design.
            </p>
          </motion.div>

          {/* Download Resume */}
          <motion.a
            href="https://docs.google.com/document/d/1jmfB7O81YhBY3dF3CyszF8VqSaD7mAyxDaIwIL0DP4Y/export?format=pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.06] hover:border-[#bcfc00]/20 bg-white/[0.02] hover:bg-[#bcfc00]/[0.04] transition-all duration-500"
          >
            <Download size={14} className="text-[#bcfc00]/60 group-hover:text-[#bcfc00] transition-colors duration-300" />
            <span
              className="text-white/40 group-hover:text-white/70 text-sm tracking-wider transition-colors duration-300"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Download Resume
            </span>
          </motion.a>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.03]"
        >
          <p className="text-white/10 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            &copy; 2026 Arunkumar Developer. Handcrafted with passion.
          </p>

          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-white/15 hover:text-white/50 transition-colors text-xs"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Back to top
            <div className="w-8 h-8 rounded-full border border-white/[0.06] group-hover:border-white/20 flex items-center justify-center transition-all duration-300">
              <ArrowUp size={12} />
            </div>
          </motion.button>
        </motion.div>

        {/* SEO Hidden Content */}
        <div className="sr-only">
          <h2>Contact Arun Kumar | Hire Golang Developer | Software Developer Chennai</h2>
          <p>Contact Arun Kumar - hire golang developer, freelance software developer for Golang projects, backend development, API development.</p>
          <p>Arun software engineer available for remote work, contract projects. Expert golang developer in Chennai, India - hire for Go, React, Node.js.</p>
          <p>Best freelance golang developer for backend systems, microservices development. Software developer for hire.</p>
        </div>
      </div>
    </footer>
  );
}