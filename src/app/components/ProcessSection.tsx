import { motion, useInView, useMotionValue, animate } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  PenTool,
  Code,
  Rocket,
  RefreshCw,
} from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Discovery",
    description:
      "Deep-dive into your vision, goals, and user needs through stakeholder interviews and thorough research to set the foundation.",
    accent: "Understanding your world",
  },
  {
    icon: Search,
    number: "02",
    title: "Strategy",
    description:
      "Map out the architecture, user flows, and technical approach with intentional decisions that align with your business goals.",
    accent: "Charting the course",
  },
  {
    icon: PenTool,
    number: "03",
    title: "Design",
    description:
      "Craft pixel-perfect interfaces from wireframes to high-fidelity prototypes and cohesive design systems built to scale.",
    accent: "Shaping the experience",
  },
  {
    icon: Code,
    number: "04",
    title: "Develop",
    description:
      "Build with clean, scalable code, performance and accessibility baked in from the very start, with rigorous testing.",
    accent: "Bringing it to life",
  },
  {
    icon: Rocket,
    number: "05",
    title: "Launch",
    description:
      "Deploy with confidence through CI/CD pipelines, monitoring, error tracking, and a smooth go-live strategy.",
    accent: "Going live",
  },
  {
    icon: RefreshCw,
    number: "06",
    title: "Iterate",
    description:
      "Continuous improvement based on real user data and analytics. Ship fast, learn faster, and evolve the product.",
    accent: "Never stop improving",
  },
];

const CARD_W = 340;
const CARD_GAP = 24;
const LOOP_W = steps.length * (CARD_W + CARD_GAP);

const loopedSteps = [...steps, ...steps];

/* Wave Y offsets for each card (alternating high/low) */
const WAVE_AMP = 60;
const waveOffsets = steps.map((_, i) => (i % 2 === 0 ? 0 : WAVE_AMP * 2));
const loopedWaveOffsets = [...waveOffsets, ...waveOffsets];

/* Build SVG wave path data for one set of steps (will be duplicated) */
function buildWavePath(count: number, cardW: number, gap: number, offsets: number[], waveCenter: number) {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const cx = i * (cardW + gap) + cardW / 2;
    const cy = waveCenter + (offsets[i % offsets.length] - WAVE_AMP);
    points.push({ x: cx, y: cy });
  }

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return { d, points };
}

/* ── Card ── */
function ProcessCard({
  step,
  loopIndex,
  activeIndex,
  yOffset,
}: {
  step: (typeof steps)[0];
  loopIndex: number;
  activeIndex: number;
  yOffset: number;
}) {
  const Icon = step.icon;
  const isActive = (loopIndex % steps.length) === activeIndex;

  return (
    <div
      className="relative p-7 rounded-2xl shrink-0"
      style={{
        width: CARD_W,
        transform: `translateY(${yOffset}px)`,
        border: isActive
          ? "1px solid rgba(188,252,0,0.22)"
          : "1px solid rgba(255,255,255,0.04)",
        backgroundColor: isActive
          ? "rgba(188,252,0,0.035)"
          : "rgba(255,255,255,0.012)",
        opacity: isActive ? 1 : 0.48,
        transition: "all 0.55s ease",
      }}
    >
      {/* Watermark number */}
      <span
        className="absolute top-0 right-0 select-none pointer-events-none overflow-hidden"
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "6rem",
          fontWeight: 700,
          lineHeight: 1,
          maxWidth: "60%",
          color: isActive ? "rgba(188,252,0,0.06)" : "rgba(255,255,255,0.02)",
          transition: "color 0.55s ease",
        }}
      >
        {step.number}
      </span>

      <div className="relative z-10">
        {/* Accent label */}
        <span
          className="text-[10px] tracking-[0.2em] uppercase block mb-5"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 500,
            color: isActive ? "rgba(188,252,0,0.75)" : "rgba(188,252,0,0.28)",
            transition: "color 0.55s ease",
          }}
        >
          {step.accent}
        </span>

        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
          style={{
            backgroundColor: isActive
              ? "rgba(188,252,0,0.08)"
              : "rgba(188,252,0,0.025)",
            border: isActive
              ? "1px solid rgba(188,252,0,0.2)"
              : "1px solid rgba(188,252,0,0.06)",
            transition: "all 0.55s ease",
          }}
        >
          <Icon
            size={20}
            style={{
              color: isActive ? "#bcfc00" : "rgba(188,252,0,0.35)",
              transition: "color 0.55s ease",
            }}
          />
        </div>

        {/* Title */}
        <h4
          className="text-white mb-3"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "1.3rem",
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          {step.title}
        </h4>

        {/* Description */}
        <p
          className="text-white/25"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.88rem",
            lineHeight: 1.75,
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}

/* ── Section ── */
export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const x = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  /* Track active step from x - offset by half viewport to detect CENTER card */
  useEffect(() => {
    const unsub = x.on("change", (val) => {
      const viewportCenter = window.innerWidth / 2;
      const pos = (((-val + viewportCenter) % LOOP_W) + LOOP_W) % LOOP_W;
      const idx = Math.floor(pos / (CARD_W + CARD_GAP)) % steps.length;
      setActiveIndex(idx);
    });
    return unsub;
  }, [x]);

  /* Infinite auto-scroll */
  useEffect(() => {
    if (!isInView) return;

    let stopped = false;
    let ctrl: ReturnType<typeof animate> | null = null;

    const runLoop = () => {
      if (stopped) return;
      ctrl = animate(x, x.get() - LOOP_W, {
        duration: 45,
        ease: "linear",
        onComplete: () => {
          if (stopped) return;
          x.set(x.get() + LOOP_W); // instant invisible reset
          runLoop();
        },
      });
    };

    const timeout = setTimeout(runLoop, 700);
    return () => {
      stopped = true;
      clearTimeout(timeout);
      ctrl?.stop();
    };
  }, [isInView, x]);

  /* Wave path geometry */
  const WAVE_CENTER = 100;
  const totalSteps = loopedSteps.length;
  const svgWidth = totalSteps * (CARD_W + CARD_GAP);
  const svgHeight = WAVE_CENTER * 2;
  const { d: wavePath, points: wavePoints } = buildWavePath(
    totalSteps, CARD_W, CARD_GAP, waveOffsets, WAVE_CENTER
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-[#050505] overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <div className="flex flex-col h-screen">

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-20 md:pt-32 shrink-0">
          <div
            ref={headerRef}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-16 mb-10 md:mb-14"
          >
            <div className="max-w-xl">
              <div className="overflow-hidden mb-2">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={headerInView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-white tracking-[-0.03em]"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 600,
                    lineHeight: 1.15,
                  }}
                >
                  From idea to launch,
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={headerInView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[#bcfc00] tracking-[-0.03em]"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 600,
                    lineHeight: 1.15,
                  }}
                >
                  a refined workflow
                </motion.div>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/25 max-w-sm"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.8 }}
            >
              Every project follows a proven six-phase process, ensuring nothing
              is left to chance, from the first conversation to continuous evolution.
            </motion.p>
          </div>
        </div>

        {/* Infinite card strip with wave */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            className="flex relative"
            style={{
              x,
              gap: CARD_GAP,
              paddingLeft: "clamp(24px, 4vw, 48px)",
              paddingRight: "clamp(24px, 4vw, 48px)",
              willChange: "transform",
            }}
          >
            {/* SVG wavy line behind cards */}
            <svg
              className="absolute pointer-events-none"
              style={{
                top: "50%",
                left: 0,
                transform: "translateY(-50%)",
                width: svgWidth,
                height: svgHeight,
                overflow: "visible",
              }}
            >
              {/* Wave path */}
              <path
                d={wavePath}
                fill="none"
                stroke="rgba(188,252,0,0.12)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Glow duplicate */}
              <path
                d={wavePath}
                fill="none"
                stroke="rgba(188,252,0,0.04)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Dots at each card position on the wave */}
              {wavePoints.map((pt, i) => {
                const stepData = loopedSteps[i];
                const Icon = stepData.icon;
                const isActive = (i % steps.length) === activeIndex;
                return (
                  <g key={`dot-${i}`}>
                    {/* Outer glow ring */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isActive ? 20 : 14}
                      fill={isActive ? "rgba(188,252,0,0.06)" : "rgba(188,252,0,0.02)"}
                      style={{ transition: "all 0.55s ease" }}
                    />
                    {/* Inner circle */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isActive ? 12 : 8}
                      fill={isActive ? "rgba(188,252,0,0.15)" : "rgba(255,255,255,0.04)"}
                      stroke={isActive ? "rgba(188,252,0,0.4)" : "rgba(255,255,255,0.08)"}
                      strokeWidth="1.5"
                      style={{ transition: "all 0.55s ease" }}
                    />
                    {/* Center dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={3}
                      fill={isActive ? "#bcfc00" : "rgba(188,252,0,0.3)"}
                      style={{ transition: "all 0.55s ease" }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Cards */}
            {loopedSteps.map((step, i) => (
              <ProcessCard
                key={`${step.number}-${i}`}
                step={step}
                loopIndex={i}
                activeIndex={activeIndex}
                yOffset={loopedWaveOffsets[i]}
              />
            ))}
          </motion.div>
        </div>

        {/* Step indicator */}
        <motion.div
          className="px-6 md:px-12 pb-8 md:pb-10 shrink-0"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 sm:gap-6">
            <span
              className="text-[#bcfc00]/60 text-[11px] tracking-[0.18em] uppercase shrink-0 w-16 sm:w-24"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {steps[activeIndex].title}
            </span>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: i === activeIndex ? 20 : 6,
                    height: 6,
                    backgroundColor:
                      i === activeIndex
                        ? "rgba(188,252,0,0.7)"
                        : "rgba(255,255,255,0.08)",
                    transition: "width 0.4s ease, background-color 0.4s ease",
                  }}
                />
              ))}
            </div>

            <span
              className="text-white/20 text-[11px] tracking-[0.15em] ml-auto shrink-0"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {String(activeIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}