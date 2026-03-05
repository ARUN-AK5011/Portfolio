import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Mail } from "lucide-react";
import { useNavigate } from "react-router";
import { allProjects, type Project } from "../data/projects";
import { ImageWithFallback } from "./handler/ImageWithFallback";

const categories = ["All", "Web Application", "Mobile Application", "E-Commerce Platform", "Creative Platform", "SaaS Platform", "FinTech App", "Social Platform", "Real Estate Platform"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col rounded-2xl border border-white/[0.05] bg-white/[0.015] overflow-hidden hover:border-[#bcfc00]/15 hover:bg-[#bcfc00]/[0.02] transition-all duration-700"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.div
          className="w-full h-full"
          animate={hovered ? { scale: 1.06 } : { scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#050505]/55" />

        {/* Hover overlay - action buttons */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3 bg-[#bcfc00]/[0.07] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.65 }}
        >
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
            transition={{ delay: 0.05, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.12 }}
            onClick={(e) => e.stopPropagation()}
            className="w-12 h-12 rounded-full bg-[#bcfc00] flex items-center justify-center text-[#050505] shadow-lg"
          >
            <ExternalLink size={17} />
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 120, damping: 18 }}
            whileHover={{ scale: 1.12 }}
            onClick={(e) => e.stopPropagation()}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
          >
            <Github size={17} />
          </motion.a>
        </motion.div>

        {/* Year badge */}
        <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-xl border border-white/[0.07]">
          <span className="text-white/50 text-[10px] tracking-wider" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {project.year}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#bcfc00]/10 border border-[#bcfc00]/20">
            <span className="text-[#bcfc00] text-[10px] tracking-[0.1em] uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <span
          className="text-[10px] tracking-[0.2em] uppercase text-[#bcfc00]/70 mb-2 block"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {project.category}
        </span>

        <h3
          className="text-white mb-3 flex items-center gap-2 group-hover:gap-3 transition-all duration-400"
          style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.2rem", fontWeight: 600, lineHeight: 1.3 }}
        >
          {project.title}
          <motion.span
            animate={hovered ? { rotate: 0, opacity: 1 } : { rotate: -45, opacity: 0.2 }}
            transition={{ duration: 0.65 }}
            className="text-[#bcfc00]"
          >
            <ArrowUpRight size={18} />
          </motion.span>
        </h3>

        <p
          className="text-white/25 mb-4 flex-1"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.75 }}
        >
          {project.longDescription}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full text-[11px] tracking-wide border transition-all duration-500"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                backgroundColor: hovered ? "rgba(188,252,0,0.05)" : "rgba(255,255,255,0.025)",
                borderColor: hovered ? "rgba(188,252,0,0.12)" : "rgba(255,255,255,0.04)",
                color: hovered ? "#bcfc00" : "rgba(255,255,255,0.3)",
                transition: "all 0.65s ease",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#bcfc00]/[0.07] border border-[#bcfc00]/10 text-[#bcfc00] hover:bg-[#bcfc00]/[0.14] hover:border-[#bcfc00]/25 transition-all duration-400 text-[12px] tracking-wide"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <ExternalLink size={13} />
            Live Preview
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/40 hover:bg-white/[0.07] hover:text-white/70 transition-all duration-400 text-[12px] tracking-wide"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <Github size={13} />
            Source Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function AllProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  // Scroll to top whenever this page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const filtered = activeFilter === "All"
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter);

  // Only show categories that have projects
  const usedCategories = ["All", ...Array.from(new Set(allProjects.map((p) => p.category)))];

  return (
    <div className="min-h-screen bg-[#050505]" style={{ overflowX: "clip" }}>

      {/* ── Navbar-height top bar with back button ── */}
      <div className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.04] transition-all duration-400 text-[13px] tracking-wide text-white/40 hover:text-white/70"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <motion.span
              className="inline-flex"
              animate={{ x: 0 }}
              whileHover={{ x: -3 }}
              transition={{ duration: 0.25 }}
            >
              <ArrowLeft size={14} />
            </motion.span>
            Back to Portfolio
          </motion.button>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/15 text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Arunkumar - Projects
          </motion.span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Hero header ── */}
        <div ref={headerRef} className="pt-20 pb-16 md:pt-28 md:pb-20">

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "110%" }}
              animate={isHeaderInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white tracking-[-0.04em]"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 700, lineHeight: 1.05 }}
            >
              All Work &
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "110%" }}
              animate={isHeaderInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#bcfc00] tracking-[-0.04em]"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 700, lineHeight: 1.05 }}
            >
              Projects.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/25 max-w-xl"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.8 }}
          >
            Every project is a problem worth solving. Here's a full look at what I've built, from early experiments to production systems serving thousands of users.
          </motion.p>
        </div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-14"
        >
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {usedCategories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="relative px-4 py-2 rounded-full text-xs tracking-wide transition-all duration-400 shrink-0"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    backgroundColor: isActive ? "#bcfc00" : "rgba(255,255,255,0.03)",
                    borderWidth: 1,
                    borderColor: isActive ? "#bcfc00" : "rgba(255,255,255,0.06)",
                    color: isActive ? "#050505" : "rgba(255,255,255,0.35)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {cat}
                  {cat === "All" && (
                    <span
                      className="ml-1.5 opacity-60"
                      style={{ fontSize: "10px" }}
                    >
                      {allProjects.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Project grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-white/20" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              No projects in this category yet.
            </p>
          </motion.div>
        )}

        {/* ── End CTA ── */}
        <div ref={ctaRef} className="border-t border-white/[0.04] mt-12 py-20 md:py-32">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="overflow-hidden mb-1"
              >
                <h2
                  className="text-white tracking-[-0.03em]"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.1 }}
                >
                  Like what you see?
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="overflow-hidden"
              >
                <h2
                  className="text-[#bcfc00] tracking-[-0.03em]"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.1 }}
                >
                  Let's build together.
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white/25 mt-4 max-w-md"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.8 }}
              >
                I'm open to freelance projects, full-time roles, and interesting collaborations. Reach out and let's talk.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isCtaInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 flex-shrink-0"
            >
              <a
                href="mailto:thedeveloper.arun@gmail.com"
                className="group flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#bcfc00] text-[#050505] hover:bg-[#d4fc4d] transition-all duration-400"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "0.9rem" }}
              >
                <Mail size={16} />
                Say Hello
                <motion.span
                  className="inline-flex"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight size={15} />
                </motion.span>
              </a>
              <button
                onClick={() => window.history.back()}
                className="group flex items-center justify-center gap-3 px-7 py-4 rounded-full border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/15 transition-all duration-400"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 500, fontSize: "0.9rem" }}
              >
                <ArrowLeft size={16} />
                Back to Portfolio
              </button>
            </motion.div>
          </div>

          {/* Bottom credit */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isCtaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-white/10 text-xs tracking-widest uppercase text-center"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            © 2025 Arunkumar Developer. Crafted in Chennai, India
          </motion.p>
        </div>
      </div>
    </div>
  );
}