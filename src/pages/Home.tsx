import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import profileImg from "@/assets/murtaza-profile.png";

const Home = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="container mx-auto px-6 pt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">Data Scientist & ML Engineer</p>
            <h1 className="hero-name mb-6">
              I'm Murtaza,<br />
              a Data Scientist
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-8">
              Data Science undergraduate with hands-on experience in machine learning, computer vision, and time-series forecasting, delivering production-style AI solutions.
            </p>
            <div className="flex gap-4 mb-10">
              <Link
                to="/portfolio"
                className="px-6 py-3 rounded-lg font-medium text-sm text-primary-foreground transition-all hover:opacity-90"
                style={{ background: "var(--gradient-primary)" }}
              >
                View Portfolio →
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 rounded-lg font-medium text-sm border border-border text-foreground hover:border-primary transition-colors"
              >
                About Me
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground text-sm">Follow me</span>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: "https://github.com/MurtazaMajid" },
                  { icon: Linkedin, href: "https://linkedin.com/in/murtaza-majid" },
                  { icon: Mail, href: "mailto:Murtazamajid.123@gmail.com" },
                ].map(({ icon: Icon, href }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl" style={{ boxShadow: "var(--shadow-glow)" }}>
                <img src={profileImg} alt="Murtaza Majid" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                <span className="text-primary-foreground font-heading font-bold text-xs text-center leading-tight">DS &<br/>ML</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="text-primary" size={28} />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
