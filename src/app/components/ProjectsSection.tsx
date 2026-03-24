import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { navigate } from "../App";
import { ImageWithFallback } from "./handler/ImageWithFallback";
import { featuredProjects, type Project } from "../data/projects";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0.8]);
  const imgY = useTransform(scrollYProgress, [0, 1], [120, -20]);
  const contentY = useTransform(scrollYProgress, [0, 1], [80, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.98]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group grid md:grid-cols-2 gap-8 md:gap-12 items-center ${isEven ? "" : "md:[direction:rtl]"}`}
    >
      {/* Image side */}
      <motion.div
        style={{ y: imgY }}
        className={`relative rounded-2xl overflow-hidden ${isEven ? "" : "md:[direction:ltr]"}`}
      >
        <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/[0.04]">
          <motion.div
            animate={hovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-[#050505]/60" />

          {/* Hover overlay with clip-path reveal */}
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={hovered ? { clipPath: "circle(100% at 50% 50%)" } : { clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center gap-4 bg-[#bcfc00]/[0.08] backdrop-blur-sm"
          >
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0 }}
              animate={hovered ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 18 }}
              whileHover={{ scale: 1.1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-14 h-14 rounded-full bg-[#bcfc00] flex items-center justify-center text-[#0a0a0a]"
            >
              <ExternalLink size={20} />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0 }}
              animate={hovered ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 120, damping: 18 }}
              whileHover={{ scale: 1.1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
            >
              <Github size={20} />
            </motion.a>
          </motion.div>

          {/* Year */}
          <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/[0.06]">
            <span className="text-white/50 text-[11px] tracking-wider" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              {project.year}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Content side */}
      <motion.div style={{ y: contentY }} className={`${isEven ? "" : "md:[direction:ltr]"}`}>
        <motion.div
          animate={hovered ? { x: isEven ? 10 : -10 } : { x: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-xs tracking-[0.2em] uppercase mb-3 block text-[#bcfc00]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {project.category}
          </span>

          <h3
            className="text-white mb-4 flex items-center gap-3 group-hover:gap-4 transition-all duration-500"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, lineHeight: 1.2 }}
          >
            {project.title}
            <motion.span
              animate={hovered ? { rotate: 0, opacity: 1 } : { rotate: -45, opacity: 0.2 }}
              transition={{ duration: 0.65 }}
            >
              <ArrowUpRight size={22} />
            </motion.span>
          </h3>

          <p
            className="text-white/30 mb-6"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.8 }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full text-xs transition-all duration-700"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  backgroundColor: hovered ? "rgba(188,252,0,0.06)" : "rgba(255,255,255,0.03)",
                  borderWidth: 1,
                  borderColor: hovered ? "rgba(188,252,0,0.15)" : "rgba(255,255,255,0.04)",
                  color: hovered ? "#bcfc00" : "rgba(255,255,255,0.3)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Link buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#bcfc00]/[0.06] border border-[#bcfc00]/10 text-[#bcfc00]/80 hover:bg-[#bcfc00]/[0.12] hover:text-[#bcfc00] transition-all duration-400 text-xs tracking-wide"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <ExternalLink size={12} />
              Live Preview
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/15 transition-all duration-400 text-xs tracking-wide"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <Github size={12} />
              Source
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="relative py-32 md:py-44 bg-[#050505]" style={{ overflow: "clip" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
          <div>
            <div className="overflow-hidden mb-3">
              <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-white tracking-[-0.03em]"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.15 }}
              >
                Crafted with care,
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#bcfc00] tracking-[-0.03em]"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.15 }}
              >
                built to perform
              </motion.div>
            </div>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/projects")}
            className="group self-start md:self-auto flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.06] text-white/40 hover:text-[#bcfc00] hover:border-[#bcfc00]/20 transition-all duration-500 text-sm"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            All Projects
            <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
          </motion.button>
        </div>

        {/* Featured projects list */}
        <div className="space-y-16 md:space-y-28">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* ── View all CTA at section bottom ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 md:mt-24 pt-12 md:pt-16 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p
              className="text-white/20 text-sm mb-1"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Showing {featuredProjects.length} featured projects
            </p>
            <p
              className="text-white/10 text-xs"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {featuredProjects.length} of 8 total projects
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/projects")}
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#bcfc00] text-[#050505] hover:bg-[#d4fc4d] transition-all duration-400"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "0.9rem" }}
          >
            View All Projects
            <motion.span
              className="inline-flex"
              animate={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            </motion.span>
          </motion.button>
        </motion.div>

        {/* SEO Hidden Content */}
        <div className="sr-only">
          <h2>Golang Developer Projects | Go Developer Portfolio</h2>
          <p>golang developer projects featuring concurrent programming, goroutines, REST APIs, microservices, backend development.</p>
          <p>Software developer portfolio - Arun Kumar projects in React, Node.js, Go, Golang backend systems, PostgreSQL, Docker, cloud deployment.</p>
          <p>Arun software developer, arun software engineer portfolio. Freelance golang developer available for backend architecture, API development, microservices.</p>
          <p>Hire golang developer - best golang developer in Chennai, India for backend systems, REST API development.</p>
        </div>
      </div>
    </section>
  );
}