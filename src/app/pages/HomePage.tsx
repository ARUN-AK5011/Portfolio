import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "../components/Navbar";
import { MarqueeSection } from "../components/MarqueeSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProcessSection } from "../components/ProcessSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { PageLoader } from "../components/PageLoader";

// Module-level flag - survives re-renders and back-navigation,
// resets only on a full page refresh (which is the correct behaviour).
let hasLoadedOnce = false;

export function HomePage() {
  const [loading, setLoading] = useState(!hasLoadedOnce);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <PageLoader onComplete={() => { hasLoadedOnce = true; setLoading(false); }} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative bg-[#050505] min-h-screen"
        style={{ cursor: "auto", overflowX: "clip" }}
      >
        {!loading && (
          <>
            <Navbar />
            <AboutSection />
            <MarqueeSection />
            <SkillsSection />
            <ProcessSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
            <Footer />
          </>
        )}
      </motion.div>
    </>
  );
}