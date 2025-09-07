"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/lib/db/schema";

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image: "",
    authorName: "Gerson Cavalcante",
    authorImage: "/images/blog/gersoncavalcante.png",
    authorDesignation: "Desenvolvedor Full Stack",
    tags: "",
    publishDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      tags: JSON.stringify(formData.tags.split(",").map((tag) => tag.trim())),
    };

    try {
      const url = editingPost ? `/api/blog/${editingPost.id}` : "/api/blog";
      const method = editingPost ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        await fetchPosts();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(true);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      image: post.image,
      authorName: post.authorName,
      authorImage: post.authorImage,
      authorDesignation: post.authorDesignation,
      tags: JSON.parse(post.tags).join(", "),
      publishDate: post.publishDate,
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este post?")) {
      try {
        const response = await fetch(`/api/blog/${id}`, { method: "DELETE" });
        if (response.ok) {
          await fetchPosts();
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image: "",
      authorName: "Gerson Cavalcante",
      authorImage: "/images/blog/gersoncavalcante.png",
      authorDesignation: "Desenvolvedor Full Stack",
      tags: "",
      publishDate: new Date().toISOString().split("T")[0],
    });
    setEditingPost(null);
    setIsCreating(false);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Carregando...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gerenciar Blog</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-white"
        >
          Novo Post
        </button>
      </div>

      {isCreating && (
        <div className="mb-8 rounded-lg border p-6">
          <h3 className="mb-4 text-xl font-semibold">
            {editingPost ? "Editar Post" : "Criar Novo Post"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 w-full rounded-md border p-2 dark:border-gray-600 dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Resumo</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                className="mt-1 w-full rounded-md border p-2 dark:border-gray-600 dark:bg-gray-700"
                rows={2}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Conteúdo</label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="mt-1 w-full rounded-md border p-2 dark:border-gray-600 dark:bg-gray-700"
                rows={8}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">URL da Imagem</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="mt-1 w-full rounded-md border p-2 dark:border-gray-600 dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="mt-1 w-full rounded-md border p-2 dark:border-gray-600 dark:bg-gray-700"
                placeholder="React, Next.js, TypeScript"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Data de Publicação
              </label>
              <input
                type="date"
                value={formData.publishDate}
                onChange={(e) =>
                  setFormData({ ...formData, publishDate: e.target.value })
                }
                className="mt-1 w-full rounded-md border p-2 dark:border-gray-600 dark:bg-gray-700"
                required
              />
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-white"
              >
                {editingPost ? "Atualizar" : "Criar"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border px-4 py-2 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-lg border p-4 dark:border-gray-600"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>
                <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                  <span>{post.publishDate}</span>
                  <span>{JSON.parse(post.tags).join(", ")}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:text-red-800"
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
