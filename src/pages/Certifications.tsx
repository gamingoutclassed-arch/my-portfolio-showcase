import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  credentialUrl?: string;
};

const CERTIFICATIONS: Certification[] = [
  {
    title: "Introduction to Big Data with Spark and Hadoop",
    issuer: "IBM · Coursera",
    date: "Apr 2025",
    skills: ["Apache Spark", "Hadoop", "Big Data", "PySpark"],
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/WA08TEM6YHIF",
  },
  {
    title: "Data Science Job Simulation",
    issuer: "British Airways · Forage",
    date: "May 2025",
    skills: ["Predictive Modeling", "Customer Analytics", "Python"],
    credentialUrl:
      "https://www.theforage.com/completion-certificates/tMjbs76F526fF5v3G/NjynCWzGSaWXQCxSX_tMjbs76F526fF5v3G_4feQu97uKyc4zwS7C_1748726156944_completion_certificate.pdf",
  },
  {
    title: "Intermediate Python",
    issuer: "DataCamp",
    date: "Apr 2025",
    skills: ["Python", "NumPy", "Pandas", "Control Flow"],
    credentialUrl:
      "https://www.datacamp.com/statement-of-accomplishment/course/4b48f1b8080aeebd05c22efc37a7f2514f361bed?raw=1",
  },
  {
    title: "Letter of Appreciation — Computer Vision & AI Intern",
    issuer: "Scoutrex",
    date: "Feb 2026",
    skills: ["PyTorch", "OpenCV", "MediaPipe", "Roboflow", "Pose Estimation"],
    credentialUrl: "/certificates/scoutrex-appreciation-letter.pdf",
  },
];



const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Certifications = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-12">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 className="section-heading" {...fadeUp}>
            Certifications
          </motion.h1>
          <div className="section-divider" />
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            {...fadeUp}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Continuous learning across AI, data science, and software engineering.
          </motion.p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={`${cert.title}-${idx}`}
                {...fadeUp}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
              >
                <Card className="p-6 h-full flex flex-col gap-4 border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary shrink-0">
                      <Award size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-foreground text-lg leading-snug underline decoration-primary/60 underline-offset-4">
                        {cert.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mt-1">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                        <Calendar size={12} />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </div>

                  {cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {cert.credentialUrl && cert.credentialUrl !== "#" && (
                    <div className="mt-auto pt-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Credential
                          <ExternalLink size={14} className="ml-2" />
                        </a>
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Certifications;
