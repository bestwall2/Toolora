import type { Locale } from './config';

export interface LocalizedFAQ {
  question: string;
  answer: string;
}

export interface LocalizedToolContent {
  name: string;
  description: string;
  longDescription: string;
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  content: string;
  howToSteps: string[];
  faq: LocalizedFAQ[];
  badge?: string;
}

export interface LocalizedCategoryContent {
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  longDescription: string;
  keywords: string[];
}

export interface Dictionary {
  meta: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
  };
  nav: {
    allTools: string;
    images: string;
    pdf: string;
    devTools: string;
    searchTools: string;
    search: string;
    searchPlaceholder: string;
    toggleTheme: string;
    toggleMenu: string;
    closeMenu: string;
  };
  langSwitcher: {
    label: string;
    changeLanguage: string;
  };
  footer: {
    tagline: string;
    toolsTitle: string;
    popularTitle: string;
    companyTitle: string;
    allTools: string;
    imageTools: string;
    pdfTools: string;
    textTools: string;
    developerTools: string;
    calculators: string;
    about: string;
    contact: string;
    privacy: string;
    terms: string;
    sitemap: string;
    rights: string;
    madeWith: string;
    browserProcessed: string;
  };
  common: {
    download: string;
    copy: string;
    copied: string;
    clear: string;
    change: string;
    close: string;
    remove: string;
    submit: string;
    loading: string;
    processing: string;
    popular: string;
    useTool: string;
    browse: string;
    backToTools: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    popular: string;
    browseByCategory: string;
    browseByCategoryDesc: string;
    popularTools: string;
    popularToolsDesc: string;
    whyChoose: string;
    whyChooseDesc: string;
    whyFeatures: { title: string; desc: string }[];
    faqTitle: string;
    faqDesc: string;
    faqs: LocalizedFAQ[];
  };
  toolsPage: {
    title: string;
    subtitle: string;
    searchResults: string;
    showingResults: string;
    noResults: string;
    viewAllTools: string;
    allTools: string;
  };
  categoryPage: {
    viewAllTools: string;
    emptyTitle: string;
  };
  toolPage: {
    browserBased: string;
    about: string;
    howToUse: string;
    faqTitle: string;
    peopleAlsoUse: string;
    home: string;
    allTools: string;
    notFoundTitle: string;
    notFoundDesc: string;
  };
  searchModal: {
    title: string;
    placeholder: string;
    noResults: string;
    tryDifferent: string;
    popularTools: string;
    navigate: string;
    open: string;
    close: string;
    esc: string;
  };
  aboutPage: {
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    features: { title: string; desc: string }[];
  };
  contactPage: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
      successTitle: string;
      successDesc: string;
      sendAnother: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
    };
  };
  privacyPage: {
    title: string;
    updated: string;
    sections: { heading: string; body: string[] }[];
  };
  termsPage: {
    title: string;
    updated: string;
    sections: { heading: string; body: string[] }[];
  };
  toolUi: {
    common: {
      dropHere: string;
      orClickToBrowse: string;
      maxSize: string;
      upload: string;
      download: string;
      copy: string;
      copied: string;
      clear: string;
      change: string;
      processing: string;
      fileTooLarge: string;
      invalidFile: string;
      removeFile: string;
    };
    tools: Record<string, Record<string, string>>;
  };
  toolsContent: Record<string, LocalizedToolContent>;
  categoriesContent: Record<string, LocalizedCategoryContent>;
  supportedLocales: Locale[];
}
