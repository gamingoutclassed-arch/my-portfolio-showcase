import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import profileImg from "@/assets/murtaza-profile.png";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const Home = () => {
  return (
    <section className="min-h-screen relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Large centered photo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <img
            src={profileImg}
            alt="Murtaza Majid"
            className="h-[85vh] max-h-[800px] object-contain opacity-80"
            style={{ filter: "brightness(0.85)" }}
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-background/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </motion.div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between pt-24 pb-8">
        <div className="container mx-auto px-6 flex-1 flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-center">
            {/* Left - Hero text */}
            <motion.div
              className="md:col-span-6"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="w-16 h-0.5 bg-foreground mb-8" />
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6">
                I'm Murtaza,{" "}
                <span className="block">a Data</span>
                <span className="block">Scientist</span>
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed max-w-md">
                Data Science undergraduate delivering production-style AI solutions across computer vision, NLP, and time-series forecasting.
              </p>
            </motion.div>

            {/* Right - Info panels */}
            <motion.div
              className="md:col-span-5 md:col-start-8 space-y-10"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* About Me */}
              <div>
                <h3 className="text-foreground font-heading font-bold text-sm uppercase tracking-widest mb-3">About Me</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Passionate data scientist with expertise in machine learning, computer vision, and building end-to-end AI pipelines. Currently pursuing BS in Data Science at Air University.
                </p>
                <Link to="/about" className="inline-flex items-center gap-2 text-foreground text-sm font-semibold border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors uppercase tracking-wider">
                  Learn More →
                </Link>
              </div>

              {/* My Work */}
              <div>
                <h3 className="text-foreground font-heading font-bold text-sm uppercase tracking-widest mb-3">My Work</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  From real-time traffic violation detection to Gmail classification pipelines — building AI systems that solve real problems.
                </p>
                <Link to="/portfolio" className="inline-flex items-center gap-2 text-foreground text-sm font-semibold border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors uppercase tracking-wider">
                  Browse Portfolio →
                </Link>
              </div>

              {/* Follow Me */}
              <div>
                <h3 className="text-foreground font-heading font-bold text-sm uppercase tracking-widest mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  {[
                    { icon: TwitterIcon, href: "#" },
                    { icon: InstagramIcon, href: "#" },
                    { icon: LinkedinIcon, href: "https://linkedin.com/in/murtaza-majid" },
                    { icon: GithubIcon, href: "https://github.com/MurtazaMajid" },
                    { icon: Mail, href: "mailto:Murtazamajid.123@gmail.com" },
                  ].map(({ icon: Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll down */}
        <motion.div
          className="flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <ArrowDown className="text-primary-foreground" size={22} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
