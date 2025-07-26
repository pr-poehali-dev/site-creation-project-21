import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: 'draft' | 'published';
  date: string;
  readTime: string;
}

const Admin = () => {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "Основы минималистичного дизайна",
      excerpt: "Изучаем принципы создания чистого и функционального дизайна в современном мире.",
      content: "Полный текст статьи о минималистичном дизайне...",
      category: "Дизайн",
      status: "published",
      date: "26 июля 2025",
      readTime: "5 мин"
    },
    {
      id: 2,
      title: "Современные технологии разработки",
      excerpt: "Обзор актуальных инструментов и методологий для эффективной работы разработчика.",
      content: "Полный текст статьи о технологиях...",
      category: "Технологии",
      status: "published",
      date: "25 июля 2025",
      readTime: "8 мин"
    }
  ]);

  const [newArticle, setNewArticle] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'draft' as 'draft' | 'published'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleCreateArticle = () => {
    if (!newArticle.title || !newArticle.content) return;

    const article: Article = {
      id: articles.length + 1,
      ...newArticle,
      date: new Date().toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      readTime: Math.ceil(newArticle.content.length / 1000) + ' мин'
    };

    setArticles([article, ...articles]);
    setNewArticle({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      status: 'draft'
    });
  };

  const handleEditArticle = (article: Article) => {
    setNewArticle({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      status: article.status
    });
    setIsEditing(true);
    setEditingId(article.id);
  };

  const handleUpdateArticle = () => {
    if (!editingId) return;

    setArticles(articles.map(article => 
      article.id === editingId 
        ? { ...article, ...newArticle }
        : article
    ));
    
    setIsEditing(false);
    setEditingId(null);
    setNewArticle({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      status: 'draft'
    });
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const categories = ["Дизайн", "Технологии", "UX", "Разработка"];

  return (
    <div className="min-h-screen bg-background">
      {/* Навигация админки */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-primary">Админ панель</h1>
              <div className="flex space-x-4">
                <Badge variant="secondary" className="px-3 py-1">
                  <Icon name="User" size={14} className="mr-1" />
                  Александр Иванов
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Icon name="Eye" size={16} className="mr-2" />
                Посмотреть сайт
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="editor">
              <Icon name="PenTool" size={16} className="mr-2" />
              Редактор статей
            </TabsTrigger>
            <TabsTrigger value="articles">
              <Icon name="FileText" size={16} className="mr-2" />
              Все статьи ({articles.length})
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Аналитика
            </TabsTrigger>
          </TabsList>

          {/* Редактор статей */}
          <TabsContent value="editor" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Edit3" size={20} className="mr-2" />
                  {isEditing ? 'Редактировать статью' : 'Создать новую статью'}
                </CardTitle>
                <CardDescription>
                  {isEditing ? 'Внесите изменения в существующую статью' : 'Заполните все поля для создания новой статьи'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Заголовок статьи</Label>
                    <Input
                      id="title"
                      placeholder="Введите заголовок..."
                      value={newArticle.title}
                      onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Категория</Label>
                    <Select value={newArticle.category} onValueChange={(value) => setNewArticle({...newArticle, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Краткое описание</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Опишите статью в нескольких предложениях..."
                    value={newArticle.excerpt}
                    onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Содержание статьи</Label>
                  <Textarea
                    id="content"
                    placeholder="Напишите полный текст статьи..."
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                    className="min-h-[300px]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Label>Статус публикации</Label>
                    <Select value={newArticle.status} onValueChange={(value: 'draft' | 'published') => setNewArticle({...newArticle, status: value})}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Черновик</SelectItem>
                        <SelectItem value="published">Опубликовано</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-x-3">
                    {isEditing && (
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          setEditingId(null);
                          setNewArticle({title: '', excerpt: '', content: '', category: '', status: 'draft'});
                        }}
                      >
                        Отменить
                      </Button>
                    )}
                    <Button 
                      onClick={isEditing ? handleUpdateArticle : handleCreateArticle}
                      disabled={!newArticle.title || !newArticle.content}
                    >
                      <Icon name={isEditing ? "Save" : "Plus"} size={16} className="mr-2" />
                      {isEditing ? 'Сохранить изменения' : 'Создать статью'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Список всех статей */}
          <TabsContent value="articles" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Icon name="FileText" size={20} className="mr-2" />
                    Управление статьями
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      {articles.filter(a => a.status === 'published').length} опубликовано
                    </Badge>
                    <Badge variant="outline">
                      {articles.filter(a => a.status === 'draft').length} черновиков
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {articles.map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{article.title}</h3>
                          <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                            {article.status === 'published' ? 'Опубликовано' : 'Черновик'}
                          </Badge>
                          <Badge variant="outline">{article.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{article.excerpt}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{article.date}</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditArticle(article)}>
                          <Icon name="Edit" size={14} className="mr-1" />
                          Редактировать
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={14} className="mr-1" />
                          Просмотр
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteArticle(article.id)}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Аналитика */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Всего статей</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{articles.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 за последнюю неделю
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Опубликовано</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{articles.filter(a => a.status === 'published').length}</div>
                  <p className="text-xs text-muted-foreground">
                    Активные статьи
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Черновики</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{articles.filter(a => a.status === 'draft').length}</div>
                  <p className="text-xs text-muted-foreground">
                    В работе
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Категории</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{categories.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Активных тем
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Популярные категории</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => {
                    const count = articles.filter(a => a.category === category).length;
                    const percentage = articles.length > 0 ? (count / articles.length) * 100 : 0;
                    
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;