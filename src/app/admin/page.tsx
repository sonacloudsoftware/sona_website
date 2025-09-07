"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BlogAdmin from "./BlogAdmin";
import PortfolioAdmin from "./PortfolioAdmin";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"blog" | "portfolio">("blog");

  return (
    <>
      <Breadcrumb
        pageName="Administração"
        description="Gerencie o conteúdo do blog e portfólio"
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            {/* Tabs */}
            <div className="mb-8 flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
              <button
                onClick={() => setActiveTab("blog")}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "blog"
                    ? "bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                Blog
              </button>
              <button
                onClick={() => setActiveTab("portfolio")}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "portfolio"
                    ? "bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                Portfólio
              </button>
            </div>

            {/* Content */}
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
              {activeTab === "blog" && <BlogAdmin />}
              {activeTab === "portfolio" && <PortfolioAdmin />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
