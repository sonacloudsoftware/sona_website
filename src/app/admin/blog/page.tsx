"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import BlogAdmin from "../BlogAdmin";

export default function AdminBlogPage() {
  return (
    <>
      <Breadcrumb
        pageName="Administração do Blog"
        description="Gerencie os posts do blog"
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <BlogAdmin />
        </div>
      </section>
    </>
  );
}
