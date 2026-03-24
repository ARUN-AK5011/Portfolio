import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Code2, Palette, Server, Database, ArrowRight } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    skills: ["React.js / Next.js", "React Native", "TypeScript", "Tailwind CSS", "Three.js", "WebGL"],
  },
  {
    icon: Server,
    title: "Backend Systems",
    skills: [ "Golang", "Node.js / Express", "NestJS",  "REST APIs", "Microservices", "WebSockets"],
  },
  {
    icon: Database,
    title: "Data & Infrastructure",
    skills: ["MySql", "PostgreSQL", "Firebase", "MongoDB", "Redis", "Docker", "Git / Github", "CI / CD" ,"AWS / GCP"],
  },
  {
    icon: Palette,
    title: "Design & Creative",
    skills: ["Figma", "UI/UX Design", "Design Systems", "Prototyping", "Software Architecture", "DB Schema Design "],
  },
];

const tools = [
  "VS Code", "Git", "Figma", "GCS", "EAS", "Docker", "Linux",
  "GCP", "Hostinger", "Github", "Firebase", "Postman",
];

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section id="skills" ref={ref} className="relative py-32 md:py-44 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#bcfc00]/[0.02] blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Two column layout: heading + cards */}
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-20 mb-24">
          {/* Left - sticky heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="overflow-hidden mb-3">
              <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-white tracking-[-0.03em]"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.15 }}
              >
                Technologies I work
              </motion.div>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#bcfc00] tracking-[-0.03em]"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.15 }}
              >
                with every day
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/30 mb-10"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              I stay at the cutting edge of web technology, constantly learning and adapting.
              Here's my core toolkit that I use to ship exceptional products.
            </motion.p>

            {/* Tool pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-2"
            >
              {tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.04, duration: 0.4 }}
                  className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/25 text-xs hover:text-[#bcfc00]/60 hover:border-[#bcfc00]/10 hover:bg-[#bcfc00]/[0.04] transition-all duration-500 cursor-default"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {tool}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right - skill cards */}
          <div className="grid gap-5">
            {skillCategories.map((cat, i) => {
              const Icon = cat.icon;
              const isExpanded = expandedCard === i;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, x: 60 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.15 * i + 0.2 }}
                  onClick={() => setExpandedCard(isExpanded ? null : i)}
                  className="relative group p-6 md:p-7 rounded-2xl border border-white/[0.04] bg-white/[0.015] cursor-pointer transition-all duration-500 overflow-hidden hover:border-[#bcfc00]/15"
                >
                  {/* Background glow on hover */}
                  <div className="absolute inset-0 bg-[#bcfc00]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center border border-[#bcfc00]/15 bg-[#bcfc00]/[0.05] transition-colors duration-500"
                        >
                          <Icon size={20} className="text-[#bcfc00]" />
                        </div>
                        <h3
                          className="text-white/80 group-hover:text-white transition-colors duration-300"
                          style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.15rem", fontWeight: 600 }}
                        >
                          {cat.title}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-white/20 group-hover:text-white/40 transition-colors"
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-3 border-t border-white/[0.04]">
                        {cat.skills.map((skill, j) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ delay: j * 0.05, duration: 0.3 }}
                            className="flex items-center gap-2 py-2"
                          >
                            <div className="w-1 h-1 rounded-full flex-shrink-0 bg-[#bcfc00]" />
                            <span className="text-white/45 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{skill}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Collapsed preview */}
                    {!isExpanded && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {cat.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="text-white/20 text-xs"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {skill}
                            {skill !== cat.skills[3] && " · "}
                          </span>
                        ))}
                        <span className="text-white/10 text-xs">+{cat.skills.length - 4}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SEO Hidden Content */}
        <div className="sr-only">
          <h2>Golang Developer Skills | Go Developer Chennai | Software Engineer Skills</h2>
          <p>golang developer skills - Go, Golang, Node.js, Express, NestJS, REST API development, GraphQL, Microservices architecture, concurrent programming.</p>
          <p>Arun Kumar software developer skills: React.js, Next.js, React Native, TypeScript, Tailwind CSS, WebGL, Three.js frontend.</p>
          <p>Backend skills: PostgreSQL, MySQL, MongoDB, Redis, Firebase, AWS, GCP, Docker, Kubernetes, CI/CD - hire golang developer.</p>
          <p>Software engineer tools: Git, VS Code, Linux, Docker, Postman, Figma, Design Systems</p>
        </div>
      </div>
    </section>
  );
}