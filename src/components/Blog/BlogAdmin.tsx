"use client";
import { useState } from "react";
import { useBlogData } from "@/hooks/useBlogData";

const BlogAdmin = () => {
  const { blogPosts, addPost, deletePost } = useBlogData();
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    paragraph: "",
    image: "",
    authorName: "Gerson Cavalcante",
    authorImage: "/images/blog/gersoncavalcante.png",
    authorDesignation: "CEO SonaCloud",
    tags: "",
    publishDate: new Date().getFullYear().toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      title: formData.title,
      paragraph: formData.paragraph,
      image: formData.image,
      author: {
        name: formData.authorName,
        image: formData.authorImage,
        designation: formData.authorDesignation,
      },
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      publishDate: formData.publishDate,
    };

    addPost(newPost);
    setFormData({
      title: "",
      paragraph: "",
      image: "",
      authorName: "Gerson Cavalcante",
      authorImage: "/images/blog/gersoncavalcante.png",
      authorDesignation: "CEO SonaCloud",
      tags: "",
      publishDate: new Date().getFullYear().toString(),
    });
    setIsAddingPost(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Botão fixo abaixo do header */}
      <div className="fixed top-20 right-0 left-0 z-30 border-b border-gray-200 bg-white py-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setIsAddingPost(!isAddingPost)}
            className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-2 text-white shadow-lg transition duration-300"
          >
            {isAddingPost ? "Cancelar" : "Adicionar Nova Postagem"}
          </button>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 pt-32 pb-8 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Administração do Blog
            </h1>
          </div>

          {isAddingPost && (
            <div className="mb-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Nova Postagem
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Título
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Descrição
                  </label>
                  <textarea
                    name="paragraph"
                    value={formData.paragraph}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    URL da Imagem
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    placeholder="/images/blog/sua-imagem.jpg"
                    className="focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nome do Autor
                    </label>
                    <input
                      type="text"
                      name="authorName"
                      value={formData.authorName}
                      onChange={handleChange}
                      required
                      className="focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Cargo do Autor
                    </label>
                    <input
                      type="text"
                      name="authorDesignation"
                      value={formData.authorDesignation}
                      onChange={handleChange}
                      required
                      className="focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Data de Publicação
                    </label>
                    <input
                      type="text"
                      name="publishDate"
                      value={formData.publishDate}
                      onChange={handleChange}
                      required
                      className="focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tags (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Automação, Produtividade, Tecnologia"
                    className="focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-2 text-white transition duration-300"
                >
                  Publicar Postagem
                </button>
              </form>
            </div>
          )}

          <div className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Postagens Existentes ({blogPosts.length})
              </h2>
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-start justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex-1">
                      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                        {post.title}
                      </h3>
                      <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                        {post.paragraph.substring(0, 100)}...
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>Por: {post.author.name}</span>
                        <span>Data: {post.publishDate}</span>
                        <span>Tags: {post.tags.join(", ")}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogAdmin;
