import Home from "./Home";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AboutContent } from "./About";
import { PortfolioContent } from "./Portfolio";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Home />
    {/* On mobile, show About + Portfolio inline so users can scroll through everything. Hidden on desktop. */}
    <div className="md:hidden">
      <AboutContent />
      <PortfolioContent />
    </div>
    <Footer />
  </div>
);

export default Index;
