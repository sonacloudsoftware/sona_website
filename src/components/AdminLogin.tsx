"use client";

import { useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Credenciais simples para demonstração
    if (email === "admin@sonacloud.com" && password === "sonacloud2024") {
      localStorage.setItem("admin_authenticated", "true");
      if (rememberMe) {
        localStorage.setItem("admin_remember", "true");
      }
      onLogin();
    } else {
      setError("Email ou senha incorretos. Verifique suas credenciais.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-lg">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            SonaCloud Admin
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Faça login para acessar o painel administrativo
          </p>
          <div className="mt-4">
            <a
              href="/"
              className="text-primary hover:text-primary/80 text-sm underline"
            >
              ← Voltar ao site
            </a>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:ring-primary focus:border-primary mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="admin@sonacloud.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:ring-primary focus:border-primary mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="sonacloud2024"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Lembrar-me
              </span>
            </label>
            <button
              type="button"
              className="text-primary hover:text-primary/80 text-sm"
              onClick={() =>
                alert("Entre em contato com o administrador do sistema")
              }
            >
              Esqueci minha senha
            </button>
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-700 dark:bg-red-900/20">
              <div className="flex">
                <svg
                  className="mr-2 h-5 w-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </span>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 focus:ring-primary flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Credenciais de demonstração:</p>
          <p>Email: admin@sonacloud.com</p>
          <p>Senha: sonacloud2024</p>
        </div>
      </div>
    </div>
  );
}
