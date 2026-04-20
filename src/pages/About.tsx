import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CVDetectionCard from "@/components/CVDetectionCard";
import SkillRadarChart from "@/components/SkillRadarChart";
import CareerScatterChart from "@/components/CareerScatterChart";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const AboutContent = () => {
  return (
    <>
      {/* Hero */}
      <section id="about" className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 className="section-heading" {...fadeUp}>About Me</motion.h1>
          <div className="section-divider" />
          <motion.p className="text-muted-foreground max-w-2xl mx-auto text-lg" {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }}>
            I'm a passionate data scientist with extensive experience in data analysis, visualization, and machine learning. I specialize in uncovering insights from data and building creative, impactful solutions.
          </motion.p>
        </div>
      </section>

      {/* Who I Am — CV / Object Detection styled card */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <motion.div className="max-w-5xl mx-auto" {...fadeUp}>
            <CVDetectionCard />
          </motion.div>
        </div>
      </section>

      {/* Skill Radar */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <motion.h2 className="section-heading text-center" {...fadeUp}>Skill Radar</motion.h2>
          <div className="section-divider" />
          <motion.div className="max-w-3xl mx-auto" {...fadeUp}>
            <SkillRadarChart />
          </motion.div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <motion.h2 className="section-heading text-center" {...fadeUp}>Career Timeline</motion.h2>
          <div className="section-divider" />
          <motion.div className="max-w-4xl mx-auto" {...fadeUp}>
            <CareerScatterChart />
          </motion.div>
        </div>
      </section>
    </>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AboutContent />
      <Footer />
    </div>
  );
};

export default About;
