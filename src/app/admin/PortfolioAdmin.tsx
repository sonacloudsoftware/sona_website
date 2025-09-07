"use client";

import { useState, useEffect } from "react";
import { PortfolioItem } from "@/lib/db/schema";

export default function PortfolioAdmin() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    projectUrl: "",
    githubUrl: "",
    featured: false,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSend = {
      ...formData,
      technologies: JSON.stringify(formData.technologies.split(',').map(tech => tech.trim())),
      projectUrl: formData.projectUrl || null,
      githubUrl: formData.githubUrl || null,
    };

    try {
      const url = editingItem ? `/api/portfolio/${editingItem.id}` : "/api/portfolio";
      const method = editingItem ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        await fetchItems();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving portfolio item:", error);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setIsCreating(true);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      technologies: JSON.parse(item.technologies).join(', '),
      projectUrl: item.projectUrl || "",
      githubUrl: item.githubUrl || "",
      featured: item.featured,
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este item do portfólio?")) {
      try {
        const response = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
        if (response.ok) {
          await fetchItems();
        }
      } catch (error) {
        console.error("Error deleting portfolio item:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      technologies: "",
      projectUrl: "",
      githubUrl: "",
      featured: false,
    });
    setEditingItem(null);
    setIsCreating(false);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Carregando...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Items do Portfolio</h2>
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-sm text-gray-600 dark:text-gray-300">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Novo Item</span>
        </button>
      </div>

      {isCreating && (
        <div className="mb-8 rounded-lg border border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800">
          <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            {editingItem ? "Editar Item" : "Criar Novo Item"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL da Imagem</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tecnologias (separadas por vírgula)</label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                placeholder="Next.js, TypeScript, PostgreSQL"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL do Projeto (opcional)</label>
              <input
                type="url"
                value={formData.projectUrl}
                onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL do GitHub (opcional)</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Item em destaque
              </label>
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 transition-colors"
              >
                {editingItem ? "Atualizar" : "Criar"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  {item.featured && (
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Destaque
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {item.description}
                </p>
                <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>{JSON.parse(item.technologies).join(", ")}</span>
                  {item.projectUrl && (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Ver Projeto
                    </a>
                  )}
                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
