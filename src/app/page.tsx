import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SonaCloud - Software Development",
  description: "SonaCloud - Desenvolvimento de Software Personalizado e Soluções Web",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <Portfolio />
      <AboutSectionOne />
      <AboutSectionTwo />
      {/* <Testimonials /> - Reservados para futuras implementações */}
      <Pricing />
      <Blog />
      <Contact />
    </>
  );
}
