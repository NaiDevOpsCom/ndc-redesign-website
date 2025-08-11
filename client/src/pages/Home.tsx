import Navbar from "@/components/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import WhatWeDo from "@/components/landing/WhatWeDo";
import Partners from "@/components/landing/Partners";
import Events from "@/components/landing/Events";
import Testimonials from "@/components/landing/Testimonials";
import Gallery from "@/components/landing/Gallery";
import FAQSection from "@/components/landing/FAQSection";
import JoinCommunity from "@/components/landing/JoinCommunity";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhatWeDo />
      <Partners />
      <Events />
      <Testimonials />
      <Gallery />

      <FAQSection />
      <JoinCommunity />
      <Footer />
    </div>
  );
}
