import { Metadata } from "next";
import BlogPage from "@/components/Blog";
import Breadcrumb from "@/components/Common/Breadcrumb";

export const metadata: Metadata = {
  title: "Blog | SonaCloud - Insights e Conhecimento",
  description:
    "Acompanhe nossas postagens sobre tecnologia, inovação e soluções empresariais.",
};

export default function Blog() {
  return (
    <>
      <Breadcrumb
        pageName="Blog"
        description="Insights e conhecimento sobre tecnologia e inovação"
      />
      <BlogPage />
    </>
  );
}
