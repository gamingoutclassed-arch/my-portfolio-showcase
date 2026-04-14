import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import imgWeapon from "@/assets/projects/weapon-detection.jpg";
import imgTitanic from "@/assets/projects/titanic.jpg";
import imgDocument from "@/assets/projects/document-nlp.jpg";
import imgNeo from "@/assets/projects/neo-analysis.jpg";
import imgEmail from "@/assets/projects/email-classification.jpg";
import imgApple from "@/assets/projects/apple-forecasting.jpg";
import imgBritish from "@/assets/projects/british-airways.jpg";
import imgPlanets from "@/assets/projects/planets-habitability.jpg";
import imgAutocop from "@/assets/projects/autocop.jpg";
import imgParking from "@/assets/projects/parking-violation.jpg";

const categories = ["All", "Data Analysis", "Deep Learning", "Machine Learning", "NLP"];

const projects = [
  {
    title: "AutoCop – AI Traffic Violation Detection",
    description: "Real-time AI traffic monitoring system detecting 6+ violation types at 95%+ accuracy with automated Gmail alerts.",
    tech: ["YOLOv11", "OpenCV", "FastAPI", "PostgreSQL", "Next.js"],
    category: "Deep Learning",
    image: imgAutocop,
    github: "https://github.com/MurtazaMajid/AutoCop",
    demo: "",
  },
  {
    title: "Weapon Detection with YOLOv8",
    description: "Developed a weapon detection system using YOLOv8 trained on a dataset of 8,000 images from Roboflow. Identifies weapons in both static images and live camera feeds.",
    tech: ["YOLOv8", "Python", "OpenCV", "PyTorch", "Roboflow"],
    category: "Deep Learning",
    image: imgWeapon,
    github: "https://github.com/MurtazaMajid/Weapon-Detection-YOLOv8",
    demo: "",
  },
  {
    title: "Gmail Email Classification Pipeline",
    description: "End-to-end NLP pipeline classifying 5,000+ Gmail emails into five categories using TF-IDF and LSTM with 81% accuracy.",
    tech: ["Python", "Scikit-Learn", "TensorFlow", "FastAPI", "Supabase"],
    category: "NLP",
    image: imgEmail,
    github: "https://github.com/MurtazaMajid/Email-Classification-App",
    demo: "",
  },
  {
    title: "Document Categorization using NLP",
    description: "Created an NLP system that automatically categorizes documents into relevant topics using text preprocessing, feature extraction, and classification algorithms.",
    tech: ["Python", "NLTK", "SpaCy", "TF-IDF", "Transformers"],
    category: "NLP",
    image: imgDocument,
    github: "https://github.com/MurtazaMajid/Document-Categorization",
    demo: "",
  },
  {
    title: "Titanic Survival Classification",
    description: "End-to-end Titanic survival analysis: data cleaning, EDA, feature engineering, and Logistic Regression achieving 76% accuracy.",
    tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "XGBoost"],
    category: "Machine Learning",
    image: imgTitanic,
    github: "https://github.com/MurtazaMajid/Titanic-Data-Analysis",
    demo: "",
  },
  {
    title: "Hazardous NEOs Prediction",
    description: "Predicts whether Near-Earth Objects (NEOs) are hazardous using machine learning. Combines feature selection, model training, and evaluation for accurate prediction.",
    tech: ["Python", "Scikit-Learn", "Pandas", "Feature Engineering"],
    category: "Machine Learning",
    image: imgNeo,
    github: "https://github.com/MurtazaMajid/Hazerdous-NEOs-Prediction-",
    demo: "",
  },
  {
    title: "Apple FHI Forecasting with ARIMA & LSTM",
    description: "Time-series forecasting of Apple's Financial Health Index using ARIMA and LSTM models for accurate trend prediction.",
    tech: ["Python", "ARIMA", "LSTM", "Pandas", "Matplotlib"],
    category: "Data Analysis",
    image: imgApple,
    github: "https://github.com/MurtazaMajid/Apple-FHI-Forecasting-with-ARIMA-LSTM",
    demo: "",
  },
  {
    title: "British Airways Analysis",
    description: "British Airways ticket booking analysis and prediction — comprehensive data exploration and predictive modeling.",
    tech: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Seaborn"],
    category: "Data Analysis",
    image: imgBritish,
    github: "https://github.com/MurtazaMajid/British-Airways-Analysis",
    demo: "",
  },
  {
    title: "Predicting Planets Habitability",
    description: "Revealing the secrets of planet habitability using NASA's KOI Dataset with machine learning classification techniques.",
    tech: ["Python", "Scikit-Learn", "NASA KOI", "Pandas"],
    category: "Machine Learning",
    image: imgPlanets,
    github: "https://github.com/MurtazaMajid/Predicing-Planets-Habitability",
    demo: "",
  },
  {
    title: "Parking Violation Risk Prediction",
    description: "ML system achieving RMSE of 0.13 — Winner of Air MLX Hackathon 2025.",
    tech: ["Python", "Scikit-Learn", "Feature Engineering", "XGBoost"],
    category: "Machine Learning",
    image: imgParking,
    github: "https://github.com/MurtazaMajid/Parking-Violation-Prediction",
    demo: "",
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
            Here are some of my data science projects. Each project demonstrates my skills in different areas of data analysis, machine learning, and visualization.
          </motion.p>

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
                <motion.div
                  key={project.title}
                  className="project-card group relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      width={768}
                      height={512}
                    />
                    {/* Hover overlay with links */}
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full flex items-center justify-center text-primary-foreground transition-transform hover:scale-110"
                        style={{ background: "var(--gradient-primary)" }}
                        onClick={(e) => e.stopPropagation()}
                        title="View on GitHub"
                      >
                        <ExternalLink size={20} />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full flex items-center justify-center text-primary-foreground transition-transform hover:scale-110"
                        style={{ background: "var(--gradient-primary)" }}
                        onClick={(e) => e.stopPropagation()}
                        title="GitHub Repository"
                      >
                        <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-foreground font-heading font-semibold text-lg leading-tight mt-2 mb-3">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded border border-border text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
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
