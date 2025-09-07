import { db } from '../lib/db';
import { blogPosts, portfolioItems } from '../lib/db/schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // Inserir posts do blog
  await db.insert(blogPosts).values([
    {
      title: 'Melhores Práticas de Desenvolvimento Web em 2024',
      content: 'O desenvolvimento web está em constante evolução, e 2024 trouxe novas tendências e práticas que todo desenvolvedor deve conhecer...',
      excerpt: 'Descubra as principais tendências e práticas de desenvolvimento web para este ano.',
      image: '/images/blog/blog-01.jpg',
      authorName: 'Gerson Cavalcante',
      authorImage: '/images/blog/gersoncavalcante.png',
      authorDesignation: 'Desenvolvedor Full Stack',
      tags: JSON.stringify(['Next.js', 'React', 'TypeScript']),
      publishDate: '2024-01-15',
    },
    {
      title: 'Como Implementar um Sistema de Blog Dinâmico',
      content: 'Neste tutorial, vamos aprender como criar um sistema de blog totalmente dinâmico usando Next.js, TypeScript e Drizzle ORM...',
      excerpt: 'Tutorial completo para criar um sistema de blog dinâmico moderno.',
      image: '/images/blog/blog-02.jpg',
      authorName: 'Gerson Cavalcante',
      authorImage: '/images/blog/gersoncavalcante.png',
      authorDesignation: 'Desenvolvedor Full Stack',
      tags: JSON.stringify(['Blog', 'CMS', 'Database']),
      publishDate: '2024-01-10',
    },
    {
      title: 'Otimização de Performance em Aplicações React',
      content: 'A performance é crucial para o sucesso de qualquer aplicação web. Vamos explorar técnicas avançadas de otimização...',
      excerpt: 'Técnicas avançadas para otimizar a performance de suas aplicações React.',
      image: '/images/blog/blog-03.jpg',
      authorName: 'Gerson Cavalcante',
      authorImage: '/images/blog/gersoncavalcante.png',
      authorDesignation: 'Desenvolvedor Full Stack',
      tags: JSON.stringify(['React', 'Performance', 'Optimization']),
      publishDate: '2024-01-05',
    },
  ]);

  // Inserir itens do portfolio
  await db.insert(portfolioItems).values([
    {
      title: 'Arquitetura Pra Você',
      description: 'Sistema completo de gestão para escritório de arquitetura, incluindo controle de projetos, clientes e financeiro.',
      image: '/images/portfolio/arquitetura_pra_voce.png',
      technologies: JSON.stringify(['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma']),
      projectUrl: 'https://arquitetupravoce.com.br',
      featured: true,
    },
    {
      title: 'IMPSF - Instituto Municipal de Previdência',
      description: 'Portal institucional moderno para o Instituto Municipal de Previdência de São Francisco do Sul.',
      image: '/images/portfolio/impsf.png',
      technologies: JSON.stringify(['React', 'Node.js', 'MySQL']),
      projectUrl: 'https://impsf.com.br',
      featured: true,
    },
    {
      title: 'Paulistana Prev',
      description: 'Sistema de gestão previdenciária com interface intuitiva e funcionalidades avançadas.',
      image: '/images/portfolio/paulistana_prev.png',
      technologies: JSON.stringify(['Vue.js', 'PHP', 'Laravel', 'PostgreSQL']),
      projectUrl: 'https://paulistanaprev.com.br',
      featured: false,
    },
  ]);

  console.log('✅ Database seeded successfully!');
}

seed().catch((error) => {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
});
