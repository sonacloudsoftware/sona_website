import SectionTitle from "../Common/SectionTitle";

const Portfolio = () => {
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
          {/* Exemplos de projetos - substitua pelos reais */}
          <div className="group shadow-one hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark relative overflow-hidden rounded-xs bg-white duration-300">
            <div className="relative block aspect-[37/22] w-full">
              <img
                src="/images/portfolio/arquitetura_pra_voce.png"
                alt="Arquitetura pra Você"
                className="h-full w-full rounded-xs object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
              <h3 className="hover:text-primary dark:hover:text-primary mb-4 block text-xl font-bold text-black sm:text-2xl dark:text-white">
                Arquitetura pra Você
              </h3>
              <p className="border-body-color/10 text-body-color mb-6 border-b pb-6 text-base font-medium dark:border-white/10">
                Atuamos em Projetos e Construções desde 2017, dedicados a desenvolver arquitetura que atenda às necessidades específicas de cada cliente, refletindo seus gostos, estilo de vida princípios e valores.
              </p>
              <div className="flex items-center">
                <div className="inline-block">
                  <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">
                    Tecnologias
                  </h4>
                  <p className="text-body-color text-xs">
                    Wordpress, Elementor, WooCommerce
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="group shadow-one hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark relative overflow-hidden rounded-xs bg-white duration-300">
            <div className="relative block aspect-[37/22] w-full">
              <img
                src="/images/portfolio/impsf.png"
                alt="Impsf"
                className="h-full w-full rounded-xs object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
              <h3 className="hover:text-primary dark:hover:text-primary mb-4 block text-xl font-bold text-black sm:text-2xl dark:text-white">
                IPMSF
              </h3>
              <p className="border-body-color/10 text-body-color mb-6 border-b pb-6 text-base font-medium dark:border-white/10">
                O IPMSF é administrado por um Conselho Administrativo formado por 8 (oito) conselheiros titulares dentre os servidores públicos, e por uma Diretoria Executiva, composta pela Presidência e Assessoria Especial Administrativa.
              </p>
              <div className="flex items-center">
                <div className="inline-block">
                  <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">
                    Tecnologias
                  </h4>
                  <p className="text-body-color text-xs">
                    Wordpress, Elementor
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="group shadow-one hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark relative overflow-hidden rounded-xs bg-white duration-300">
            <div className="relative block aspect-[37/22] w-full">
              <img
                src="/images/portfolio/paulistana_prev.png"
                alt="Projeto 3"
                className="h-full w-full rounded-xs object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
              <h3 className="hover:text-primary dark:hover:text-primary mb-4 block text-xl font-bold text-black sm:text-2xl dark:text-white">
               Paulistana PREV
              </h3>
              <p className="border-body-color/10 text-body-color mb-6 border-b pb-6 text-base font-medium dark:border-white/10">
                O Paulistana Prev é administrado por um Conselho Deliberativo formado por 5 (cinco) conselheiros dentre os servidores públicos, e por uma Diretoria Executiva, composta pela Gerência e Assistente Administrativa/Financeira.
              </p>
              <div className="flex items-center">
                <div className="inline-block">
                  <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">
                    Tecnologias
                  </h4>
                  <p className="text-body-color text-xs">Wordpress, Elementor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
