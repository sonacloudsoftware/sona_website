import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página de Contato",
  description: "Esta é a Página de Contato",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Página de Contato"
        description="Entre em contato conosco para soluções personalizadas de automação e desenvolvimento de sistemas que impulsionam a eficiência do seu negócio."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
