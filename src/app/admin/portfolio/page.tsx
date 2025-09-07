"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import PortfolioAdmin from "../PortfolioAdmin";

export default function AdminPortfolioPage() {
  return (
    <>
      <Breadcrumb
        pageName="Administração do Portfolio"
        description="Gerencie os projetos do portfolio"
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <PortfolioAdmin />
        </div>
      </section>
    </>
  );
}
