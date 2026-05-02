import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import profileImg from "@/assets/murtaza-profile.png";
import NeuralNetworkBg from "@/components/NeuralNetworkBg";
import TypewriterTitle from "@/components/TypewriterTitle";
import StatCounter from "@/components/StatCounter";


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

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const KaggleIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.238-.036.27l-6.555 6.344 6.836 8.507c.095.118.116.211.075.281z"/>
  </svg>
);

const Home = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-background">
      {/* Bold neural network background */}
      <NeuralNetworkBg />

      {/* Background profile image — centered, large, like the Developer X template */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none overflow-hidden">
        <img
          src={profileImg}
          alt=""
          className="h-[65vh] md:h-[90vh] w-auto max-w-none object-contain object-top brightness-125 contrast-105 mt-28 md:mt-20 opacity-70 md:opacity-100"
        />
      </div>

      {/* Gradient overlays — left side heavier for text, right lighter for sidebar */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" style={{
        background: "linear-gradient(to right, hsl(220 20% 7%) 0%, hsl(220 20% 7% / 0.8) 20%, hsl(220 20% 7% / 0.25) 40%, hsl(220 20% 7% / 0.15) 55%, hsl(220 20% 7% / 0.6) 80%, hsl(220 20% 7%) 100%)"
      }} />
      <div className="absolute inset-0 pointer-events-none md:hidden" style={{
        background: "linear-gradient(to bottom, hsl(220 20% 7% / 0.85) 0%, hsl(220 20% 7% / 0.7) 30%, hsl(220 20% 7% / 0.85) 60%, hsl(220 20% 7%) 90%)"
      }} />
      <div className="absolute inset-0 pointer-events-none hidden md:block" style={{
        background: "linear-gradient(to bottom, hsl(220 20% 7% / 0.6) 0%, transparent 20%, transparent 75%, hsl(220 20% 7%) 100%)"
      }} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex pt-24">
        <div className="container mx-auto px-6 flex flex-col lg:grid lg:grid-cols-12 gap-8 flex-1">
          
          {/* Left: Hero text */}
          <div className="lg:col-span-7 flex flex-col justify-end pb-16 lg:pb-24">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.6 }}
              className="h-1 bg-foreground mb-8"
            />

            <motion.h1
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.08] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              I'm Murtaza, a<br />
              <TypewriterTitle
                className="text-primary"
                words={["Data Scientist", "ML Engineer", "Computer Vision Dev", "NLP Builder", "Deep Learning Eng"]}
              />
            </motion.h1>

            {/* Animated stat counters */}
            <motion.div
              className="grid grid-cols-3 gap-4 max-w-md mb-8 p-4 rounded-xl border border-border bg-card/40 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <StatCounter end={7} suffix="+" label="AI Apps Built" />
              <StatCounter end={2} label="Internships" />
              <StatCounter end={15} suffix="%" label="Forecast Gain" />
            </motion.div>

            <motion.p
              className="text-foreground text-base md:text-lg leading-relaxed max-w-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Passionate about transforming data into meaningful insights through machine learning, deep learning, and AI-driven solutions.
            </motion.p>

            {/* Scroll down button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: "var(--gradient-primary)" }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                onClick={() => {
                  const about = document.getElementById('about');
                  if (about) about.scrollIntoView({ behavior: 'smooth' });
                  else {
                    const footer = document.querySelector('footer');
                    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
                    else window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }
                }}
              >
                <ArrowDown className="text-primary-foreground" size={24} />
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Info sidebar */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-center gap-10 pb-16 lg:pb-24 lg:pl-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {/* About Me */}
            <div>
              <h3 className="text-foreground font-heading font-bold text-sm uppercase tracking-[0.2em] mb-4">
                About Me
              </h3>
              <p className="text-foreground text-sm leading-relaxed mb-4">
                I am Murtaza, a creative and passionate Data Science student specializing in machine learning, NLP, and computer vision.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-foreground text-sm font-semibold hover:text-primary transition-colors uppercase tracking-wider border-b border-foreground hover:border-primary pb-1"
              >
                Learn More →
              </Link>
            </div>

            {/* My Work */}
            <div>
              <h3 className="text-foreground font-heading font-bold text-sm uppercase tracking-[0.2em] mb-4">
                My Work
              </h3>
              <p className="text-foreground text-sm leading-relaxed mb-4">
                I have built numerous data science projects spanning deep learning, NLP, and predictive analytics.
              </p>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-foreground text-sm font-semibold hover:text-primary transition-colors uppercase tracking-wider border-b border-foreground hover:border-primary pb-1"
              >
                Browse Portfolio →
              </Link>
            </div>

            {/* Follow Me */}
            <div>
              <h3 className="text-foreground font-heading font-bold text-sm uppercase tracking-[0.2em] mb-4">
                Follow Me
              </h3>
              <div className="flex gap-5">
                {[
                  { icon: GithubIcon, href: "https://github.com/MurtazaMajid" },
                  { icon: LinkedinIcon, href: "https://linkedin.com/in/murtaza-majid" },
                  { icon: TwitterIcon, href: "#" },
                  { icon: KaggleIcon, href: "#" },
                  { icon: Mail, href: "mailto:Murtazamajid.123@gmail.com" },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Home;
