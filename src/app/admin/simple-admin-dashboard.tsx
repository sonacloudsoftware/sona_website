"use client";

import { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { LoginForm } from "@/components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, FolderOpen, LogOut, Plus } from "lucide-react";

export function AdminDashboard() {
  const { user, isLoading, login, logout, isAuthenticated } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              SonaCloud Admin
            </h1>
            <p className="mt-2 text-gray-600">
              Faça login para acessar o painel administrativo
            </p>
          </div>
          <LoginForm onLogin={login} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                SonaCloud Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Bem-vindo, {user?.name}
              </span>
              <Button
                variant="outline"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium ${
                activeTab === "dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium ${
                activeTab === "blog"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Blog</span>
            </button>
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium ${
                activeTab === "portfolio"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FolderOpen className="h-4 w-4" />
              <span>Portfolio</span>
            </button>
          </nav>
        </div>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Posts
                </CardTitle>
                <FileText className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-muted-foreground text-xs">
                  +2 desde o mês passado
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Projetos Portfolio
                </CardTitle>
                <FolderOpen className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-muted-foreground text-xs">+1 este mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Visualizações
                </CardTitle>
                <BarChart3 className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,429</div>
                <p className="text-muted-foreground text-xs">
                  +18% desde a semana passada
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Blog Content */}
        {activeTab === "blog" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Gerenciar Posts do Blog
              </h2>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Novo Post</span>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Posts Recentes</CardTitle>
                <CardDescription>
                  Lista dos posts mais recentes do blog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center text-gray-500">
                  <FileText className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                  <p>Nenhum post encontrado</p>
                  <p className="text-sm">Crie seu primeiro post do blog</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Portfolio Content */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Gerenciar Portfolio
              </h2>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Novo Projeto</span>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Projetos</CardTitle>
                <CardDescription>
                  Lista dos projetos do portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center text-gray-500">
                  <FolderOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                  <p>Nenhum projeto encontrado</p>
                  <p className="text-sm">Adicione seu primeiro projeto</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
