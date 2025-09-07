"use client";

import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { usePortfolio } from "@/hooks/usePortfolio";

const Portfolio = () => {
  const { items, loading, error } = usePortfolio();

  if (loading) {
    return (
      <section
        id="portfolio"
        className="dark:bg-gray-dark bg-white py-16 md:py-20 lg:py-28"
      >
        <div className="container">
          <div className="flex justify-center">
            <p className="text-center">Carregando portfólio...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="portfolio"
        className="dark:bg-gray-dark bg-white py-16 md:py-20 lg:py-28"
      >
        <div className="container">
          <div className="flex justify-center">
            <p className="text-center text-red-600">
              Erro ao carregar portfólio: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="portfolio"
      className="dark:bg-gray-dark bg-white py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Portfólio"
          paragraph="Confira alguns dos nossos projetos realizados e inspire-se para o seu!"
          center
          width="665px"
        />
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group shadow-one hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark relative overflow-hidden rounded-xs bg-white duration-300"
            >
              <div className="relative block aspect-[37/22] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="rounded-xs object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {item.featured && (
                  <div className="bg-primary absolute top-4 right-4 rounded-full px-3 py-1 text-xs text-white">
                    Destaque
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
                <h3 className="hover:text-primary dark:hover:text-primary mb-4 block text-xl font-bold text-black sm:text-2xl dark:text-white">
                  {item.title}
                </h3>
                <p className="border-body-color/10 text-body-color mb-6 border-b pb-6 text-base font-medium dark:border-white/10">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="inline-block">
                    <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">
                      Tecnologias
                    </h4>
                    <p className="text-body-color text-xs">
                      {JSON.parse(item.technologies).join(", ")}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {item.projectUrl && (
                      <a
                        href={item.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary text-xs text-blue-600"
                      >
                        Ver Projeto
                      </a>
                    )}
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary text-xs text-blue-600"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
