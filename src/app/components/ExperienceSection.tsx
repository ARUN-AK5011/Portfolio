import { motion, useInView, useTransform, useScroll } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface Experience {
  id: number;
  year: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  skills: string[];
  isCurrent: boolean;
}

const experiences: Experience[] = [
  {
    id: 1,
    year: "2025",
    role: "Lead Full Stack Developer",
    company: "The BrandOpedia",
    location: "Chennai, India",
    period: "July 2025 - Present",
    description:
      "Leading the development of a comprehensive brand management platform. Architected the frontend using React and Next.js, implemented backend services with Node.js and Golang, and collaborated closely with designers to create a seamless user experience.",
    skills: ["React", "TypeScript", "Next.js", "Golang", "Nest.js", "Docker", "GCP"],
    isCurrent: true,
  },
  {
    id: 2,
    year: "2024",
    role: "Project Lead and Full Stack Developer",
    company: "Holoware",
    location: "Chennai, India",
    period: "May 2024 - June 2025",
    description:
      "Led a team of developers in delivering a custom CRM solution for a mid-sized enterprise. Spearheaded the integration of third-party APIs and optimized database queries for improved performance.",
    skills: ["React", "Node.js", "Golang", "Mysql", "Firebase", "Redis"],
    isCurrent: false,
  },
  {
    id: 3,
    year: "2023",
    role: "Software Developer",
    company: "4W Technologies",
    location: "Chennai, India",
    period: "Dec 2023 - May 2024",
    description:
      "Built responsive web applications for early-stage startups. Implemented complex UI animations, integrated REST APIs, and improved core web vitals by 40% across multiple projects.",
    skills: ["JavaScript", "PHP", "HTML", "CSS", "Mysql"],
    isCurrent: false,
  },
];

const years = ["2025", "2024", "2023"];

function ExperienceCard({ exp }: { exp: Experience }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);

  return (
    <div ref={cardRef}>
      <motion.div style={{ y, opacity }}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.4 }}
          className="group relative p-6 md:p-8 rounded-2xl border border-white/[0.04] bg-white/[0.015] hover:border-[#bcfc00]/10 hover:bg-[#bcfc00]/[0.02] transition-all duration-500"
        >
          {exp.isCurrent && (
            <div className="absolute -top-3 right-6">
              <span
                className="px-3 py-1 rounded-full bg-[#bcfc00]/[0.1] border border-[#bcfc00]/20 text-[#bcfc00] text-[10px] tracking-[0.15em] uppercase"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Current
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 mb-4">
            <Calendar size={13} className="text-[#bcfc00]/50" />
            <span
              className="text-white/25 text-xs tracking-wider"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {exp.period}
            </span>
          </div>

          <h3
            className="text-white mb-1 tracking-[-0.02em]"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.35rem", fontWeight: 600, lineHeight: 1.3 }}
          >
            {exp.role}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-[#bcfc00]/70 flex items-center gap-1.5"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem" }}
            >
              <Briefcase size={13} />
              {exp.company}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span
              className="text-white/20 flex items-center gap-1"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem" }}
            >
              <MapPin size={12} />
              {exp.location}
            </span>
          </div>

          <p
            className="text-white/25 mb-6"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.8 }}
          >
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {exp.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-full text-[11px] tracking-wider border border-white/[0.04] bg-white/[0.02] text-white/30 group-hover:border-[#bcfc00]/10 group-hover:text-white/40 transition-all duration-500"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeYear, setActiveYear] = useState("2025");
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateActiveYear = useCallback(() => {
    const viewportCenter = window.innerHeight / 2;
    let closestIdx = 0;
    let closestDistance = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIdx = i;
      }
    });
    if (experiences[closestIdx]) {
      setActiveYear(experiences[closestIdx].year);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActiveYear, { passive: true });
    updateActiveYear();
    return () => window.removeEventListener("scroll", updateActiveYear);
  }, [updateActiveYear]);

  return (
    /*
      overflow: clip - visually clips horizontal overflow like `hidden` does
      but does NOT create a scroll container, so CSS sticky works perfectly.
    */
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#0a0a0a]"
      style={{ overflow: "clip" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.04]" />

      {/* ── Mobile sticky timeline bar (lg:hidden) ──────────────────────────
          Sticks just below the navbar (top-20 = 80px). Works because
          the section uses overflow:clip, not overflow:hidden.
      ─────────────────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="lg:hidden sticky top-20 z-30 bg-[#0a0a0a]/95 backdrop-blur-xl"
      >
        <div className="px-6 md:px-12 py-3 flex items-center gap-3">
          {/* Label */}
          <span
            className="text-white/20 text-[10px] tracking-[0.2em] uppercase shrink-0"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Timeline
          </span>

          <div className="w-px h-3 bg-white/10 shrink-0" />

          {/* Year pills */}
          <div className="flex items-center gap-2 flex-1">
            {years.map((year) => {
              const isActive = activeYear === year;
              return (
                <motion.div
                  key={year}
                  animate={{
                    backgroundColor: isActive ? "rgba(188,252,0,0.08)" : "rgba(188,252,0,0)",
                    borderColor: isActive ? "rgba(188,252,0,0.25)" : "rgba(255,255,255,0.05)",
                  }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border"
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bcfc00] animate-pulse shrink-0" />
                  )}
                  <motion.span
                    animate={{
                      color: isActive ? "#bcfc00" : "rgba(255,255,255,0.2)",
                    }}
                    transition={{ duration: 0.35 }}
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: isActive ? 700 : 400,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {year}
                  </motion.span>
                  {year === "2025" && isActive && (
                    <span
                      className="text-[#bcfc00]/50 text-[9px] tracking-[0.1em] uppercase"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      Now
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right: scroll progress fraction */}
          <span
            className="text-white/15 text-[10px] tracking-wider shrink-0"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {String(years.indexOf(activeYear) + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(years.length).padStart(2, "0")}
          </span>
        </div>

        {/* Lime progress bar at bottom of sticky bar */}
        <div className="h-[1px] bg-white/[0.04] relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-[#bcfc00]/50 origin-left"
            animate={{
              width:
                activeYear === years[0]
                  ? `${(1 / years.length) * 100}%`
                  : activeYear === years[1]
                  ? `${(2 / years.length) * 100}%`
                  : "100%",
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-32 pb-20 md:pb-44">
        {/* Heading */}
        <div className="mb-12 md:mb-20">
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: "110%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white tracking-[-0.04em]"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 600, lineHeight: 1.1 }}
            >
              Work
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "110%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#bcfc00] tracking-[-0.04em]"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 600, lineHeight: 1.1 }}
            >
              Experience.
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-white/25 mt-6 max-w-lg"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.8 }}
          >
            A timeline of my professional journey, from writing my first lines of production code to leading frontend architecture.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* ── Left: sticky sidebar (desktop only) ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block lg:w-[200px] flex-shrink-0"
            style={{ position: "sticky", top: "8rem", alignSelf: "flex-start" }}
          >
            <span
              className="block text-white/15 text-[10px] tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Timeline
            </span>

            {/* Year list */}
            <div className="flex flex-col gap-0">
              {years.map((year, i) => {
                const isActive = activeYear === year;
                return (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                    className="relative py-4 border-l border-white/[0.04]"
                  >
                    {/* Active lime bar */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#bcfc00] origin-top"
                      initial={false}
                      animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />

                    <span
                      className="pl-6 block transition-all duration-500 tracking-[-0.02em]"
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: isActive ? "2rem" : "1.5rem",
                        fontWeight: isActive ? 700 : 400,
                        lineHeight: 1,
                        color: isActive ? "#bcfc00" : "rgba(255,255,255,0.15)",
                      }}
                    >
                      {year}
                    </span>

                    {year === "2025" && (
                      <span className="pl-6 block mt-1.5">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#bcfc00] animate-pulse" />
                          <span
                            className="text-[#bcfc00]/40 text-[10px] tracking-[0.15em] uppercase"
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                          >
                            Now
                          </span>
                        </span>
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-12 pt-8 border-t border-white/[0.04] space-y-4"
            >
              <div>
                <span
                  className="block text-[#bcfc00] tracking-[-0.02em]"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.75rem", fontWeight: 700 }}
                >
                  4+
                </span>
                <span className="text-white/15 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                  Years Experience
                </span>
              </div>
              <div>
                <span
                  className="block text-white tracking-[-0.02em]"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.75rem", fontWeight: 700 }}
                >
                  13+
                </span>
                <span className="text-white/15 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                  Projects Shipped
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: scrolling cards ───────────────────────────────────────── */}
          <div className="flex-1 space-y-8">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                ref={(el) => { cardRefs.current[i] = el; }}
              >
                <ExperienceCard exp={exp} />
              </div>
            ))}

            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="block text-white/10 text-xs tracking-wider"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              The journey begins...
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}