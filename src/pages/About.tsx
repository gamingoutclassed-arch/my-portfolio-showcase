import { motion } from "framer-motion";
import { Download, Eye } from "lucide-react";
import profileImg from "@/assets/murtaza-profile.png";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillsRadar from "@/components/SkillsRadar";
import CareerTimeline from "@/components/CareerTimeline";
import TerminalBio from "@/components/TerminalBio";

const skills = [
  "Python", "R", "SQL", "Machine Learning", "Deep Learning", "Data Visualization",
  "Statistical Analysis", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn",
  "Tableau", "Power BI", "Data Mining", "Natural Language Processing",
  "OpenCV", "MediaPipe", "YOLOv11", "Streamlit", "FastAPI", "Feature Engineering",
];

const experience = [
  {
    title: "Computer Vision & AI Intern",
    company: "Scoutrex",
    location: "Islamabad",
    period: "Dec 2025 – Feb 2026",
    points: [
      "Optimized PyTorch models for cricket video analysis under motion blur and varied lighting.",
      "Engineered action phase segmentation pipeline to classify bowling stages using temporal motion tracking.",
    ],
  },
  {
    title: "Data Science Intern",
    company: "ITSOLERA Pvt. Ltd.",
    location: "Islamabad",
    period: "Jul 2025 – Sep 2025",
    points: [
      "Improved time-series forecast accuracy by 15% using LSTM, ARIMA, XGBoost, and Random Forest models.",
      "Built interactive Streamlit dashboards to visualize trends, KPIs, and model predictions.",
    ],
  },
  {
    title: "LLM Task Trainer",
    company: "Turing",
    location: "Remote",
    period: "2024",
    points: [
      "Engineered system/user prompts and multi-step task chains to optimize instruction following.",
      "Mitigated hallucinations and improved model reasoning through rigorous RLHF evaluation.",
    ],
  },
  {
    title: "Content Writer",
    company: "Xerosector Technologies",
    location: "Remote",
    period: "Jul 2022 – Aug 2022",
    points: [
      "Created 50+ SEO-optimized product descriptions, boosting organic traffic by 15%.",
    ],
  },
];

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

      {/* Who I Am */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp} className="flex justify-center">
              <div className="w-72 h-80 rounded-xl overflow-hidden border-2 border-primary/30" style={{ boxShadow: "var(--shadow-glow)" }}>
                <img src={profileImg} alt="Murtaza Majid" className="w-full h-full object-cover object-top" />
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }}>
              <h2 className="text-2xl font-bold font-heading text-foreground mb-2">Who I Am</h2>
              <div className="w-12 h-1 rounded-full mb-6" style={{ background: "var(--gradient-primary)" }} />
              <p className="text-muted-foreground leading-relaxed mb-4">
                I am a dedicated and innovative data scientist with a strong foundation in data analysis, machine learning, and visualization. With a creative mindset and a detail-oriented approach, I thrive on uncovering meaningful insights from complex datasets and transforming them into actionable solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Passionate about continuous learning, I combine my technical expertise with a flair for design, excelling in projects that blend analytical rigor with aesthetic appeal.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div><span className="text-foreground font-semibold">Name:</span> <span className="text-muted-foreground">Murtaza Majid</span></div>
                <div><span className="text-foreground font-semibold">Email:</span> <span className="text-muted-foreground">Murtazaworks0@gmail.com</span></div>
                <div><span className="text-foreground font-semibold">Education:</span> <span className="text-muted-foreground">BS Data Science</span></div>
                <div><span className="text-foreground font-semibold">Location:</span> <span className="text-muted-foreground">Rawalpindi, Pakistan</span></div>
              </div>

              <div className="flex gap-4">
                <a
                  href="/Murtaza_Majid_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Eye size={16} /> View Resume
                </a>
                <a
                  href="/Murtaza_Majid_Resume.pdf"
                  download="Murtaza_Majid_Resume.pdf"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-border text-foreground hover:border-primary transition-colors"
                >
                  <Download size={16} /> Download PDF
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <motion.h2 className="section-heading text-center" {...fadeUp}>My Skills</motion.h2>
          <div className="section-divider" />
          <div className="max-w-4xl mx-auto">
            <motion.div className="flex flex-wrap justify-center gap-3" {...fadeUp}>
              {skills.map((skill) => (
                <span key={skill} className="skill-badge">{skill}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <motion.h2 className="section-heading text-center" {...fadeUp}>Work Experience</motion.h2>
          <div className="section-divider" />
          <div className="max-w-3xl mx-auto space-y-6">
            {experience.map((exp, i) => (
              <motion.div key={i} className="glass-card p-6" {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h3 className="text-foreground font-heading font-semibold text-lg">{exp.title}</h3>
                  <span className="flex items-center gap-1 text-primary text-sm"><Calendar size={14} /> {exp.period}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-sm mb-3">
                  <span className="flex items-center gap-1"><Briefcase size={14} /> {exp.company}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {exp.location}</span>
                </div>
                <ul className="space-y-2">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-muted-foreground text-sm flex gap-2">
                      <span className="text-primary mt-1.5 shrink-0">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
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
