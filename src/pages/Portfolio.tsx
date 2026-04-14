import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "Computer Vision", "NLP", "Data Science", "Full Stack"];

const projects = [
  {
    title: "AutoCop – AI Traffic Violation Detection",
    description: "Real-time AI traffic monitoring system detecting 6+ violation types at 95%+ accuracy with automated Gmail alerts.",
    tech: ["YOLOv11", "OpenCV", "FastAPI", "PostgreSQL", "Next.js"],
    category: "Computer Vision",
    github: "https://github.com/MurtazaMajid",
  },
  {
    title: "Gmail Email Classification Pipeline",
    description: "End-to-end NLP pipeline classifying 5,000+ Gmail emails into five categories using TF-IDF and LSTM with 81% accuracy.",
    tech: ["Python", "Scikit-Learn", "TensorFlow", "FastAPI", "Supabase"],
    category: "NLP",
    github: "https://github.com/MurtazaMajid",
  },
  {
    title: "Cricket Video Analysis – Scoutrex",
    description: "PyTorch models for cricket video analysis with MediaPipe pose extraction for biomechanical analysis and bowler speed estimation.",
    tech: ["PyTorch", "OpenCV", "MediaPipe", "Roboflow"],
    category: "Computer Vision",
    github: "https://github.com/MurtazaMajid",
  },
  {
    title: "Time-Series Forecasting Dashboard",
    description: "Interactive Streamlit dashboards with LSTM, ARIMA, XGBoost models improving forecast accuracy by 15%.",
    tech: ["Python", "Streamlit", "Pandas", "Plotly"],
    category: "Data Science",
    github: "https://github.com/MurtazaMajid",
  },
  {
    title: "Parking Violation Risk Prediction",
    description: "ML system achieving RMSE of 0.13 — Winner of Air MLX Hackathon 2025.",
    tech: ["Python", "Scikit-Learn", "Feature Engineering"],
    category: "Data Science",
    github: "https://github.com/MurtazaMajid",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Portfolio = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-8">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 className="section-heading" {...fadeUp}>My Portfolio</motion.h1>
          <div className="section-divider" />
          <motion.p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-10" {...fadeUp}>
            Explore my projects across machine learning, computer vision, NLP, and full-stack development.
          </motion.p>

          {/* Filters */}
          <motion.div className="flex flex-wrap justify-center gap-3 mb-12" {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`filter-btn ${active === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <motion.a
                  key={project.title}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  {/* Color bar */}
                  <div className="h-1 w-full" style={{ background: "var(--gradient-primary)" }} />

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-foreground font-heading font-semibold text-lg leading-tight pr-4">{project.title}</h3>
                      <ExternalLink size={18} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                    </div>

                    <span className="text-xs text-primary font-medium uppercase tracking-wider">{project.category}</span>

                    <p className="text-muted-foreground text-sm mt-3 mb-4 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded border border-border text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No projects in this category yet.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
