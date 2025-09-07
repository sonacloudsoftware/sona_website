"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, FileText, FolderOpen, Plus, Edit, Trash2, Eye, LogOut } from "lucide-react"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { LoginForm } from "@/components/login-form"

// Mock data
const mockPortfolios = [
  {
    id: 1,
    title: "E-commerce Website",
    category: "Web Development",
    status: "Published",
    date: "2024-01-15",
    views: 245,
  },
  { id: 2, title: "Mobile App Design", category: "UI/UX Design", status: "Draft", date: "2024-01-10", views: 89 },
  { id: 3, title: "Brand Identity", category: "Branding", status: "Published", date: "2024-01-05", views: 156 },
]

const mockBlogPosts = [
  {
    id: 1,
    title: "Como criar um design system eficiente",
    category: "Design",
    status: "Published",
    date: "2024-01-20",
    views: 1250,
  },
  { id: 2, title: "Tendências de UX para 2024", category: "UX", status: "Draft", date: "2024-01-18", views: 0 },
  {
    id: 3,
    title: "Guia completo de React Hooks",
    category: "Development",
    status: "Published",
    date: "2024-01-15",
    views: 890,
  },
]

export function AdminDashboard() {
  const { user, isLoading, login, logout, isAuthenticated } = useAdminAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isPortfolioDialogOpen, setIsPortfolioDialogOpen] = useState(false)
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">Admin Panel</h1>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Olá, {user?.name}</span>
              <Badge variant="secondary">Admin</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "portfolios" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("portfolios")}
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              Portfólios
            </Button>
            <Button
              variant={activeTab === "blog" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("blog")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Blog Posts
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Visão geral do seu conteúdo</p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Portfólios</CardTitle>
                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">2 publicados</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">2 publicados</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,630</div>
                    <p className="text-xs text-muted-foreground">+12% este mês</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
                    <Edit className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">Aguardando publicação</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                  <CardDescription>Últimas atualizações no seu conteúdo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Blog post &quot;Como criar um design system eficiente&quot; foi publicado
                        </p>
                        <p className="text-xs text-muted-foreground">2 horas atrás</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Portfólio &quot;E-commerce Website&quot; foi atualizado</p>
                        <p className="text-xs text-muted-foreground">1 dia atrás</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Novo rascunho &quot;Tendências de UX para 2024&quot; foi criado</p>
                        <p className="text-xs text-muted-foreground">3 dias atrás</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "portfolios" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Portfólios</h2>
                  <p className="text-muted-foreground">Gerencie seus projetos de portfólio</p>
                </div>
                <Dialog open={isPortfolioDialogOpen} onOpenChange={setIsPortfolioDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Portfólio
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Criar Novo Portfólio</DialogTitle>
                      <DialogDescription>Adicione um novo projeto ao seu portfólio</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="portfolio-title">Título</Label>
                        <Input id="portfolio-title" placeholder="Nome do projeto" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="portfolio-category">Categoria</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="web">Web Development</SelectItem>
                            <SelectItem value="design">UI/UX Design</SelectItem>
                            <SelectItem value="branding">Branding</SelectItem>
                            <SelectItem value="mobile">Mobile App</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="portfolio-description">Descrição</Label>
                        <Textarea id="portfolio-description" placeholder="Descreva o projeto..." />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="portfolio-status">Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Rascunho</SelectItem>
                            <SelectItem value="published">Publicado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsPortfolioDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={() => setIsPortfolioDialogOpen(false)}>Criar Portfólio</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPortfolios.map((portfolio) => (
                        <TableRow key={portfolio.id}>
                          <TableCell className="font-medium">{portfolio.title}</TableCell>
                          <TableCell>{portfolio.category}</TableCell>
                          <TableCell>
                            <Badge variant={portfolio.status === "Published" ? "default" : "secondary"}>
                              {portfolio.status === "Published" ? "Publicado" : "Rascunho"}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(portfolio.date).toLocaleDateString("pt-BR")}</TableCell>
                          <TableCell>{portfolio.views}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
                  <p className="text-muted-foreground">Gerencie seus artigos de blog</p>
                </div>
                <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Criar Novo Post</DialogTitle>
                      <DialogDescription>Adicione um novo artigo ao seu blog</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="blog-title">Título</Label>
                        <Input id="blog-title" placeholder="Título do artigo" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="blog-category">Categoria</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="development">Development</SelectItem>
                            <SelectItem value="ux">UX</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="blog-excerpt">Resumo</Label>
                        <Textarea id="blog-excerpt" placeholder="Breve descrição do artigo..." />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="blog-content">Conteúdo</Label>
                        <Textarea
                          id="blog-content"
                          placeholder="Conteúdo completo do artigo..."
                          className="min-h-[120px]"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="blog-status">Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Rascunho</SelectItem>
                            <SelectItem value="published">Publicado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsBlogDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={() => setIsBlogDialogOpen(false)}>Criar Post</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockBlogPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>
                            <Badge variant={post.status === "Published" ? "default" : "secondary"}>
                              {post.status === "Published" ? "Publicado" : "Rascunho"}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(post.date).toLocaleDateString("pt-BR")}</TableCell>
                          <TableCell>{post.views}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
