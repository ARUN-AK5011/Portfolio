import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const row1 = ["React.js", "React Native", "TypeScript", "Next.js", "Golang", "Node.js", "Python", "Java", "Mysql", "PostgreSQL", "Docker"];
const row2 = ["Figma", "Tailwind CSS", "Postman", "Supabase", "Firebase", "GCP", "Redis", "CI / CD", "Github", "Git", "Linux"];

function MarqueeRow({ items, direction, speed }: { items: string[]; direction: "left" | "right"; speed: number }) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="flex overflow-hidden py-3">
      <motion.div
        animate={{ x: direction === "left" ? [0, -33.33 * 16 * items.length / items.length] : [-33.33 * 16, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-6 pr-6 flex-shrink-0"
      >
        {doubled.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-6 flex-shrink-0">
            <span
              className="whitespace-nowrap text-white/[0.06] hover:text-white/20 transition-colors duration-700 select-none"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 600 }}
            >
              {item}
            </span>
            <svg width="8" height="8" viewBox="0 0 8 8" className="flex-shrink-0">
              <circle cx="4" cy="4" r="3" fill="none" stroke="rgba(188,252,0,0.15)" strokeWidth="1" />
            </svg>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function MarqueeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-150, 0]);

  return (
    <section ref={ref} className="relative py-12 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.04]" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.04]" />

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-[#050505] z-10" style={{ maskImage: "linear-gradient(to right, black, transparent)" , WebkitMaskImage: "linear-gradient(to right, black, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-[#050505] z-10" style={{ maskImage: "linear-gradient(to left, black, transparent)", WebkitMaskImage: "linear-gradient(to left, black, transparent)" }} />

      <motion.div style={{ x: x1 }}>
        <MarqueeRow items={row1} direction="left" speed={40} />
      </motion.div>
      <motion.div style={{ x: x2 }}>
        <MarqueeRow items={row2} direction="right" speed={45} />
      </motion.div>
    </section>
  );
}
