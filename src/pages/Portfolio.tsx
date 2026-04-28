import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, LayoutGrid, CircleDot } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectBubbleChart from "@/components/ProjectBubbleChart";

import imgWeapon from "@/assets/projects/weapon-detection.jpg";
import imgTitanic from "@/assets/projects/titanic.jpg";
import imgNeo from "@/assets/projects/neo-analysis.jpg";
import imgBritish from "@/assets/projects/british-airways.jpg";
import imgAutocop from "@/assets/projects/autocop.jpg";
import imgParking from "@/assets/projects/parking-violation.jpg";
import imgEmail from "@/assets/project-mailintel.png";
import imgDocument from "@/assets/project-document-times.png";
import imgApple from "@/assets/project-apple-fhi.png";
import imgPlanets from "@/assets/project-astro-life.png";
import imgCampbells from "@/assets/projects/campbells.png";

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
    title: "Campbells AI and Marketing Hub",
    description: "End-to-end AI marketing intelligence platform predicting customer churn at 84% AUC, segmenting 1,500+ customers via RFM KMeans clustering, ABSA sentiment analysis, and auto-generating personalized SMS, email & push notifications using LLaMA 3.3-70B.",
    tech: ["XGBoost", "KMeans", "FastAPI", "Supabase", "React", "Groq API"],
    category: "Machine Learning",
    image: imgCampbells,
    github: "https://github.com/MurtazaMajid/Campbells-AI-and-Marketing-Hub",
    demo: "https://campbells-ai-hub.vercel.app/",
  },
  {
    title: "SentinelAI – Real-Time Weapon Detection System",
    description: "Real-time weapon detection system using YOLOv8 trained on 8,000 Roboflow-annotated images. Identifies weapons in static images and live camera feeds, surfaced through a deployed web app for public-safety use cases.",
    tech: ["YOLOv8", "Python", "OpenCV", "PyTorch", "Roboflow"],
    category: "Deep Learning",
    image: imgWeapon,
    github: "https://github.com/MurtazaMajid/SentinelAI-Real-Time-Weapon-Detection-System",
    demo: "https://sentinel-ai-real-time-weapon-detection.vercel.app",
  },
  {
    title: "MailIntel – Email Classification App",
    description: "Production-style NLP pipeline classifying 5,000+ real Gmail messages into 5 categories. Compares Naive Bayes, SVM, and LSTM under identical conditions; LSTM wins at 81% accuracy. 13-stage cleaning pipeline with TF-IDF feature engineering, deployed end-to-end.",
    tech: ["Python", "Scikit-Learn", "TensorFlow", "FastAPI", "Supabase"],
    category: "NLP",
    image: imgEmail,
    github: "https://github.com/MurtazaMajid/MailIntel-Email-Classification-App",
    demo: "https://mailntel.vercel.app",
  },
  {
    title: "TheDocumentTimes – Document Categorization App",
    description: "NLP document classifier built on the 20 Newsgroups dataset. Trains a fine-tuned BERT alongside an LSTM baseline and serves predictions through a clean web app where users paste any text and get its predicted news category in real time.",
    tech: ["Python", "BERT", "LSTM", "Transformers", "TensorFlow"],
    category: "NLP",
    image: imgDocument,
    github: "https://github.com/MurtazaMajid/TheDocumentTimes-Document-Categorization-App",
    demo: "https://bert-news-classification.vercel.app/",
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
    github: "https://github.com/MurtazaMajid/Hazardous-NEOs-Prediction",
    demo: "",
  },
  {
    title: "Apple FHI Forecasting with ARIMA LSTM",
    description: "End-to-end forecasting system for Apple's Financial Health Index built from 7 data sources. Trained 4 models (ARIMAX × 2, LSTM × 2), explained with SHAP, deployed live as REST API + interactive web app. Honest benchmark: ARIMAX RMSE 0.0971 with zero data leakage.",
    tech: ["Python", "ARIMAX", "LSTM", "FinBERT", "SHAP", "FastAPI"],
    category: "Data Analysis",
    image: imgApple,
    github: "https://github.com/MurtazaMajid/Apple-FHI-Forecasting-with-ARIMA-LSTM",
    demo: "https://apple-fhi-forecasting-with-arima-lstm.vercel.app/",
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
    title: "AstroLifeQuest – Predicting Planets Habitability",
    description: "Predicts exoplanet habitability from NASA's Kepler KOI dataset using a physics-informed scoring engine and a tuned XGBoost regressor. Explained with SHAP, deployed as a FastAPI service on HuggingFace Spaces and a Next.js web app on Vercel.",
    tech: ["Python", "XGBoost", "SHAP", "FastAPI", "Next.js", "NASA KOI"],
    category: "Machine Learning",
    image: imgPlanets,
    github: "https://github.com/MurtazaMajid/AstroLifeQuest-Predicting-Planets-Habitability",
    demo: "https://astro-life-quest.vercel.app/",
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

// Visual complexity (1-10) per project, drives bubble-chart sizing
const COMPLEXITY: Record<string, number> = {
  "AutoCop – AI Traffic Violation Detection": 10,
  "Campbells AI and Marketing Hub": 9,
  "SentinelAI – Real-Time Weapon Detection System": 8,
  "MailIntel – Email Classification App": 9,
  "TheDocumentTimes – Document Categorization App": 7,
  "Titanic Survival Classification": 5,
  "Hazardous NEOs Prediction": 6,
  "Apple FHI Forecasting with ARIMA LSTM": 8,
  "British Airways Analysis": 6,
  "AstroLifeQuest – Predicting Planets Habitability": 7,
  "Parking Violation Risk Prediction": 9,
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const PortfolioContent = () => {
  const [active, setActive] = useState("All");
  const [view, setView] = useState<"grid" | "bubble">("grid");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <section id="portfolio" className="pt-20 pb-8 md:pt-28">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 className="section-heading" {...fadeUp}>My Portfolio</motion.h1>
          <div className="section-divider" />
          <motion.p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-10" {...fadeUp}>
            Here are some of my data science projects. Each project demonstrates my skills in different areas of data analysis, machine learning, and visualization.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-3 mb-6" {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }}>
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

          {/* View toggle */}
          <motion.div
            className="inline-flex items-center gap-1 p-1 rounded-full border border-border bg-card mb-12"
            {...fadeUp}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <button
              onClick={() => setView("grid")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={view === "grid"}
            >
              <LayoutGrid size={14} /> Grid
            </button>
            <button
              onClick={() => setView("bubble")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                view === "bubble" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={view === "bubble"}
            >
              <CircleDot size={14} /> Bubble
            </button>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6">
          {view === "bubble" ? (
            <motion.div
              key="bubble"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectBubbleChart
                projects={projects.map((p) => ({
                  title: p.title,
                  category: p.category,
                  github: p.github,
                  demo: p.demo,
                  complexity: COMPLEXITY[p.title] ?? 6,
                }))}
                categories={categories}
                active={active}
              />
            </motion.div>
          ) : (
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
                        title="GitHub Repository"
                      >
                        <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full flex items-center justify-center text-primary-foreground transition-transform hover:scale-110"
                          style={{ background: "var(--gradient-primary)" }}
                          onClick={(e) => e.stopPropagation()}
                          title="Live Demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
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
          )}

          {view === "grid" && filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No projects in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
};

const Portfolio = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PortfolioContent />
    <Footer />
  </div>
);

export default Portfolio;
