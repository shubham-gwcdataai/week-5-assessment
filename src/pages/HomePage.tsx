import React from "react";
import HeroSection from "../components/sections/HeroSection";
import ProductsSection from "../components/sections/ProductsSection";
import AboutSection from "../components/sections/AboutSection";
import GrowingSection from "../components/sections/GrowingSection";
import ContactSection from "../components/sections/ContactSection";

const HomePage: React.FC = () => (
  <main>
    <HeroSection />
    <ProductsSection />
    <AboutSection />
    <GrowingSection />
    <ContactSection />
  </main>
);

export default HomePage;
