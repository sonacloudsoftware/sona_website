"use client";

import { useState, useEffect } from "react";
import AdminLogin from "@/components/AdminLogin";
import BlogAdmin from "./BlogAdmin";
import PortfolioAdmin from "./PortfolioAdmin";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"blog" | "portfolio">("blog");

  useEffect(() => {
    // Verificar se está autenticado
    const auth = localStorage.getItem("admin_authenticated");
    setIsAuthenticated(auth === "true");
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    alert("Botão sair foi clicado!");
    localStorage.removeItem("admin_authenticated");
    localStorage.removeItem("admin_remember");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header Simples com Logout */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Painel Administrativo
        </h1>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Sair
        </button>
      </div>

      {/* Conteúdo Principal */}
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
  );
}
