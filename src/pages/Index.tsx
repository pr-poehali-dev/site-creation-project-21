import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {

  const articles = [
    {
      id: 1,
      title: "Основы минималистичного дизайна",
      excerpt: "Изучаем принципы создания чистого и функционального дизайна в современном мире.",
      category: "Дизайн",
      readTime: "5 мин",
      date: "26 июля 2025",
      image: "/img/26f13003-3dee-4c3c-ad5b-cbcba5ca8525.jpg"
    },
    {
      id: 2, 
      title: "Современные технологии разработки",
      excerpt: "Обзор актуальных инструментов и методологий для эффективной работы разработчика.",
      category: "Технологии",
      readTime: "8 мин",
      date: "25 июля 2025",
      image: "/img/56014955-bfe2-4c77-a576-d2ab420f5e5d.jpg"
    },
    {
      id: 3,
      title: "Психология пользовательского опыта",
      excerpt: "Как понимание поведения пользователей помогает создавать лучшие продукты.",
      category: "UX",
      readTime: "6 мин", 
      date: "24 июля 2025",
      image: "/img/26f13003-3dee-4c3c-ad5b-cbcba5ca8525.jpg"
    }
  ];

  const categories = ["Все статьи", "Дизайн", "Технологии", "UX", "Разработка"];

  return (
    <div className="min-h-screen bg-background">
      {/* Навигация */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-primary">MiniBlog</h1>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Главная</a>
                <a href="#articles" className="text-muted-foreground hover:text-primary transition-colors">Статьи</a>
                <a href="#categories" className="text-muted-foreground hover:text-primary transition-colors">Категории</a>
                <a href="#author" className="text-muted-foreground hover:text-primary transition-colors">О авторе</a>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Icon name="Search" size={16} className="mr-2" />
              Поиск
            </Button>
          </div>
        </div>
      </nav>

      {/* Герой секция */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-primary mb-6 leading-tight">
              Делимся знаниями и идеями
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Исследуем современные технологии, дизайн и пользовательский опыт. 
              Создаем контент, который вдохновляет и помогает расти.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Icon name="BookOpen" size={20} className="mr-2" />
                Читать статьи
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Icon name="User" size={20} className="mr-2" />
                О проекте
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Категории */}
        <section id="categories" className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Категории</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={category === "Все статьи" ? "default" : "secondary"}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </section>

        {/* Статьи */}
        <section id="articles" className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Последние статьи</h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-sm">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span>{article.date}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {article.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {article.readTime}
                    </span>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      Читать далее
                      <Icon name="ArrowRight" size={14} className="ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>



        {/* О авторе */}
        <section id="author">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader className="pb-4">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="/img/d837a729-e3b1-4039-b4e7-316a095d1382.jpg" 
                  alt="Автор"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-2xl">Александр Иванов</CardTitle>
              <CardDescription className="text-base">
                UX/UI дизайнер и фронтенд-разработчик
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Более 8 лет создаю цифровые продукты, которые решают реальные задачи пользователей. 
                Делюсь опытом в области дизайна, разработки и пользовательского опыта.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="sm">
                  <Icon name="Mail" size={16} className="mr-2" />
                  Написать
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Github" size={16} className="mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Linkedin" size={16} className="mr-2" />
                  LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Футер */}
      <footer className="border-t bg-muted/30 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <h4 className="text-xl font-semibold mb-3">MiniBlog</h4>
            <p className="text-muted-foreground mb-6">
              Создаем качественный контент о технологиях и дизайне
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Конфиденциальность</a>
              <a href="#" className="hover:text-primary transition-colors">Условия</a>
              <a href="#" className="hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;