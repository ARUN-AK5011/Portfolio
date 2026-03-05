import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, MapPin, ArrowUpRight, Copy, Check } from "lucide-react";

const socials = [
  { name: "GitHub", url: "https://github.com/ARUN-AK5011" },
  { name: "LinkedIn", url: "https://linkedin.com/in/arunak-dev" },
  // { name: "Twitter", url: "https://twitter.com/yourusername" },
  { name: "Dribbble", url: "https://dribbble.com/arun_ak_5396" },
];

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    const email = "thedeveloper.arun@gmail.com";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2500);
      }).catch(() => {
        fallbackCopy(email);
      });
    } else {
      fallbackCopy(email);
    }
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 md:py-44 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.04]" />

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#bcfc00]/[0.015] blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
        {/* Headline */}
        <div className="mb-8">
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: "110%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white tracking-[-0.04em]"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 600, lineHeight: 1.1 }}
            >
              Let's work
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "110%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#bcfc00] tracking-[-0.04em]"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 600, lineHeight: 1.1 }}
            >
              together.
            </motion.div>
          </div>
        </div>

        {/* Developer message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-white/30 max-w-xl mx-auto mb-16"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.85 }}
        >
          I'm currently available for freelance work and open to full-time opportunities.
          Whether it's a bold new product, a creative rebrand, or something experimental, I'd love to hear about it.
        </motion.p>

        {/* Email copy card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mb-16 w-full flex justify-center"
        >
          <motion.button
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full sm:w-auto flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-4 sm:py-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-[#bcfc00]/20 hover:bg-[#bcfc00]/[0.04] transition-all duration-500 cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#bcfc00]/[0.08] flex items-center justify-center shrink-0">
              <Mail size={18} className="text-[#bcfc00]" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <span
                className="block text-white/20 text-[11px] tracking-[0.15em] uppercase mb-1"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {copiedEmail ? "Copied to clipboard!" : "Click to copy email"}
              </span>
              <span
                className="text-white group-hover:text-[#bcfc00] transition-colors duration-300 break-all sm:break-normal"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(0.95rem, 3.5vw, 1.25rem)", fontWeight: 500 }}
              >
                thedeveloper.arun@gmail.com
              </span>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/[0.06] flex items-center justify-center group-hover:border-[#bcfc00]/20 transition-all duration-500 shrink-0">
              {copiedEmail ? (
                <Check size={15} className="text-[#bcfc00]" />
              ) : (
                <Copy size={15} className="text-white/30 group-hover:text-[#bcfc00] transition-colors duration-300" />
              )}
            </div>
          </motion.button>
        </motion.div>

        {/* Location + availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-16"
        >
          <div className="flex items-center gap-2 text-white/30">
            <MapPin size={14} className="text-[#bcfc00]/50" />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem" }}>Chennai, India</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#bcfc00] animate-pulse" />
            <span className="text-white/30" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem" }}>
              Available for new projects
            </span>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span
            className="block text-white/15 text-[11px] tracking-[0.2em] uppercase mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Find me on
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {socials.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.75 + i * 0.08 }}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.015] hover:border-[#bcfc00]/15 hover:bg-[#bcfc00]/[0.03] transition-all duration-500"
              >
                <span
                  className="text-white/40 group-hover:text-[#bcfc00] transition-colors duration-300"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                  }}
                >
                  {social.name}
                </span>

                <ArrowUpRight
                  size={13}
                  className="text-white/15 group-hover:text-[#bcfc00]/60 transition-colors duration-300"
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}