import { useState, useEffect } from 'react';
import { Blog } from '@/types/blog';

// Dados iniciais do blog (mantemos os existentes)
const initialBlogData: Blog[] = [
  {
    id: 1,
    title: "Automação Inteligente: O Segredo para Reduzir Custos e Aumentar a Produtividade",
    paragraph:
      "Em um mercado cada vez mais competitivo, a eficiência não é um luxo, mas uma necessidade. Processos manuais e repetitivos consomem tempo valioso e geram custos desnecessários, impedindo sua equipe de focar em atividades estratégicas.",
    image: "/images/blog/panel-dashboard.png",
    author: {
      name: "Gerson Cavalcante",
      image: "/images/blog/gersoncavalcante.png",
      designation: "CEO SonaCloud",
    },
    tags: ["Automação"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "Transformando Vendas: Como a Automação Otimiza seu Funil de Clientes",
    paragraph:
      "A jornada do cliente é um processo complexo, mas não precisa ser manual. O que aconteceria se você pudesse nutrir leads, agendar reuniões e acompanhar cada etapa do seu funil de vendas sem mover um dedo? A automação torna isso possível, liberando sua equipe comercial para fazer o que faz de melhor: vender.",
    image: "/images/blog/funil.png",
    author: {
      name: "Gerson Cavalcante",
      image: "/images/blog/gersoncavalcante.png",
      designation: "CEO SonaCloud",
    },
    tags: ["Produtividade"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "Adeus, Planilhas: Automação de Dados para uma Tomada de Decisão Mais Rápida e Assertiva.",
    paragraph:
      "Ainda perdendo horas com digitação manual e planilhas complexas? A gestão de dados ineficiente é um dos maiores gargalos para o crescimento de qualquer empresa. A automação chega para mudar esse cenário, transformando a coleta e análise de dados em um processo rápido, seguro e inteligente.",
    image: "/images/blog/process.png",
    author: {
      name: "Gerson Cavalcante",
      image: "/images/blog/gersoncavalcante.png",
      designation: "CEO SonaCloud",
    },
    tags: ["Modernização"],
    publishDate: "2025",
  },
];

// Hook personalizado para gerenciar posts do blog
export const useBlogData = () => {
  const [blogPosts, setBlogPosts] = useState<Blog[]>(initialBlogData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Carrega posts do localStorage ou usa dados iniciais apenas no cliente
    if (typeof window !== 'undefined') {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        setBlogPosts(JSON.parse(savedPosts));
      } else {
        setBlogPosts(initialBlogData);
        localStorage.setItem('blogPosts', JSON.stringify(initialBlogData));
      }
    }
  }, []);

  const addPost = (post: Omit<Blog, 'id'>) => {
    if (!isClient || typeof window === 'undefined') return;
    const newPost: Blog = {
      ...post,
      id: Date.now(), // Usa timestamp como ID único
    };
    const updatedPosts = [newPost, ...blogPosts];
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  const updatePost = (id: number, updatedPost: Omit<Blog, 'id'>) => {
    if (!isClient || typeof window === 'undefined') return;
    const updatedPosts = blogPosts.map(post => 
      post.id === id ? { ...updatedPost, id } : post
    );
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  const deletePost = (id: number) => {
    if (!isClient || typeof window === 'undefined') return;
    const updatedPosts = blogPosts.filter(post => post.id !== id);
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  return {
    blogPosts,
    addPost,
    updatePost,
    deletePost,
  };
};

// Exporta os dados iniciais como named export
export { initialBlogData };
