import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | SonaCloud - Soluções em Tecnologia",
  description: "Esta é a página Sobre para o SonaCloud - Soluções em Tecnologia",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Sobre Nós"
        description="Conheça mais sobre a SonaCloud, nossa missão, visão e valores."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
