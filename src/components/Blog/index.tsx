"use client";

import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const Blog = () => {
  const { posts, loading, error } = useBlogPosts();

  if (loading) {
    return (
      <section
        id="blog"
        className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
      >
        <div className="container">
          <div className="flex justify-center">
            <p className="text-center">Carregando posts...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="blog"
        className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
      >
        <div className="container">
          <div className="flex justify-center">
            <p className="text-center text-red-600">
              Erro ao carregar posts: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Insights para o seu Negócio Digital"
          paragraph="No nosso blog, a inovação encontra a sustentabilidade. Descubra como soluções tecnológicas inteligentes podem impulsionar negócios que protegem o planeta. Explore artigos que conectam o poder da programação com a urgência da conservação ambiental, oferecendo insights para um futuro mais verde."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="w-full">
              <SingleBlog
                blog={{
                  id: post.id,
                  title: post.title,
                  paragraph: post.excerpt,
                  image: post.image,
                  author: {
                    name: post.authorName,
                    image: post.authorImage,
                    designation: post.authorDesignation,
                  },
                  tags: JSON.parse(post.tags),
                  publishDate: post.publishDate,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
