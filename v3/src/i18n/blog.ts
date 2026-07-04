import { DEFAULT_LOCALE, type Lang } from '@/i18n';

export interface BlogCopy {
  title: string;
  subtitle: string;
  page: string;
  newerPosts: string;
  olderPosts: string;
  updated: string;
  minRead: string;
  backToBlog: string;
  relatedPosts: string;
  viewAllPosts: string;
  category: string;
  tag: string;
  share: string;
  newPost: string;
}

const copy: Record<Lang, BlogCopy> = {
  en: {
    title: 'The Blog',
    subtitle: 'News, tutorials, resources, and product updates from RustDesk.',
    page: 'Page', newerPosts: 'Newer posts', olderPosts: 'Older posts', updated: 'Updated', minRead: 'min read',
    backToBlog: 'Back to Blog', relatedPosts: 'Related Posts', viewAllPosts: 'View All Posts', category: 'Category',
    tag: 'Tag', share: 'Share', newPost: 'New',
  },
  de: {
    title: 'Der Blog', subtitle: 'Neuigkeiten, Anleitungen, Ressourcen und Produktupdates von RustDesk.', page: 'Seite',
    newerPosts: 'Neuere Beiträge', olderPosts: 'Ältere Beiträge', updated: 'Aktualisiert', minRead: 'Min. Lesezeit',
    backToBlog: 'Zurück zum Blog', relatedPosts: 'Ähnliche Beiträge', viewAllPosts: 'Alle Beiträge anzeigen',
    category: 'Kategorie', tag: 'Tag', share: 'Teilen', newPost: 'Neu',
  },
  es: {
    title: 'El blog', subtitle: 'Noticias, tutoriales, recursos y actualizaciones de RustDesk.', page: 'Página',
    newerPosts: 'Publicaciones más recientes', olderPosts: 'Publicaciones anteriores', updated: 'Actualizado',
    minRead: 'min de lectura', backToBlog: 'Volver al blog', relatedPosts: 'Publicaciones relacionadas',
    viewAllPosts: 'Ver todas las publicaciones', category: 'Categoría', tag: 'Etiqueta', share: 'Compartir',
    newPost: 'Nuevo',
  },
  fr: {
    title: 'Le blog', subtitle: 'Actualités, tutoriels, ressources et mises à jour de RustDesk.', page: 'Page',
    newerPosts: 'Articles plus récents', olderPosts: 'Articles plus anciens', updated: 'Mis à jour', minRead: 'min de lecture',
    backToBlog: 'Retour au blog', relatedPosts: 'Articles associés', viewAllPosts: 'Voir tous les articles',
    category: 'Catégorie', tag: 'Étiquette', share: 'Partager', newPost: 'Nouveau',
  },
  it: {
    title: 'Il blog', subtitle: 'Notizie, tutorial, risorse e aggiornamenti di RustDesk.', page: 'Pagina',
    newerPosts: 'Articoli più recenti', olderPosts: 'Articoli meno recenti', updated: 'Aggiornato', minRead: 'min di lettura',
    backToBlog: 'Torna al blog', relatedPosts: 'Articoli correlati', viewAllPosts: 'Vedi tutti gli articoli',
    category: 'Categoria', tag: 'Etichetta', share: 'Condividi', newPost: 'Novità',
  },
  ja: {
    title: 'ブログ', subtitle: 'RustDesk のニュース、チュートリアル、資料、製品アップデート。', page: 'ページ',
    newerPosts: '新しい記事', olderPosts: '過去の記事', updated: '更新', minRead: '分で読めます', backToBlog: 'ブログに戻る',
    relatedPosts: '関連記事', viewAllPosts: 'すべての記事を見る', category: 'カテゴリー', tag: 'タグ', share: '共有',
    newPost: '新着',
  },
  ko: {
    title: '블로그', subtitle: 'RustDesk의 뉴스, 튜토리얼, 자료 및 제품 업데이트입니다.', page: '페이지',
    newerPosts: '최신 글', olderPosts: '이전 글', updated: '업데이트', minRead: '분 소요', backToBlog: '블로그로 돌아가기',
    relatedPosts: '관련 글', viewAllPosts: '모든 글 보기', category: '카테고리', tag: '태그', share: '공유',
    newPost: '새 글',
  },
  pt: {
    title: 'O blog', subtitle: 'Notícias, tutoriais, recursos e atualizações do RustDesk.', page: 'Página',
    newerPosts: 'Publicações mais recentes', olderPosts: 'Publicações anteriores', updated: 'Atualizado',
    minRead: 'min de leitura', backToBlog: 'Voltar ao blog', relatedPosts: 'Publicações relacionadas',
    viewAllPosts: 'Ver todas as publicações', category: 'Categoria', tag: 'Etiqueta', share: 'Compartilhar',
    newPost: 'Novo',
  },
  'zh-cn': {
    title: '博客', subtitle: 'RustDesk 新闻、教程、资源和产品更新。', page: '第', newerPosts: '较新文章', olderPosts: '较早文章',
    updated: '更新于', minRead: '分钟阅读', backToBlog: '返回博客', relatedPosts: '相关文章', viewAllPosts: '查看所有文章',
    category: '分类', tag: '标签', share: '分享', newPost: '最新',
  },
  'zh-tw': {
    title: '部落格', subtitle: 'RustDesk 新聞、教學、資源與產品更新。', page: '第', newerPosts: '較新文章', olderPosts: '較早文章',
    updated: '更新於', minRead: '分鐘閱讀', backToBlog: '返回部落格', relatedPosts: '相關文章', viewAllPosts: '查看所有文章',
    category: '分類', tag: '標籤', share: '分享', newPost: '最新',
  },
  ar: {
    title: 'المدونة', subtitle: 'أخبار RustDesk وشروحاتها ومواردها وتحديثات منتجاتها.', page: 'الصفحة',
    newerPosts: 'منشورات أحدث', olderPosts: 'منشورات أقدم', updated: 'حُدّث في', minRead: 'دقائق للقراءة',
    backToBlog: 'العودة إلى المدونة', relatedPosts: 'منشورات ذات صلة', viewAllPosts: 'عرض جميع المنشورات',
    category: 'الفئة', tag: 'الوسم', share: 'مشاركة', newPost: 'جديد',
  },
};

export const getBlogCopy = (lang?: Lang): BlogCopy => copy[lang || DEFAULT_LOCALE] || copy[DEFAULT_LOCALE];
