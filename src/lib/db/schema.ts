import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Tabela de Posts do Blog
export const blogPosts = sqliteTable('blog_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt').notNull(),
  image: text('image').notNull(),
  authorName: text('author_name').notNull(),
  authorImage: text('author_image').notNull(),
  authorDesignation: text('author_designation').notNull(),
  tags: text('tags').notNull(), // JSON string
  publishDate: text('publish_date').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Tabela de Portfolio
export const portfolioItems = sqliteTable('portfolio_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  technologies: text('technologies').notNull(), // JSON string
  projectUrl: text('project_url'),
  githubUrl: text('github_url'),
  featured: integer('featured', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Tipos TypeScript
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type NewPortfolioItem = typeof portfolioItems.$inferInsert;
