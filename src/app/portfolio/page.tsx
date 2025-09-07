"use client";
import Portfolio from "@/components/Portfolio";
import Breadcrumb from "@/components/Common/Breadcrumb";

const PortfolioPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Portfólio"
        description="Conheça alguns dos nossos projetos realizados e inspire-se para o seu!"
      />
      <Portfolio />
    </>
  );
};

export default PortfolioPage;
