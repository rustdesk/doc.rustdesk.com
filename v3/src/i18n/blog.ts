import { DEFAULT_LOCALE, type Lang } from '@/i18n';

export interface BlogCopy {
  title: string;
  subtitle: string;
  /** Meta description of the blog index: 120-160 characters (Bing). */
  description: string;
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
    description: 'The RustDesk blog: news and tutorials for the open-source remote desktop, plus comparisons, self-hosted deployment, security, pricing and troubleshooting.',
    page: 'Page', newerPosts: 'Newer posts', olderPosts: 'Older posts', updated: 'Updated', minRead: 'min read',
    backToBlog: 'Back to Blog', relatedPosts: 'Related Posts', viewAllPosts: 'View All Posts', category: 'Category',
    tag: 'Tag', share: 'Share', newPost: 'New',
  },
  de: {
    title: 'Der Blog', subtitle: 'Neuigkeiten, Anleitungen, Ressourcen und Produktupdates von RustDesk.',
    description: 'Der RustDesk-Blog: Neues und Anleitungen zum Open-Source-Remote-Desktop, Vergleiche, selbst gehostete Bereitstellung, Sicherheit, Preise und Fehlerbehebung.', page: 'Seite',
    newerPosts: 'Neuere Beiträge', olderPosts: 'Ältere Beiträge', updated: 'Aktualisiert', minRead: 'Min. Lesezeit',
    backToBlog: 'Zurück zum Blog', relatedPosts: 'Ähnliche Beiträge', viewAllPosts: 'Alle Beiträge anzeigen',
    category: 'Kategorie', tag: 'Tag', share: 'Teilen', newPost: 'Neu',
  },
  es: {
    title: 'El blog', subtitle: 'Noticias, tutoriales, recursos y actualizaciones de RustDesk.',
    description: 'Blog de RustDesk: novedades y tutoriales del escritorio remoto de código abierto, comparativas, autoalojamiento, seguridad, precios y solución de problemas.', page: 'Página',
    newerPosts: 'Publicaciones más recientes', olderPosts: 'Publicaciones anteriores', updated: 'Actualizado',
    minRead: 'min de lectura', backToBlog: 'Volver al blog', relatedPosts: 'Publicaciones relacionadas',
    viewAllPosts: 'Ver todas las publicaciones', category: 'Categoría', tag: 'Etiqueta', share: 'Compartir',
    newPost: 'Nuevo',
  },
  fr: {
    title: 'Le blog', subtitle: 'Actualités, tutoriels, ressources et mises à jour de RustDesk.',
    description: 'Le blog RustDesk : actualités et tutoriels sur le bureau à distance open source, comparatifs, déploiement auto-hébergé, sécurité, tarifs et dépannage.', page: 'Page',
    newerPosts: 'Articles plus récents', olderPosts: 'Articles plus anciens', updated: 'Mis à jour', minRead: 'min de lecture',
    backToBlog: 'Retour au blog', relatedPosts: 'Articles associés', viewAllPosts: 'Voir tous les articles',
    category: 'Catégorie', tag: 'Étiquette', share: 'Partager', newPost: 'Nouveau',
  },
  it: {
    title: 'Il blog', subtitle: 'Notizie, tutorial, risorse e aggiornamenti di RustDesk.',
    description: 'Blog di RustDesk: novità, tutorial, confronti con TeamViewer e AnyDesk, guide self-hosted, sicurezza, licenze e soluzioni per il desktop remoto open source.', page: 'Pagina',
    newerPosts: 'Articoli più recenti', olderPosts: 'Articoli meno recenti', updated: 'Aggiornato', minRead: 'min di lettura',
    backToBlog: 'Torna al blog', relatedPosts: 'Articoli correlati', viewAllPosts: 'Vedi tutti gli articoli',
    category: 'Categoria', tag: 'Etichetta', share: 'Condividi', newPost: 'Novità',
  },
  ja: {
    title: 'ブログ', subtitle: 'RustDesk のニュース、チュートリアル、資料、製品アップデート。',
    description: 'RustDesk公式ブログでは、製品ニュースやリリース情報、チュートリアル、TeamViewerやAnyDeskとの比較、セルフホストサーバーの導入ガイド、リモートデスクトップのセキュリティ、ライセンスと料金、トラブルシューティングの記事を掲載。オープンソースのRustDeskの選定や運用に役立ちます。', page: 'ページ',
    newerPosts: '新しい記事', olderPosts: '過去の記事', updated: '更新', minRead: '分で読めます', backToBlog: 'ブログに戻る',
    relatedPosts: '関連記事', viewAllPosts: 'すべての記事を見る', category: 'カテゴリー', tag: 'タグ', share: '共有',
    newPost: '新着',
  },
  ko: {
    title: '블로그', subtitle: 'RustDesk의 뉴스, 튜토리얼, 자료 및 제품 업데이트입니다.',
    description: 'RustDesk 공식 블로그입니다. 새 기능과 릴리스 소식, 튜토리얼, TeamViewer 및 AnyDesk 비교, 자체 호스팅 서버 배포 가이드, 보안과 사기 예방, 라이선스와 가격, 문제 해결까지 오픈소스 원격 데스크톱 운영에 필요한 정보를 한곳에 모았습니다.', page: '페이지',
    newerPosts: '최신 글', olderPosts: '이전 글', updated: '업데이트', minRead: '분 소요', backToBlog: '블로그로 돌아가기',
    relatedPosts: '관련 글', viewAllPosts: '모든 글 보기', category: '카테고리', tag: '태그', share: '공유',
    newPost: '새 글',
  },
  pt: {
    title: 'O blog', subtitle: 'Notícias, tutoriais, recursos e atualizações do RustDesk.',
    description: 'Blog do RustDesk sobre acesso remoto de código aberto: notícias, tutoriais, TeamViewer e AnyDesk comparados, auto-hospedagem, segurança, licenças e soluções.', page: 'Página',
    newerPosts: 'Publicações mais recentes', olderPosts: 'Publicações anteriores', updated: 'Atualizado',
    minRead: 'min de leitura', backToBlog: 'Voltar ao blog', relatedPosts: 'Publicações relacionadas',
    viewAllPosts: 'Ver todas as publicações', category: 'Categoria', tag: 'Etiqueta', share: 'Compartilhar',
    newPost: 'Novo',
  },
  'zh-cn': {
    title: '博客', subtitle: 'RustDesk 新闻、教程、资源和产品更新。',
    description: 'RustDesk 官方博客，汇集产品新闻与功能发布（如 Web 客户端和 Wayland 无人值守访问）、上手教程、与 TeamViewer 和 AnyDesk 等工具的对比、自建服务器部署指南，以及远程桌面安全、许可计费和故障排除文章，帮助你全面了解这款开源软件。', page: '第', newerPosts: '较新文章', olderPosts: '较早文章',
    updated: '更新于', minRead: '分钟阅读', backToBlog: '返回博客', relatedPosts: '相关文章', viewAllPosts: '查看所有文章',
    category: '分类', tag: '标签', share: '分享', newPost: '最新',
  },
  'zh-tw': {
    title: '部落格', subtitle: 'RustDesk 新聞、教學、資源與產品更新。',
    description: 'RustDesk 官方部落格，收錄產品新聞與新功能發布（例如網頁用戶端、Wayland 無人值守存取）、操作教學、與 TeamViewer、AnyDesk 等工具的比較、自架伺服器部署指南，以及遠端桌面資安、授權計費與疑難排解文章，帶你全面認識這套開源軟體。', page: '第', newerPosts: '較新文章', olderPosts: '較早文章',
    updated: '更新於', minRead: '分鐘閱讀', backToBlog: '返回部落格', relatedPosts: '相關文章', viewAllPosts: '查看所有文章',
    category: '分類', tag: '標籤', share: '分享', newPost: '最新',
  },
  ar: {
    title: 'المدونة', subtitle: 'أخبار RustDesk وشروحاتها ومواردها وتحديثات منتجاتها.',
    description: 'مدونة RustDesk: أخبار وشروحات ومقارنات مع TeamViewer وAnyDesk، وأدلة نشر الخادم ذاتي الاستضافة، والأمان والترخيص وحل مشكلات سطح المكتب البعيد مفتوح المصدر.', page: 'الصفحة',
    newerPosts: 'منشورات أحدث', olderPosts: 'منشورات أقدم', updated: 'حُدّث في', minRead: 'دقائق للقراءة',
    backToBlog: 'العودة إلى المدونة', relatedPosts: 'منشورات ذات صلة', viewAllPosts: 'عرض جميع المنشورات',
    category: 'الفئة', tag: 'الوسم', share: 'مشاركة', newPost: 'جديد',
  },
};

export const getBlogCopy = (lang?: Lang): BlogCopy => copy[lang || DEFAULT_LOCALE] || copy[DEFAULT_LOCALE];
