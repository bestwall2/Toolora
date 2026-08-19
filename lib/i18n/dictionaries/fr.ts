import type { Dictionary } from '../types';
import { locales } from '../config';

const dict: Dictionary = {
  meta: {
    defaultTitle: 'Toollora — outils gratuits en ligne pour le quotidien',
    defaultDescription:
      'Des outils en ligne gratuits et performants pour PDF, images, texte, développeurs et plus encore. Rapides, simples et gratuits, sans inscription.',
    keywords: ['outils gratuits', 'outils pdf', 'outils images', 'outils texte', 'outils développeurs', 'toollora'],
  },
  nav: {
    allTools: 'Tous les outils',
    images: 'Images',
    pdf: 'PDF',
    devTools: 'Outils développeurs',
    searchTools: 'Rechercher des outils',
    search: 'Recherche',
    searchPlaceholder: 'Rechercher des outils…',
    toggleTheme: 'Changer de thème',
    toggleMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },
  langSwitcher: {
    label: 'Langue',
    changeLanguage: 'Changer de langue',
  },
  footer: {
    tagline: 'Des outils gratuits, rapides et privés pour les tâches de tous les jours. Aucune inscription requise.',
    toolsTitle: 'Outils',
    popularTitle: 'Populaires',
    companyTitle: 'Entreprise',
    allTools: 'Tous les outils',
    imageTools: 'Outils d’image',
    pdfTools: 'Outils PDF',
    textTools: 'Outils texte',
    developerTools: 'Outils développeurs',
    calculators: 'Calculatrices',
    about: 'À propos',
    contact: 'Contact',
    privacy: 'Confidentialité',
    privacyProof: 'Preuve de confidentialité',
    terms: 'Conditions',
    sitemap: 'Plan du site',
    rights: 'Tous droits réservés.',
    madeWith: 'Conçu avec soin pour le web.',
    browserProcessed: 'Traitement dans le navigateur — vos fichiers restent privés.',
  },
  common: {
    download: 'Télécharger',
    copy: 'Copier',
    copied: 'Copié !',
    clear: 'Effacer',
    change: 'Changer',
    close: 'Fermer',
    remove: 'Retirer',
    submit: 'Envoyer',
    loading: 'Chargement…',
    processing: 'Traitement…',
    popular: 'Populaire',
    useTool: 'Utiliser l’outil',
    browse: 'Parcourir',
    backToTools: 'Retour à tous les outils',
    free: 'Gratuit',
  },
  home: {
    heroTitle: 'Des outils gratuits en ligne pour le quotidien',
    heroSubtitle:
      'Des outils performants pour PDF, images, texte, fichiers, développeurs et plus. Rapides, simples et gratuits, sans inscription.',
    popular: 'Populaires :',
    browseByCategory: 'Parcourir par catégorie',
    browseByCategoryDesc: 'Explorez notre annuaire, organisé par catégories.',
    popularTools: 'Outils populaires',
    popularToolsDesc: 'Les outils les plus utilisés sur Toollora par les développeurs, rédacteurs et designers.',
    whyChoose: 'Pourquoi choisir Toollora ?',
    whyChooseDesc: 'Nous concevons des applications qui respectent la vie privée des utilisateurs et vont au maximum de leur vitesse.',
    whyFeatures: [
      {
        title: 'Confidentialité d’abord',
        desc: 'Les fichiers sont traités entièrement dans votre navigateur. Nous n’envoyons jamais vos fichiers ni vos données sensibles à nos serveurs.',
      },
      {
        title: 'Aucune inscription',
        desc: 'Les outils gratuits doivent être faciles. Utilisez n’importe quel outil et téléchargez le résultat immédiatement, sans compte.',
      },
      {
        title: 'Pensé mobile',
        desc: 'De la retouche d’image à l’édition de documents, nous concevons des interfaces propres qui s’adaptent parfaitement aux petits écrans.',
      },
    ],
    faqTitle: 'Questions fréquentes',
    faqDesc: 'Questions générales sur les fonctionnalités et l’architecture de Toollora.',
    faqs: [
      {
        question: 'Tous les outils Toollora sont-ils gratuits ?',
        answer:
          'Oui. Tous les outils sont entièrement gratuits, sans frais cachés, sans inscription et sans limite d’utilisation pour les tâches standard.',
      },
      {
        question: 'Ai-je besoin de créer un compte ?',
        answer: 'Aucun compte n’est requis pour les outils actuels. Ouvrez la page de l’outil, utilisez-le et téléchargez le résultat.',
      },
      {
        question: 'Mes fichiers sont-ils envoyés à vos serveurs ?',
        answer:
          'Pour tous les outils fonctionnant dans le navigateur, vos fichiers sont traités localement et jamais envoyés à un serveur. Les outils traitant les données localement sont clairement indiqués.',
      },
      {
        question: 'Quels formats d’image sont pris en charge ?',
        answer: 'Toollora prend en charge les formats d’image les plus courants, notamment JPG, PNG et WebP pour les outils d’image.',
      },
      {
        question: 'Puis-je utiliser Toollora sur mon téléphone ?',
        answer: 'Oui. Toollora est entièrement responsive et fonctionne sur tous les formats d’écran, du petit mobile au grand moniteur.',
      },
      {
        question: 'Quelle est la précision des calculatrices ?',
        answer: 'Toutes les calculatrices utilisent l’arithmétique à virgule flottante standard de JavaScript et produisent des résultats précis pour un usage quotidien.',
      },
      {
        question: 'Quels navigateurs sont pris en charge ?',
        answer:
          'Toollora fonctionne sur tous les navigateurs modernes, notamment Chrome, Firefox, Safari et Edge. Certaines fonctions avancées comme le traitement PDF nécessitent un navigateur récent.',
      },
      {
        question: 'Ajouterez-vous davantage d’outils ?',
        answer:
          'Oui. La plateforme est conçue pour évoluer. De nouveaux outils sont ajoutés régulièrement. Si vous avez une idée, contactez-nous via la page de contact.',
      },
    ],
  },
  toolsPage: {
    title: 'Tous les outils gratuits en ligne — l’annuaire complet',
    subtitle:
      'Parcourez l’annuaire complet des outils gratuits Toollora. Compressez des images, fusionnez des PDF, formatez du JSON, générez des QR codes et plus.',
    searchResults: 'Résultats de recherche pour',
    showingResults: 'Affichage de',
    noResults: 'Aucun outil ne correspond à',
    viewAllTools: 'Voir tous les outils',
    allTools: 'Tous les outils',
  },
  categoryPage: {
    viewAllTools: 'Voir tous les outils',
    emptyTitle: 'Les outils de cette catégorie arrivent bientôt.',
  },
  toolPage: {
    browserBased: 'Fonctionne dans le navigateur',
    about: 'À propos',
    howToUse: 'Mode d’emploi',
    faqTitle: 'Questions fréquentes',
    peopleAlsoUse: 'Les gens utilisent aussi',
    home: 'Accueil',
    allTools: 'Tous les outils',
    privacyBadge: 'Traité 100 % dans votre navigateur — votre fichier ne quitte jamais votre appareil.',
    privacyProofLink: 'Comment le prouver',
    notFoundTitle: 'Outil introuvable',
    notFoundDesc: 'L’outil que vous cherchez n’existe pas ou a peut-être été déplacé.',
  },
  searchModal: {
    title: 'Rechercher des outils',
    placeholder: 'Rechercher un outil…',
    noResults: 'Aucun outil ne correspond à',
    tryDifferent: 'Essayez de rechercher par nom d’outil, catégorie ou mot-clé.',
    popularTools: 'Outils populaires',
    navigate: 'Parcourir',
    open: 'Ouvrir',
    close: 'Fermer',
    esc: 'Échap',
  },
  aboutPage: {
    title: 'À propos de Toollora',
    subtitle: 'Découvrez pourquoi nous construisons des outils web gratuits dans le navigateur, pour tout le monde.',
    p1: 'Toollora est né d’un besoin simple : une boîte à outils essentielle qui fait les tâches quotidiennes (compresser des images, fractionner des PDF, encoder du base64, valider du JSON) sans vous forcer à envoyer vos données sensibles vers des serveurs lointains ou à subir des publicités envahissantes.',
    p2: 'La plupart des portails web envoient vos fichiers à des serveurs privés. Chez Toollora, nous misons sur le traitement dans le navigateur. Nous utilisons des interfaces WebAssembly modernes et le Canvas natif pour redimensionner, fusionner et nettoyer vos fichiers, directement sur votre appareil.',
    features: [
      {
        title: 'Confidentialité intégrée',
        desc: 'Les fichiers sont traités dans l’environnement sandbox du navigateur et ne sont jamais envoyés à un serveur.',
      },
      {
        title: 'Exécution instantanée',
        desc: 'Pas de file d’attente. Le traitement se termine en une fraction de seconde grâce aux ressources locales de l’appareil.',
      },
      {
        title: 'Gratuit pour toujours',
        desc: 'Pas d’abonnement mensuel ni de paywall pour les outils essentiels. Le traitement de fichiers standard reste entièrement gratuit.',
      },
    ],
  },
  contactPage: {
    title: 'Contactez-nous',
    subtitle: 'Retour, rapport de bug ou suggestion de fonctionnalité ? Envoyez-nous un message.',
    form: {
      name: 'Votre nom',
      email: 'Votre e-mail',
      message: 'Message',
      send: 'Envoyer le message',
      successTitle: 'Message envoyé avec succès !',
      successDesc: 'Merci d’avoir contacté Toollora. Nous apprécions vos retours et vous répondrons si nécessaire.',
      sendAnother: 'Envoyer un autre message',
      namePlaceholder: 'Marie Dupont',
      emailPlaceholder: 'nom@exemple.com',
      messagePlaceholder: 'Comment pouvons-nous vous aider ?',
    },
  },
  privacyPage: {
    title: 'Politique de confidentialité',
    updated: 'Dernière mise à jour :',
    sections: [
      {
        heading: 'Aperçu',
        body: [
          'Toollora s’engage à protéger votre vie privée. La plupart des outils traitent les fichiers entièrement dans votre navigateur, ce qui signifie que vos fichiers ne sont jamais envoyés à nos serveurs, sauf mention explicite.',
        ],
      },
      {
        heading: 'Données que nous collectons',
        body: [
          'Nous ne demandons pas de compte et ne collectons pas d’informations personnelles pour utiliser les outils. Nous pouvons collecter des statistiques d’utilisation anonymes et agrégées pour améliorer la plateforme. Les fichiers traités par les outils dans le navigateur ne quittent jamais votre appareil.',
        ],
      },
      {
        heading: 'Traitement dans le navigateur',
        body: [
          'Les outils marqués « dans le navigateur » fonctionnent entièrement sur votre appareil avec des technologies telles que le Canvas API. Vos images, PDF et textes restent locaux et ne sont jamais envoyés sur le réseau.',
        ],
      },
      {
        heading: 'Cookies et stockage',
        body: [
          'Nous utilisons le stockage local pour mémoriser des préférences telles que le thème et la langue. Vous pouvez effacer ces données à tout moment dans les paramètres de votre navigateur.',
        ],
      },
      {
        heading: 'Services tiers',
        body: [
          'Nous ne vendons pas vos données. Tout service tiers que nous utilisons (comme l’analytics) ne reçoit que des informations anonymes et non identifiables.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          'Si vous avez des questions sur cette politique, contactez-nous via la page de contact.',
        ],
      },
    ],
  },
  privacyProofPage: {
    title: 'Preuve de confidentialité — architecture sans téléversement',
    subtitle: 'Tous les outils Toollora traitent vos fichiers dans votre navigateur. Vérifiez-le vous-même en moins de 30 secondes.',
    metaDescription:
      'Vérifiez par vous-même : chaque outil Toollora traite les fichiers à 100 % côté client, dans votre navigateur. Suivez le contrôle de l’onglet Réseau des DevTools pour confirmer qu’aucun fichier ne quitte votre appareil.',
    verifyTitle: 'Vérifiez-le vous-même (30 secondes)',
    verifyIntro: 'Vous pouvez confirmer qu’aucun fichier ne quitte jamais votre appareil grâce aux outils de développement intégrés de votre navigateur :',
    verifySteps: [
      'Ouvrez la page de n’importe quel outil, par exemple la Fusion de PDF.',
      'Ouvrez les outils de développement : appuyez sur F12, ou Ctrl+Maj+I sur Windows ou Cmd+Option+I sur Mac.',
      'Cliquez sur l’onglet « Réseau » et laissez-le ouvert pendant que vous travaillez.',
      'Glissez un fichier dans l’outil et traitez-le exactement comme d’habitude.',
      'Observez la liste des requêtes pendant votre travail. Vous verrez des ressources locales se charger (scripts, styles, polices) — mais jamais le nom, la taille ou le contenu de votre fichier dans une requête. Aucun point de téléversement n’existe pour recevoir vos données.',
    ],
    howTitle: 'Comment fonctionne l’architecture sans téléversement',
    howBody: [
      'Tout le traitement de fichiers utilise des API natives du navigateur qui s’exécutent sur votre appareil : l’API Canvas 2D pour l’édition d’images, pdf-lib et pdf.js pour le PDF, Tesseract.js et MediaPipe WebAssembly pour l’OCR et la segmentation IA, et l’API Web Crypto pour le hachage.',
      'Lorsque vous sélectionnez un fichier, le navigateur le lit en mémoire localement sous forme d’objet File. Tout ce qui suit — compression, conversion, fusion, rendu, reconnaissance — s’exécute en JavaScript sur votre propre processeur. Le résultat s’affiche à l’écran ou se télécharge comme un blob créé dans votre navigateur.',
      'Quelques outils téléchargent leur moteur de traitement à la première utilisation, comme le modèle linguistique de l’OCR ou le modèle de segmentation IA, depuis un réseau de diffusion de contenu public. Il s’agit de code téléchargé vers votre appareil pour le traitement — ce n’est jamais votre fichier, et cela ne téléverse jamais vos données.',
    ],
    guaranteesTitle: 'Ce que nous garantissons',
    guarantees: [
      { title: 'Aucun téléversement', desc: 'Aucun serveur Toollora ne reçoit jamais le contenu de vos fichiers. Il n’existe aucun stockage serveur pour les fichiers.' },
      { title: 'Sans compte, sans suivi de fichiers', desc: 'Tous les outils fonctionnent sans compte. Nous ne journalisons, ne stockons et ne fingerprintons pas vos fichiers.' },
      { title: 'Sans limites, sans publicité', desc: 'Aucun quota journalier et aucune publicité autour de votre travail — le traitement local est gratuit et illimité.' },
      { title: 'Vérifiable, pas seulement affirmé', desc: 'Vous pouvez confirmer l’affirmation vous-même dans l’onglet Réseau — aucune confiance aveugle requise.' },
    ],
    ctaTitle: 'Commencez par un test privé',
    ctaBody: 'Ouvrez n’importe quel outil, traitez un fichier sensible et regardez l’onglet Réseau. Vous ne verrez aucune donnée sortante.',
    ctaButton: 'Parcourir tous les outils',
  },
  pwa: {
    installTitle: 'Installer Toollora',
    installDesc: 'Ajoutez Toollora à votre écran d’accueil pour un accès rapide et privé — vos outils installés fonctionnent aussi hors ligne.',
    installNow: 'Installer',
    dismiss: 'Pas maintenant',
    offlineTitle: 'Vous êtes hors ligne',
    offlineDesc: 'Les pages visitées fonctionnent toujours. Reconnectez-vous pour de nouvelles pages et des mises à jour.',
    tryAgain: 'Réessayer',
  },
  trustSignals: {
    free: 'Gratuit pour toujours',
    noSignup: 'Sans inscription',
    offline: 'Fonctionne hors ligne',
    adFree: 'Sans publicité',
  },
  chain: {
    title: 'Continuer avec',
    sendTo: 'Envoyer vers',
  },
  termsPage: {
    title: 'Conditions d’utilisation',
    updated: 'Dernière mise à jour :',
    sections: [
      {
        heading: 'Acceptation des conditions',
        body: [
          'En utilisant Toollora, vous acceptez ces conditions. Si vous n’êtes pas d’accord, veuillez ne pas utiliser le site.',
        ],
      },
      {
        heading: 'Utilisation des outils',
        body: [
          'Tous les outils sont disponibles gratuitement à des fins légitimes. Vous pouvez les utiliser pour des projets personnels ou commerciaux. Vous ne devez pas les utiliser pour traiter du contenu illégal, nuisible ou enfreignant les droits d’autrui.',
        ],
      },
      {
        heading: 'Aucune garantie',
        body: [
          'Les outils sont fournis « en l’état », sans aucune garantie. Bien que nous nous efforcions de maintenir les outils précis et disponibles, nous ne garantissons pas l’absence d’erreurs ni une disponibilité ininterrompue.',
        ],
      },
      {
        heading: 'Responsabilité',
        body: [
          'Toollora ne saurait être tenue responsable de dommages indirects, accessoires ou consécutifs découlant de l’utilisation des outils.',
        ],
      },
      {
        heading: 'Modifications',
        body: [
          'Nous pouvons mettre à jour ces conditions de temps à autre. La poursuite de l’utilisation du site après modification vaut acceptation des conditions révisées.',
        ],
      },
    ],
  },
  toolUi: {
    common: {
      dropHere: 'Déposez votre fichier ici',
      orClickToBrowse: 'ou cliquez pour parcourir',
      maxSize: 'Taille max',
      upload: 'Importer',
      download: 'Télécharger',
      copy: 'Copier',
      copied: 'Copié !',
      clear: 'Effacer',
      change: 'Changer',
      processing: 'Traitement…',
      fileTooLarge: 'Le fichier est trop volumineux.',
      invalidFile: 'Fichier invalide. Réessayez.',
      removeFile: 'Retirer le fichier',
    },
    tools: {
      imageCompressor: {
        quality: 'Qualité',
        compress: 'Compresser l’image',
        compressing: 'Compression…',
        compressed: 'compressée',
        smaller: 'plus petite',
        uploadLabel: 'Déposez votre image ici',
        uploadSublabel: 'Prend en charge JPG, PNG et WebP · Max 50 Mo',
      },
      imageResizer: {
        presets: 'Préréglages',
        width: 'Largeur (px)',
        height: 'Hauteur (px)',
        outputFormat: 'Format de sortie',
        quality: 'Qualité',
        lockAspect: 'Verrouiller le ratio',
        original: 'Original',
        output: 'Sortie',
        resize: 'Redimensionner l’image',
        resizing: 'Redimensionnement…',
        changeImage: 'Changer d’image',
        uploadLabel: 'Déposez votre image ici',
        uploadSublabel: 'Prend en charge JPG, PNG et WebP · Max 50 Mo',
      },
      imageConverter: {
        targetFormat: 'Format cible',
        quality: 'Qualité',
        convert: 'Convertir l’image',
        converting: 'Conversion…',
        converted: 'Converti en',
        successfully: 'avec succès',
        changeImage: 'Changer d’image',
        uploadLabel: 'Déposez votre image ici',
        uploadSublabel: 'Prend en charge JPG, PNG et WebP · Max 50 Mo',
      },
      imageCropper: {
        crop: 'Recadrer l’image',
        cropHint: 'Faites glisser pour ajuster la zone de recadrage',
        download: 'Télécharger l’image recadrée',
        changeImage: 'Changer d’image',
        uploadLabel: 'Déposez votre image ici',
        uploadSublabel: 'Prend en charge JPG, PNG et WebP · Max 50 Mo',
      },
      imageEnhancer: {
        uploadLabel: 'Déposez votre image ici',
        uploadSublabel: 'Prend en charge JPG, PNG et WebP · Max 50 Mo',
        original: 'Originale',
        enhanced: 'Améliorée',
        processing: 'Amélioration…',
        brightness: 'Luminosité',
        contrast: 'Contraste',
        saturation: 'Saturation',
        sharpness: 'Netteté',
        auto: 'Amélioration auto',
        reset: 'Réinitialiser',
        changeImage: 'Changer d’image',
      },
      imageBackgroundRemover: {
        uploadLabel: 'Déposez votre photo ici',
        uploadSublabel: 'JPG, PNG ou WebP · idéal avec des personnes',
        keepPerson: 'Garder la personne',
        keepBackground: 'Garder l’arrière-plan',
        removeBg: 'Supprimer l’arrière-plan',
        removePerson: 'Supprimer la personne',
        removing: 'Suppression de l’arrière-plan…',
        loadingModel: 'Chargement du modèle IA… la première utilisation peut prendre quelques secondes',
        download: 'Télécharger le PNG',
        changeImage: 'Changer d’image',
        error: 'Impossible de traiter cette image. Essayez une photo claire d’une personne.',
        original: 'Originale',
        result: 'Résultat',
      },
      imageToText: {
        uploadLabel: 'Déposez votre image ou scan ici',
        uploadSublabel: 'Prend en charge JPG, PNG et WebP · Max 50 Mo',
        langLabel: 'Langue',
        langHint: 'Le mode Auto utilise la langue du site.',
        extract: 'Extraire le texte',
        extracting: 'Extraction du texte…',
        changeImage: 'Changer d’image',
        copyText: 'Copier le texte',
        downloadTxt: 'Télécharger .txt',
        copied: 'Copié !',
        result: 'Texte reconnu',
        source: 'Image source',
        resultPlaceholder: 'Le texte extrait apparaîtra ici…',
        error: 'Impossible de lire le texte de cette image. Essayez une image plus claire et bien éclairée.',
      },
      pdfMerger: {
        addMore: 'Ajouter d’autres PDF',
        merge: 'Fusionner les PDF',
        merging: 'Fusion en cours…',
        uploadLabel: 'Déposez vos PDF ici',
        uploadSublabel: 'Plusieurs PDF · Max 50 Mo par fichier',
        remove: 'Retirer',
      },
      pdfSplitter: {
        pages: 'pages',
        page: 'page',
        splitMode: 'Mode de fractionnement',
        splitAll: 'Fractionner en pages séparées',
        splitAllDesc: 'Crée',
        splitAllDesc2: 'fichiers PDF séparés',
        splitRange: 'Extraire des pages précises',
        splitRangeDesc: 'Ex. : 1-3, 5, 7-9',
        splitEvery: 'Fractionner toutes les N pages',
        splitEveryDesc: 'Fractionner en parties égales',
        splitEveryLabel: 'Fractionner toutes les',
        pagesUnit: 'pages',
        split: 'Fractionner le PDF',
        splitting: 'Fractionnement…',
        success: 'PDF fractionné et téléchargé avec succès !',
        noValidPages: 'Aucune page valide dans cette plage.',
        invalidPdf: 'Impossible de lire le PDF. Vérifiez que le fichier est valide.',
        splitFailed: 'Échec du fractionnement. Vérifiez que le fichier est valide.',
        uploadLabel: 'Déposez votre PDF ici',
        uploadSublabel: 'Un seul PDF · Max 50 Mo',
      },
      pdfCompressor: {
        compress: 'Compresser le PDF',
        compressing: 'Compression…',
        compressed: 'compressé',
        smaller: 'plus petit',
        invalidPdf: 'Impossible de lire le PDF. Vérifiez que le fichier est valide.',
        compressFailed: 'Échec de la compression. Vérifiez que le fichier est valide.',
        uploadLabel: 'Déposez votre PDF ici',
        uploadSublabel: 'Un seul PDF · Max 50 Mo',
      },
      pdfToImages: {
        format: 'Format d’image',
        dpi: 'DPI',
        convert: 'Convertir le PDF en images',
        converting: 'Conversion…',
        convertFailed: 'Échec de la conversion. Vérifiez que le fichier est valide.',
        uploadLabel: 'Déposez votre PDF ici',
        uploadSublabel: 'Un seul PDF · Max 50 Mo',
        page: 'Page',
      },
      wordCounter: {
        words: 'Mots',
        characters: 'Caractères',
        noSpaces: 'sans espaces',
        sentences: 'Phrases',
        paragraphs: 'Paragraphes',
        readingTime: 'Temps de lecture',
        minutes: 'min',
        topKeywords: 'Mots-clés les plus fréquents',
        typeHint: 'Tapez ci-dessus (mots de 4 caractères et plus) pour afficher la densité des mots.',
        clearText: 'Effacer le texte',
        ariaLabel: 'Texte à compter',
        placeholder: 'Tapez ou collez votre texte ici pour compter les mots et les caractères…',
      },
      caseConverter: {
        upper: 'MAJUSCULES',
        lower: 'minuscules',
        titleCase: 'Casse Titre',
        sentenceCase: 'Casse phrase',
        camelCase: 'camelCase',
        pascalCase: 'PascalCase',
        snakeCase: 'snake_case',
        kebabCase: 'kebab-case',
        characters: 'caractères',
        words: 'mots',
        copyText: 'Copier le texte',
        clear: 'Effacer',
        ariaLabel: 'Texte à convertir',
        placeholder: 'Collez votre texte ici pour le convertir en différentes casse…',
      },
      removeDuplicateLines: {
        input: 'Texte d’entrée',
        result: 'Résultat',
        optionsTitle: 'Options de déduplication',
        mode: 'Mode de déduplication',
        keepFirst: 'Conserver la première occurrence',
        keepLast: 'Conserver la dernière occurrence',
        filtering: 'Filtrage et tri',
        caseSensitive: 'Comparaison sensible à la casse',
        removeEmptyLines: 'Supprimer les lignes vides',
        sortAlphabetically: 'Trier par ordre alphabétique',
        remove: 'Supprimer les doublons',
        copyResult: 'Copier le résultat',
        inputPlaceholder: 'Collez votre liste ici. Un élément par ligne…',
        resultPlaceholder: 'Le résultat apparaîtra ici…',
      },
      textCleaner: {
        input: 'Texte d’entrée',
        cleaned: 'Texte nettoyé',
        optionsTitle: 'Options de nettoyage',
        trimLines: 'Couper les lignes',
        trimLinesDesc: 'Supprimer les espaces de début et de fin',
        extraSpaces: 'Supprimer les espaces multiples',
        extraSpacesDesc: 'Remplacer plusieurs espaces par un seul',
        removeEmptyLines: 'Supprimer les lignes vides',
        removeEmptyLinesDesc: 'Supprimer entièrement les lignes vides',
        removeDuplicates: 'Supprimer les lignes en double',
        removeDuplicatesDesc: 'Ne conserver que les lignes uniques',
        normalizeBreaks: 'Normaliser les sauts de ligne',
        normalizeBreaksDesc: 'Convertir les CRLF en Unix LF',
        clean: 'Nettoyer le texte',
        copyResult: 'Copier le résultat',
        inputPlaceholder: 'Collez votre texte ici pour le nettoyer…',
        resultPlaceholder: 'Le texte nettoyé apparaîtra ici…',
      },
      jsonFormatter: {
        input: 'Collez l’entrée JSON',
        output: 'Sortie',
        clear: 'Effacer',
        copy: 'Copier',
        download: 'Télécharger',
        format: 'Formater le JSON',
        minify: 'Minifier le JSON',
        errorTitle: 'Erreur d’analyse JSON',
        errorNearLine: 'Erreur près de la ligne :',
        outputPlaceholder: 'La sortie JSON formatée apparaîtra ici…',
        inputPlaceholder: '{ "cle": "valeur", "tableau": [1, 2, 3] }',
      },
      base64Tool: {
        input: 'Entrée',
        output: 'Sortie',
        encodeTitle: 'Texte vers Base64',
        decodeTitle: 'Base64 vers texte',
        swap: 'Inverser le mode',
        encode: 'Encoder en Base64',
        decode: 'Décoder le Base64',
        copyResult: 'Copier le résultat',
        clear: 'Effacer',
        encodeError: 'Impossible d’encoder le texte d’entrée.',
        decodeError: 'Chaîne Base64 invalide. Vérifiez l’entrée.',
        inputPlaceholderEncode: 'Saisissez le texte brut ici…',
        inputPlaceholderDecode: 'Saisissez la chaîne Base64 ici…',
        outputPlaceholder: 'La sortie apparaîtra ici…',
      },
      uuidGenerator: {
        title: 'Générateur d’UUID',
        generate: 'Générer',
        copy: 'Copier',
        copied: 'Copié !',
        count: 'Nombre d’UUID',
        version: 'Version',
        ariaLabel: 'UUID',
      },
      jwtDecoder: {
        privacyTitle: 'Confidentialité et non-vérification',
        privacyDesc:
          'Le décodage se fait entièrement dans votre navigateur. Les jetons ne sont jamais envoyés à un serveur. Notez que le décodage des claims ne vérifie pas la signature ni l’expiration.',
        pasteToken: 'Collez un jeton JWT',
        header: 'En-tête (algorithme et type)',
        payload: 'Payload (claims)',
        invalidStructure:
          'Structure JWT invalide. Un jeton doit comporter trois parties séparées par des points (header.payload.signature).',
        invalidClaims: 'Impossible d’analyser les claims du jeton. Vérifiez que le jeton est un Base64Url valide.',
        tokenPlaceholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
      shaHashGenerator: {
        textTab: 'Texte',
        placeholder: 'Saisissez le texte à hacher…',
        hash: 'Empreinte',
        copy: 'Copier',
        copied: 'Copié !',
        chooseFile: 'Choisir un fichier à hacher',
        changeFile: 'Changer de fichier',
        fileHint: 'Les fichiers sont hachés localement dans votre navigateur et ne sont jamais téléversés.',
        emptyHint: 'Saisissez du texte ou choisissez un fichier pour générer une empreinte.',
      },
      colorConverter: {
        hex: 'HEX',
        rgbLabel: 'RVB',
        hslLabel: 'HSL',
        preview: 'Aperçu',
        pick: 'Choisir une couleur',
        hint: 'Modifiez n’importe quel champ — tous les formats se mettent à jour instantanément. Copiez le code dont vous avez besoin.',
      },
      percentageCalculator: {
        of: 'X % de Y',
        is: 'X est quel % de Y',
        change: 'Augmentation / diminution %',
        whatIs: 'Quel est',
        percentOf: '% de',
        isWhatPercentOf: 'est quel pourcentage de',
        from: 'de',
        to: 'à',
        result: 'Résultat :',
        increase: 'Augmentation',
        decrease: 'Diminution',
        xLabel: 'Valeur X',
        yLabel: 'Valeur Y',
        oldValue: 'Ancienne valeur',
        newValue: 'Nouvelle valeur',
      },
      ageCalculator: {
        selectDob: 'Sélectionnez la date de naissance',
        years: 'ans',
        months: 'mois',
        days: 'jours',
        totalDays: 'Jours totaux',
      },
      discountCalculator: {
        price: 'Prix original',
        discount: 'Réduction (%)',
        youSave: 'Vous économisez',
        finalPrice: 'Prix final',
        pricePlaceholder: '0,00',
        discountPlaceholder: 'Ex. : 20',
      },
      qrGenerator: {
        url: 'URL',
        text: 'Texte',
        email: 'E-mail',
        wifi: 'Wi-Fi',
        websiteUrl: 'URL du site',
        plainText: 'Texte brut',
        emailTo: 'À',
        subject: 'Objet',
        message: 'Message',
        ssid: 'Nom du réseau',
        encryption: 'Type de chiffrement',
        password: 'Mot de passe',
        imageSize: 'Taille de l’image',
        errorCorrection: 'Correction d’erreur',
        yourQr: 'Votre QR code',
        enterContent: 'Saisissez le contenu pour l’aperçu',
        download: 'Télécharger le QR code',
        urlPlaceholder: 'https://exemple.com',
        textPlaceholder: 'Écrivez votre texte ici…',
        emailPlaceholder: 'bonjour@exemple.com',
        subjectPlaceholder: 'Ligne d’objet',
        messagePlaceholder: 'Écrivez le contenu de l’e-mail ici…',
        ssidPlaceholder: 'RéseauMaison',
        passwordPlaceholder: 'Mot de passe du réseau',
      },
    },
  },
  toolsContent: {
    'image-background-remover': {
      name: 'Suppression d’arrière-plan d’image',
      description: 'Supprimez automatiquement l’arrière-plan des photos de personnes.',
      longDescription: 'Découpez l’arrière-plan de vos selfies et photos de personnes grâce à une IA qui fonctionne dans votre navigateur. La personne est conservée et enregistrée en PNG transparent.',
      keywords: ['supprimer arrière-plan', 'détourage image', 'fond transparent', 'suppression de fond', 'supprimer bg'],
      seoTitle: 'Suppression d’arrière-plan — retirer le fond gratuitement',
      seoDescription:
        'Supprimez l’arrière-plan des photos de personnes gratuitement. Détourage intelligent dans votre navigateur — vos images ne sont jamais téléversées.',
      content:
        'Que vous ayez besoin d’une photo de profil nette, d’une image produit ou d’un détourage transparent pour votre design, cet outil retire automatiquement l’arrière-plan des photos de personnes. Un modèle d’IA exécuté sur votre appareil détecte la personne dans l’image et la sépare de l’arrière-plan, afin que vous puissiez télécharger un PNG transparent prêt à l’emploi. Tout se passe localement dans votre navigateur — la première utilisation télécharge un petit modèle ensuite mis en cache, et vos photos ne quittent jamais votre appareil.',
      howToSteps: [
        'Téléversez une photo de personne (JPG ou PNG).',
        'Cliquez sur « Supprimer l’arrière-plan ». Le modèle se charge à la première utilisation.',
        'Vérifiez le détourage transparent.',
        'Téléchargez le PNG transparent.',
      ],
      faq: [
        {
          question: 'Mes images sont-elles téléversées sur un serveur ?',
          answer: 'Non. Le modèle de segmentation fonctionne entièrement dans votre navigateur grâce à WebAssembly. Votre image ne quitte jamais votre appareil.',
        },
        {
          question: 'Fonctionne-t-il avec des objets ou seulement des personnes ?',
          answer: 'Cet outil utilise un modèle de segmentation de selfie optimisé pour les personnes. Les résultats peuvent être médiocres avec des photos d’animaux ou d’objets.',
        },
        {
          question: 'Pourquoi faut-il télécharger un modèle ?',
          answer: 'Le modèle d’IA (environ 2 Mo) est téléchargé une seule fois depuis le CDN de Google à la première utilisation, puis mis en cache dans votre navigateur pour les visites suivantes.',
        },
      ],
    },
    'image-to-text': {
      name: 'Image en texte (OCR)',
      description: 'Extrayez le texte des images et des documents numérisés.',
      longDescription: 'Convertissez images, captures d’écran et pages numérisées en texte modifiable. La reconnaissance optique s’exécute dans votre navigateur.',
      keywords: ['ocr', 'image en texte', 'extraire texte d’une image', 'reconnaissance de texte', 'texte depuis image'],
      seoTitle: 'Image en texte — extraire le texte d’une image gratuitement',
      seoDescription:
        'Extrayez gratuitement le texte d’images, de captures d’écran et de documents numérisés avec la reconnaissance optique dans votre navigateur. Sans téléversement.',
      content:
        'Besoin du texte d’une capture d’écran, d’une photo de document ou d’une page numérisée ? Cet outil lit le texte directement dans l’image grâce à la reconnaissance optique de caractères (OCR) et vous le restitue sous forme de texte copiable et modifiable. Le moteur de reconnaissance s’exécute localement dans votre navigateur : votre document n’est donc jamais téléversé. L’anglais, l’arabe, le français et l’espagnol sont pris en charge, et vous pouvez copier le résultat ou le télécharger en fichier texte.',
      howToSteps: [
        'Téléversez une image ou un scan (JPG, PNG ou WebP).',
        'Choisissez la langue de reconnaissance (sélectionnée selon la langue de l’interface).',
        'Cliquez sur « Extraire le texte ». Le moteur OCR se charge à la première utilisation.',
        'Copiez le résultat ou téléchargez-le en .txt.',
      ],
      faq: [
        {
          question: 'Mon document est-il téléversé quelque part ?',
          answer: 'Non. Le moteur OCR s’exécute localement dans votre navigateur, vos images et documents ne quittent jamais votre appareil.',
        },
        {
          question: 'Quelles langues sont prises en charge ?',
          answer: 'La reconnaissance prend en charge l’anglais, l’arabe, le français et l’espagnol, en accord avec la langue du site.',
        },
        {
          question: 'Quelle est la précision de la reconnaissance ?',
          answer: 'Elle dépend de la qualité de l’image. Les images nettes, bien éclairées et droites contenant un texte lisible donnent les meilleurs résultats.',
        },
      ],
    },
    'sha-hash-generator': {
      name: 'Générateur d’empreinte SHA-256',
      description: 'Générez des empreintes SHA-256, SHA-384 et SHA-512 pour du texte et des fichiers.',
      longDescription: 'Hachez du texte ou des fichiers avec la famille SHA-2 (SHA-256, SHA-384 et SHA-512) via le chiffrement intégré de votre navigateur. Hors ligne et instantané.',
      keywords: ['sha256', 'sha-256', 'générateur d’empreinte', 'sha512', 'somme de contrôle', 'empreinte de fichier'],
      seoTitle: 'Générateur SHA-256 — hacher texte et fichiers gratuitement',
      seoDescription:
        'Générez gratuitement des empreintes SHA-256, SHA-384 et SHA-512 pour du texte ou des fichiers. Fonctionne hors ligne dans votre navigateur grâce à WebCrypto.',
      content:
        'Calculez une empreinte cryptographique pour n’importe quel texte ou fichier avec les fonctions de hachage de la famille SHA-2. Choisissez SHA-256, SHA-384 ou SHA-512, saisissez un texte ou choisissez un fichier, et obtenez l’empreinte instantanément. Le hachage se fait entièrement sur votre appareil via l’API WebCrypto intégrée au navigateur, ce qui est idéal pour vérifier l’intégrité des fichiers ou comparer des sommes de contrôle sans téléverser vos données.',
      howToSteps: [
        'Choisissez un algorithme (SHA-256, SHA-384 ou SHA-512).',
        'Saisissez un texte ou téléversez un fichier à hacher.',
        'L’empreinte se met à jour instantanément.',
        'Copiez le résultat dans le presse-papiers.',
      ],
      faq: [
        {
          question: 'Le hachage est-il un chiffrement ?',
          answer: 'Non. Le hachage est une fonction à sens unique : il produit une empreinte de taille fixe de l’entrée, mais on ne peut pas retrouver l’entrée à partir de l’empreinte.',
        },
        {
          question: 'À quoi sert le hachage ?',
          answer: 'Les empreintes servent généralement à vérifier l’intégrité des fichiers (sommes de contrôle), à stocker les mots de passe de façon sûre et à détecter les données dupliquées.',
        },
      ],
    },
    'color-converter': {
      name: 'Convertisseur de couleurs',
      description: 'Convertissez les couleurs entre les formats HEX, RVB et TSL.',
      longDescription: 'Convertissez n’importe quelle couleur entre HEX, RVB et TSL, prévisualisez-la en direct et copiez le code au format souhaité.',
      keywords: ['convertisseur de couleurs', 'hex vers rvb', 'rvb vers hex', 'hsl', 'sélecteur de couleur', 'couleur css'],
      seoTitle: 'Convertisseur de couleurs — conversion HEX, RVB et TSL gratuite',
      seoDescription:
        'Convertissez gratuitement les couleurs entre HEX, RVB et TSL avec aperçu instantané et copie en un clic, le tout dans votre navigateur.',
      content:
        'Travailler avec les codes couleur en CSS, dans les outils de design et les logiciels d’image implique souvent de passer de l’HEX au RVB ou au TSL. Ce convertisseur prend n’importe quelle couleur saisie dans l’un des trois formats et affiche instantanément les valeurs équivalentes dans les autres, avec un aperçu en direct de la couleur. Modifiez n’importe quelle valeur et tous les champs se mettent à jour ensemble, pour toujours copier le code exact dont votre outil a besoin.',
      howToSteps: [
        'Choisissez une couleur avec le sélecteur ou saisissez une valeur HEX, RVB ou TSL.',
        'Les autres formats se mettent à jour instantanément.',
        'Utilisez l’aperçu en direct pour vérifier la couleur.',
        'Copiez le code au format souhaité.',
      ],
      faq: [
        {
          question: 'Qu’est-ce que le HSL ?',
          answer: 'HSL signifie Hue (teinte), Saturation et Lightness (luminosité). Un modèle colorimétrique qui décrit une couleur par sa position sur la roue chromatique, son intensité et sa clarté.',
        },
        {
          question: 'Y a-t-il une différence entre #FFF et #FFFFFF ?',
          answer: 'Non — les deux représentent le même blanc. Les codes HEX courts à 3 chiffres sont une abréviation de la forme complète à 6 chiffres.',
        },
      ],
    },
    'image-compressor': {
      name: 'Compresseur d’images',
      description: 'Réduisez la taille des images tout en conservant une excellente qualité.',
      longDescription: 'Compressez les images JPG, PNG et WebP directement dans votre navigateur. Aucun envoi à un serveur — vos fichiers restent privés.',
      keywords: ['compresseur d’images', 'réduire la taille d’image', 'optimiser l’image', 'compresser jpg', 'compresser png'],
      seoTitle: 'Compresseur d’images — compresser JPG, PNG et WebP gratuitement',
      seoDescription:
        'Compressez gratuitement vos images en ligne. Réduisez la taille des fichiers JPG, PNG et WebP sans perte de qualité. Fonctionne entièrement dans le navigateur — vos fichiers ne sont pas envoyés.',
      content:
        'Les images volumineuses ralentissent les sites, consomment du stockage et prennent du temps à être envoyées. Le compresseur d’images réduit la taille des fichiers JPG, PNG et WebP tout en préservant la qualité visuelle, ce qui facilite le partage et la préparation des visuels pour le web. La compression se fait entièrement dans votre navigateur, donc aucune étape d’envoi et aucune limite sur le nombre d’images que vous pouvez traiter.',
      howToSteps: [
        'Importez votre image par glisser-déposer ou en cliquant sur la zone.',
        'Réglez le curseur de qualité pour contrôler la compression.',
        'Cliquez sur « Compresser l’image » pour traiter.',
        'Téléchargez votre image optimisée.',
      ],
      faq: [
        {
          question: 'La compression réduit-elle la qualité ?',
          answer:
            'La compression réduit la taille du fichier en supprimant les données redondantes. À des réglages de qualité élevés (70–90 %), la différence est quasiment invisible à l’œil nu.',
        },
        {
          question: 'Mes images sont-elles envoyées à un serveur ?',
          answer: 'Non. La compression est entièrement effectuée dans votre navigateur à l’aide du Canvas API. Vos fichiers ne quittent jamais votre appareil.',
        },
        {
          question: 'Quels formats sont pris en charge ?',
          answer: 'La compression prend en charge JPG/JPEG, PNG et WebP.',
        },
      ],
    },
    'image-resizer': {
      name: 'Redimensionneur d’images',
      description: 'Redimensionnez les images à n’importe quelle taille, avec contrôle du ratio.',
      longDescription: 'Redimensionnez les images JPG, PNG et WebP à des dimensions précises en pixels. Verrouillez le ratio ou utilisez des préréglages.',
      keywords: ['redimensionner image', 'dimensions image', 'taille image', 'dimensionner image', 'redimensionneur'],
      seoTitle: 'Redimensionneur d’images — redimensionner gratuitement',
      seoDescription:
        'Redimensionnez gratuitement vos images en ligne. Définissez la largeur et la hauteur exactes, verrouillez le ratio ou utilisez des préréglages. Fonctionne dans votre navigateur, sans envoi.',
      content:
        'Qu’il s’agisse d’une bannière aux dimensions précises ou d’une photo de profil au bon format, cet outil redimensionne vos images à des mesures exactes sans les déformer. Gardez le ratio verrouillé et modifiez une seule dimension, ou appliquez un préréglage tel que HD ou 720p. Le traitement a lieu sur votre appareil, vos images ne quittent donc jamais votre ordinateur.',
      howToSteps: [
        'Importez votre image.',
        'Saisissez la largeur et la hauteur souhaitées ou choisissez un préréglage.',
        'Activez « Verrouiller le ratio » si nécessaire.',
        'Cliquez sur « Redimensionner l’image » et téléchargez.',
      ],
      faq: [
        {
          question: 'Puis-je redimensionner sans déformer l’image ?',
          answer: 'Oui. Activez « Verrouiller le ratio » et modifiez une seule dimension — l’autre s’ajuste automatiquement.',
        },
        {
          question: 'Quels préréglages sont disponibles ?',
          answer: 'Les préréglages courants incluent 1920×1080 (HD), 1280×720 (720p), 800×600, 400×400 et les tailles de réseaux sociaux.',
        },
      ],
    },
    'image-converter': {
      name: 'Convertisseur d’images',
      description: 'Convertissez les images entre JPG, PNG et WebP.',
      longDescription: 'Convertissez entre les formats d’image courants : JPG vers PNG, PNG vers WebP, WebP vers JPG et plus — le tout dans le navigateur.',
      keywords: ['convertir image', 'jpg en png', 'png en webp', 'webp en jpg', 'convertisseur formats image'],
      seoTitle: 'Convertisseur d’images — convertir JPG, PNG et WebP gratuitement',
      seoDescription: 'Convertissez gratuitement vos images entre JPG, PNG et WebP. Conversion rapide et privée, entièrement dans le navigateur.',
      content:
        'Différents projets exigent différents formats. Ce convertisseur bascule entre JPG, PNG et WebP en quelques clics — par exemple pour convertir une capture WebP en PNG pour un éditeur qui ne la prend pas en charge, ou passer en WebP pour réduire la taille sur le web. La transparence est préservée en PNG et WebP, et tout se passe localement dans votre navigateur.',
      howToSteps: [
        'Importez votre image.',
        'Choisissez le format cible (JPG, PNG ou WebP).',
        'Réglez la qualité si vous convertissez en JPG.',
        'Cliquez sur « Convertir » et téléchargez.',
      ],
      faq: [
        {
          question: 'La conversion en WebP réduit-elle la taille ?',
          answer: 'Oui. Le WebP produit généralement des fichiers 25–35 % plus petits que le JPG à qualité visuelle égale, ce qui le rend idéal pour le web.',
        },
        {
          question: 'La transparence PNG est-elle conservée ?',
          answer: 'La transparence est conservée lors de la conversion vers PNG ou WebP. La conversion vers JPG remplit la transparence avec un fond blanc.',
        },
      ],
    },
    'image-cropper': {
      name: 'Recadreur d’images',
      description: 'Recadrez les images avec des ratios personnalisés ou prédéfinis.',
      longDescription: 'Recadrez précisément les images avec une zone de recadrage par glisser-déposer. Choisissez libre, carré, 16:9, 4:3 et autres ratios courants.',
      keywords: ['recadrer image', 'recadreur', 'couper image', 'cropper image', 'recadrage ratio'],
      seoTitle: 'Recadreur d’images — recadrer gratuitement',
      seoDescription: 'Recadrez gratuitement vos images en ligne. Choisissez des ratios prédéfinis ou recadrez librement. Rapide, dans le navigateur, sans logiciel.',
      content:
        'Recadrez vos images à la composition exacte souhaitée, qu’il s’agisse d’une photo de profil carrée, d’une bannière large ou d’un recadrage libre. Sélectionnez un ratio prédéfini comme 16:9 ou 4:3, ou faites glisser les poignées pour définir votre zone. Le fichier original n’est jamais modifié — vous ne téléchargez qu’une nouvelle copie recadrée, traitée localement sur votre appareil.',
      howToSteps: [
        'Importez votre image.',
        'Choisissez un ratio ou faites glisser pour définir une zone personnalisée.',
        'Ajustez la sélection de recadrage.',
        'Cliquez sur « Recadrer l’image » et téléchargez.',
      ],
      faq: [
        {
          question: 'Quels ratios sont disponibles ?',
          answer: 'Libre, carré (1:1), 16:9, 4:3 et 3:2 sont disponibles.',
        },
        {
          question: 'L’image originale est-elle modifiée ?',
          answer: 'Non. Le fichier original n’est jamais modifié. Une nouvelle copie recadrée est téléchargée.',
        },
      ],
    },
    'image-enhancer': {
      name: 'Améliorateur d’images',
      description: 'Améliorez la qualité des photos en réglant luminosité, contraste, saturation et netteté.',
      longDescription: 'Redonnez vie à vos photos ternes ou floues. Réglez luminosité, contraste, saturation et netteté avec un aperçu en direct, ou laissez « Amélioration auto » choisir les bons réglages en un clic. Tout se passe dans votre navigateur — vos photos ne quittent jamais votre appareil.',
      keywords: ['améliorer image', 'améliorateur photo', 'rendre photo nette', 'améliorer qualité photo', 'qualité image'],
      seoTitle: 'Améliorateur d’images — Améliorer la qualité des photos en ligne gratuitement',
      seoDescription: 'Améliorez la qualité des images en ligne gratuitement. Réglez luminosité, contraste, saturation et netteté ou améliorez automatiquement vos photos en un clic. 100 % dans le navigateur, sans envoi.',
      content: 'Besoin d’un coup de pouce avant de partager une photo ? Cet outil éclaircit les clichés sous-exposés, restaure les couleurs et affine les contours. Les curseurs offrent un contrôle précis avec un aperçu avant/après en direct, tandis que « Amélioration auto » applique un réglage équilibré en un clic. Tout se passe sur votre appareil : aucune image n’est envoyée sur un serveur.',
      howToSteps: [
        'Importez votre image.',
        'Cliquez sur « Amélioration auto » ou ajustez les curseurs.',
        'Apercevez le résultat.',
        'Téléchargez l’image ou envoyez-la vers un autre outil.',
      ],
      faq: [
        {
          question: 'L’amélioration réduit-elle la qualité de l’image ?',
          answer: 'Non. L’outil ajuste uniquement la luminosité, le contraste, la saturation et la netteté — il ne réduit jamais la résolution d’origine.',
        },
        {
          question: 'Mes photos sont-elles envoyées sur un serveur ?',
          answer: 'Jamais. Tout le traitement se fait dans votre navigateur, vos images restent donc sur votre appareil.',
        },
        {
          question: 'Puis-je envoyer le résultat vers un autre outil ?',
          answer: 'Oui. Après l’amélioration, utilisez le panneau « Continuer avec » pour envoyer le résultat au compresseur, au convertisseur, au redimensionneur, au suppresseur d’arrière-plan ou à l’OCR.',
        },
      ],
    },
    'pdf-merger': {
      name: 'Fusionneur de PDF',
      description: 'Fusionnez plusieurs PDF en un seul document.',
      longDescription: 'Importez plusieurs PDF, réorganisez-les par glisser-déposer puis fusionnez-les en un seul fichier — le tout dans votre navigateur avec pdf-lib.',
      keywords: ['fusionner pdf', 'fusion pdf', 'combiner pdf', 'fusionneur pdf', 'fusionner documents'],
      seoTitle: 'Fusionneur de PDF — fusionner des PDF gratuitement',
      seoDescription:
        'Fusionnez plusieurs PDF en un seul fichier gratuitement. Réorganisez les pages et combinez les documents. Fonctionne entièrement dans le navigateur — vos fichiers restent privés.',
      content:
        'Fusionnez plusieurs PDF en un seul document en quelques clics. Importez les fichiers, faites-les glisser dans l’ordre souhaité puis fusionnez-les — idéal pour regrouper des rapports, des numérisations ou des factures avant envoi ou archivage. La fusion a lieu localement avec pdf-lib, vos documents ne sont donc pas envoyés à un serveur.',
      howToSteps: [
        'Importez deux PDF ou plus.',
        'Faites glisser pour réorganiser si nécessaire.',
        'Cliquez sur « Fusionner les PDF ».',
        'Téléchargez le PDF fusionné.',
      ],
      faq: [
        {
          question: 'Combien de PDF puis-je fusionner ?',
          answer: 'Aucune limite stricte. Pour les très gros fichiers, la fusion peut prendre quelques secondes selon votre appareil.',
        },
        {
          question: 'Mes PDF sont-ils envoyés à un serveur ?',
          answer: 'Non. La fusion se fait entièrement localement dans votre navigateur. Vos fichiers ne sont envoyés nulle part.',
        },
      ],
    },
    'pdf-splitter': {
      name: 'Fractionneur de PDF',
      description: 'Fractionnez un PDF en pages séparées ou extrayez des pages précises.',
      longDescription: 'Importez un PDF et extrayez des pages individuelles, une plage de pages, ou fractionnez le document en parties égales.',
      keywords: ['fractionner pdf', 'extraire pages pdf', 'séparer pdf', 'fractionneur pdf'],
      seoTitle: 'Fractionneur de PDF — séparer et extraire des pages gratuitement',
      seoDescription: 'Fractionnez gratuitement vos PDF en ligne. Extrayez des pages précises ou séparez-les en fichiers. Rapide et dans le navigateur.',
      content:
        'Extrayez exactement les pages dont vous avez besoin d’un PDF plus volumineux. Séparez une page pour l’envoyer seule, choisissez une plage pour créer un nouveau document, ou fractionnez chaque page en fichiers séparés. Le traitement se fait dans votre navigateur, idéal pour les documents que vous préférez ne pas envoyer nulle part.',
      howToSteps: [
        'Importez votre PDF.',
        'Choisissez les pages à extraire ou « Fractionner toutes les pages ».',
        'Cliquez sur « Fractionner le PDF ».',
        'Téléchargez les fichiers résultants.',
      ],
      faq: [
        {
          question: 'Puis-je extraire seulement quelques pages ?',
          answer: 'Oui. Saisissez des numéros de pages précis ou une plage (ex. : 1-3, 5, 7-9) pour n’extraire que ces pages.',
        },
      ],
    },
    'pdf-compressor': {
      name: 'Compresseur de PDF',
      description: 'Réduisez la taille d’un PDF en supprimant les métadonnées et en optimisant les flux.',
      longDescription:
        'Réduisez la taille de votre PDF sur votre appareil en supprimant les métadonnées et en optimisant les flux internes. Pour une compression plus poussée, un backend peut être ajouté.',
      keywords: ['compresser pdf', 'réduire taille pdf', 'compresseur pdf', 'optimiser pdf', 'pdf plus petit'],
      seoTitle: 'Compresseur de PDF — compresser des PDF gratuitement',
      seoDescription: 'Compressez gratuitement vos PDF en ligne. Supprimez les métadonnées et réduisez immédiatement la taille dans votre navigateur, sans envoi.',
      content:
        'Réduisez un PDF avant de l’envoyer par e-mail ou de le téléverser sur un portail limité en taille. Cet outil supprime les métadonnées intégrées et optimise les flux internes pour réduire le volume tout en gardant les pages lisibles. Il fonctionne entièrement dans votre navigateur, vos documents sensibles ne sont donc envoyés nulle part.',
      howToSteps: [
        'Importez votre PDF.',
        'Choisissez le niveau de compression.',
        'Cliquez sur « Compresser le PDF ».',
        'Téléchargez le PDF optimisé.',
      ],
      faq: [
        {
          question: 'De combien puis-je compresser un PDF ?',
          answer:
            'La compression dans le navigateur supprime les métadonnées et optimise les flux, économisant généralement 5–30 %. Pour une compression maximale, un outil serveur est plus efficace.',
        },
      ],
      badge: 'Basique',
    },
    'pdf-to-images': {
      name: 'PDF vers images',
      description: 'Convertissez les pages d’un PDF en images PNG ou JPG.',
      longDescription: 'Rendez chaque page d’un PDF sous forme d’image PNG ou JPG haute qualité avec PDF.js. Téléchargez chaque page ou toutes ensemble.',
      keywords: ['pdf en image', 'pdf en png', 'pdf en jpg', 'convertir pages pdf', 'extraire images pdf'],
      seoTitle: 'PDF vers images — convertir des pages PDF en PNG/JPG gratuitement',
      seoDescription: 'Convertissez gratuitement des pages PDF en images PNG ou JPG. Téléchargez les pages individuellement ou toutes ensemble. Rapide et privé.',
      content:
        'Convertissez un PDF en une série d’images lorsque vous devez intégrer des pages dans une présentation, les publier ou prendre des aperçus rapides. Chaque page est rendue en image PNG ou JPG haute qualité, et vous pouvez télécharger les pages individuellement ou toutes ensemble dans une archive ZIP. Le rendu se fait localement dans votre navigateur avec PDF.js.',
      howToSteps: [
        'Importez votre PDF.',
        'Choisissez le format de sortie (PNG ou JPG) et la qualité.',
        'Cliquez sur « Convertir en images ».',
        'Téléchargez les pages individuellement ou toutes en ZIP.',
      ],
      faq: [
        {
          question: 'Quelle est la résolution des images exportées ?',
          answer: 'Les images sont rendues à l’échelle 1,5× par défaut, offrant une sortie nette et haute qualité depuis la plupart des PDF.',
        },
      ],
    },
    'word-counter': {
      name: 'Compteur de mots',
      description: 'Comptez les mots, caractères, phrases et estimez le temps de lecture.',
      longDescription: 'Collez ou tapez votre texte pour obtenir instantanément le nombre de mots, caractères, phrases, paragraphes et le temps de lecture estimé.',
      keywords: ['compteur de mots', 'compteur de caractères', 'compter mots', 'outil nombre de mots', 'temps de lecture'],
      seoTitle: 'Compteur de mots — compter mots et caractères gratuitement',
      seoDescription: 'Comptez gratuitement mots, caractères, phrases et paragraphes. Obtenez des estimations de temps de lecture instantanées, sans inscription.',
      content:
        'Suivez la longueur de votre écriture pendant que vous tapez. Collez ou tapez n’importe quel texte pour voir un décompte instantané des mots, caractères, phrases et paragraphes, ainsi qu’une estimation du temps de lecture. Idéal pour les blogs, articles, légendes sociales et tout endroit avec une limite de mots. Votre texte est analysé localement dans votre navigateur et n’est jamais stocké.',
      howToSteps: [
        'Collez ou tapez votre texte dans la zone.',
        'Voyez les statistiques en direct immédiatement.',
      ],
      faq: [
        {
          question: 'Comment le temps de lecture est-il calculé ?',
          answer: 'Le temps de lecture est estimé à 200 mots par minute, la vitesse moyenne de lecture d’un adulte.',
        },
        {
          question: 'Cet outil stocke-t-il mon texte ?',
          answer: 'Non. Tout est traité dans votre navigateur. Votre texte n’est envoyé nulle part.',
        },
      ],
    },
    'case-converter': {
      name: 'Convertisseur de casse',
      description: 'Convertissez le texte en majuscules, minuscules, casse titre, camelCase et plus.',
      longDescription:
        'Convertissez le texte entre 8 formes : majuscules, minuscules, casse titre, casse phrase, camelCase, PascalCase, snake_case et kebab-case.',
      keywords: ['convertisseur de casse', 'majuscules', 'minuscules', 'casse titre', 'camelcase', 'snake_case', 'kebab-case'],
      seoTitle: 'Convertisseur de casse — convertir la casse du texte gratuitement',
      seoDescription:
        'Convertissez le texte en majuscules, minuscules, casse titre, camelCase, snake_case et plus. Gratuit, instantané et dans le navigateur.',
      content:
        'Reformatez le texte sans le retaper. Basculez entre majuscules, minuscules, casse titre, casse phrase, camelCase, PascalCase, snake_case et kebab-case en un clic — pratique pour coller du texte entre éditeurs, écrire des identifiants de code ou préparer des titres. La conversion est instantanée et se fait entièrement dans votre navigateur.',
      howToSteps: [
        'Collez votre texte dans la zone de saisie.',
        'Cliquez sur la forme souhaitée.',
        'Copiez le résultat converti.',
      ],
      faq: [
        {
          question: 'Quelle différence entre camelCase et PascalCase ?',
          answer: 'camelCase commence par une minuscule (ex. « maVariable ») tandis que PascalCase commence par une majuscule (ex. « MaVariable »).',
        },
      ],
    },
    'remove-duplicate-lines': {
      name: 'Supprimer les lignes en double',
      description: 'Supprimez les lignes en double du texte avec des options de tri et de filtrage.',
      longDescription:
        'Collez une liste de lignes et supprimez instantanément les doublons. Options : conserver la première ou dernière occurrence, tri alphabétique et suppression des lignes vides.',
      keywords: ['supprimer doublons', 'lignes uniques', 'dédupliquer texte', 'supprimer lignes en double'],
      seoTitle: 'Supprimer les lignes en double — dédupliquer du texte',
      seoDescription:
        'Supprimez gratuitement les lignes en double du texte. Triez, conservez la première ou dernière occurrence et supprimez les lignes vides. Traitement instantané dans le navigateur.',
      content:
        'Nettoyez les listes, exportations CSV et données collées en supprimant les lignes répétées. Choisissez de conserver la première ou la dernière occurrence de chaque élément, triez le résultat par ordre alphabétique et supprimez les lignes vides. L’outil fonctionne instantanément dans votre navigateur — même les grandes listes sont traitées localement, sans envoi.',
      howToSteps: [
        'Collez votre texte ou votre liste dans la zone de saisie.',
        'Choisissez les options de déduplication.',
        'Cliquez sur « Supprimer les doublons ».',
        'Copiez ou téléchargez le résultat.',
      ],
      faq: [
        {
          question: 'La comparaison est-elle sensible à la casse ?',
          answer: 'Oui par défaut. Des lignes avec des casses différentes sont considérées comme différentes. Une option insensible à la casse est également disponible.',
        },
      ],
    },
    'text-cleaner': {
      name: 'Nettoyeur de texte',
      description: 'Nettoyez et corrigez le texte en supprimant espaces multiples, lignes vides et plus.',
      longDescription:
        'Nettoyez rapidement le texte collé en supprimant les espaces multiples, les lignes vides, les doublons et en normalisant les sauts de ligne.',
      keywords: ['nettoyeur de texte', 'nettoyer texte', 'supprimer espaces multiples', 'normaliser texte', 'formateur texte'],
      seoTitle: 'Nettoyeur de texte — nettoyer et formater le texte gratuitement',
      seoDescription: 'Nettoyez gratuitement votre texte. Supprimez espaces multiples, lignes vides, doublons et normalisez les sauts de ligne instantanément.',
      content:
        'Triez le texte copié depuis des e-mails, documents ou PDF qui arrive avec des sauts de ligne aléatoires et des doubles espaces. Supprimez les espaces multiples, éliminez les lignes vides, retirez les lignes en double et normalisez les fins de ligne selon un style cohérent. Tout est traité localement dans votre navigateur pour un nettoyage rapide et privé.',
      howToSteps: [
        'Collez votre texte dans la zone de saisie.',
        'Choisissez les options de nettoyage.',
        'Cliquez sur « Nettoyer le texte ».',
        'Copiez ou téléchargez le texte nettoyé.',
      ],
      faq: [
        {
          question: 'Que fait « Normaliser les sauts de ligne » ?',
          answer: 'Il convertit les fins de ligne Windows (\\r\\n) et Mac ancien (\\r) en fins de ligne Unix standard (\\n).',
        },
      ],
    },
    'json-formatter': {
      name: 'Formateur JSON',
      description: 'Formatez, minifiez et validez le JSON avec mise en évidence de la syntaxe.',
      longDescription:
        'Collez du JSON pour le formater avec une indentation correcte, le minifier pour la production ou le valider pour détecter les erreurs avec des indications de numéro de ligne.',
      keywords: ['formateur json', 'validateur json', 'minifieur json', 'formater json', 'pretty json'],
      seoTitle: 'Formateur et validateur JSON — formater le JSON gratuitement',
      seoDescription:
        'Formatez, minifiez et validez le JSON gratuitement. Obtenez des messages d’erreur instantanés avec les numéros de ligne. Outils JSON rapides dans le navigateur.',
      content:
        'Un compagnon quotidien pour travailler avec JSON. Embellissez les réponses désordonnées avec une indentation correcte, minifiez le JSON pour le stockage ou le transport, et validez-le pour détecter les erreurs de syntaxe avec des indications claires de numéro de ligne. L’outil gère des fichiers de plusieurs mégaoctets entièrement dans votre navigateur, sans limite de collage de gros payloads.',
      howToSteps: [
        'Collez votre JSON dans la zone de saisie.',
        'Cliquez sur « Formater » pour embellir ou « Minifier » pour compresser.',
        'Les erreurs sont mises en évidence avec les numéros de ligne.',
        'Copiez ou téléchargez le résultat.',
      ],
      faq: [
        {
          question: 'Cet outil gère-t-il les gros fichiers JSON ?',
          answer: 'Oui. L’outil fonctionne entièrement dans le navigateur et peut traiter des fichiers JSON de plusieurs mégaoctets sans problème.',
        },
      ],
    },
    'base64-tool': {
      name: 'Encodeur/décodeur Base64',
      description: 'Encodez du texte en Base64 ou décodez du Base64 en texte.',
      longDescription: 'Convertissez le texte brut en chaînes Base64 et décodez-les en texte lisible. Fonctionne entièrement sur votre appareil — rien n’est envoyé.',
      keywords: ['encodeur base64', 'décodeur base64', 'encoder base64', 'décoder base64', 'convertir base64'],
      seoTitle: 'Encodeur/décodeur Base64 — encoder et décoder en Base64',
      seoDescription: 'Encodez du texte en Base64 ou décodez des chaînes gratuitement. Convertisseur Base64 instantané, privé et dans le navigateur.',
      content:
        'Basculez entre le texte brut et le Base64 chaque fois que vous avez besoin d’une représentation de données sûre — intégrer des images dans HTML/CSS, passer des valeurs dans des URLs ou inspecter des jetons. Encodez et décodez instantanément sans étape d’envoi ; tout est traité localement dans votre navigateur.',
      howToSteps: [
        'Saisissez votre texte ou votre chaîne Base64.',
        'Cliquez sur « Encoder » ou « Décoder ».',
        'Copiez le résultat.',
      ],
      faq: [
        {
          question: 'À quoi sert le Base64 ?',
          answer:
            'Le Base64 est couramment utilisé pour encoder des données binaires en vue d’un transport textuel, comme intégrer des images dans HTML/CSS, encoder des jetons API ou passer des données dans des URLs.',
        },
      ],
    },
    'uuid-generator': {
      name: 'Générateur d’UUID',
      description: 'Générez des UUID v4 en volume.',
      longDescription: 'Générez instantanément un ou plusieurs UUID v4 aléatoires. Copiez les identifiants individuellement ou tous ensemble.',
      keywords: ['générateur uuid', 'uuid v4', 'générer uuid', 'identifiant unique', 'générateur guid'],
      seoTitle: 'Générateur d’UUID — générer des UUID v4 gratuitement',
      seoDescription: 'Générez gratuitement des UUID v4. Créez de 1 à 100 identifiants en une fois et copiez-les instantanément, sans inscription.',
      content:
        'Créez des identifiants uniques pour les clés de base de données, les données de test ou les jetons de session. Générez de 1 à 100 UUID v4 cryptographiquement sûrs en une fois, puis copiez-les individuellement ou tous ensemble. La génération utilise l’API crypto native du navigateur et ne quitte jamais votre appareil.',
      howToSteps: [
        'Choisissez le nombre d’UUID à générer.',
        'Cliquez sur « Générer ».',
        'Copiez les identifiants individuellement, ou cliquez sur « Copier » pour tout copier d’un coup.',
      ],
      faq: [
        {
          question: 'Qu’est-ce qu’un UUID v4 ?',
          answer:
            'Un UUID v4 est un identifiant de 128 bits généré de manière aléatoire. Son unicité est pratiquement garantie dans le temps et l’espace, ce qui le rend idéal pour les clés primaires de bases de données et les jetons de session.',
        },
        {
          question: 'Ces identifiants sont-ils vraiment aléatoires ?',
          answer: 'Oui. Ils sont générés avec l’API crypto.getRandomValues() du navigateur, qui est cryptographiquement sûre.',
        },
      ],
    },
    'jwt-decoder': {
      name: 'Décodeur JWT',
      description: 'Décodez et inspectez les jetons JWT — en-tête, payload et signature.',
      longDescription:
        'Collez un jeton JWT pour décoder et afficher les sections en-tête et payload. Le décodage n’est pas une vérification — il traite toujours sur votre appareil et n’est envoyé à aucun serveur.',
      keywords: ['décoder jwt', 'décodeur jwt', 'analyseur jwt', 'json web token', 'inspecteur jwt'],
      seoTitle: 'Décodeur JWT — décoder les jetons web JSON',
      seoDescription: 'Décodez les jetons web JSON en ligne. Inspectez les claims de l’en-tête et du payload. Fonctionne entièrement sur votre appareil — votre jeton n’est pas envoyé.',
      content:
        'Regardez à l’intérieur d’un jeton web JSON pour voir exactement ce qu’il contient. Collez un JWT et lisez instantanément les claims de son en-tête et de son payload, pratique pour déboguer des flux d’authentification ou vérifier les données associées au jeton. Le décodage se fait entièrement dans votre navigateur — votre jeton ne quitte jamais votre appareil et les signatures ne sont jamais touchées.',
      howToSteps: [
        'Collez le JWT dans le champ de saisie.',
        'L’en-tête et le payload du jeton sont décodés et affichés instantanément.',
      ],
      faq: [
        {
          question: 'Mon JWT est-il envoyé à un serveur ?',
          answer: 'Jamais. Le jeton est décodé entièrement dans votre navigateur avec JavaScript. Il ne quitte jamais votre appareil.',
        },
        {
          question: 'Cet outil vérifie-t-il la signature du JWT ?',
          answer: 'Non. Le décodage ne lit que l’en-tête et le payload. La vérification de la signature nécessite la clé secrète, qui ne devrait jamais être partagée avec un outil.',
        },
      ],
    },
    'percentage-calculator': {
      name: 'Calculatrice de pourcentage',
      description: 'Calculez des pourcentages, le pourcentage d’un nombre et la variation en pourcentage.',
      longDescription: 'Trois modes : quel est X % de Y, X est quel % de Y, et le pourcentage d’augmentation/diminution entre deux valeurs.',
      keywords: ['calculatrice pourcentage', 'pourcentage d’un nombre', 'augmentation pourcentage', 'variation pourcentage', 'calculer pourcentage'],
      seoTitle: 'Calculatrice de pourcentage — calculer des pourcentages gratuitement',
      seoDescription: 'Calculez gratuitement des pourcentages. Trouvez le pourcentage d’un nombre, la variation en pourcentage et plus. Résultats instantanés, sans inscription.',
      content:
        'Calculez rapidement des pourcentages pour vos budgets, notes, taxes ou réductions. Utilisez l’un des trois modes — la valeur d’un pourcentage d’un nombre, le pourcentage qu’un nombre représente d’un autre, ou la variation en pourcentage entre deux valeurs — et obtenez un résultat précis immédiatement.',
      howToSteps: [
        'Choisissez le mode de calcul.',
        'Saisissez les valeurs.',
        'Voyez le résultat immédiatement.',
      ],
      faq: [
        {
          question: 'Comment calculer une augmentation en pourcentage ?',
          answer: 'Utilisez le mode « Variation en pourcentage ». Saisissez l’ancienne et la nouvelle valeur et l’outil affichera exactement l’augmentation ou la diminution en pourcentage.',
        },
      ],
    },
    'age-calculator': {
      name: 'Calculatrice d’âge',
      description: 'Calculez l’âge exact à partir de la date de naissance, en années, mois et jours.',
      longDescription: 'Saisissez la date de naissance et obtenez l’âge exact en années, mois et jours, ainsi que le nombre total de jours.',
      keywords: ['calculatrice d’âge', 'calculer âge', 'calculatrice date de naissance', 'quel âge ai-je', 'calculatrice anniversaire'],
      seoTitle: 'Calculatrice d’âge — calculez votre âge exact',
      seoDescription: 'Calculez votre âge exact à partir de votre date de naissance. Obtenez années, mois, jours et jours totaux. Gratuit.',
      content:
        'Sachez exactement quel âge vous avez — ou quelqu’un d’autre — jusqu’à aujourd’hui. Saisissez une date de naissance et obtenez l’âge en années, mois et jours, avec le nombre total de jours. Le calcul prend en compte les années bissextiles et la longueur des mois pour un résultat précis.',
      howToSteps: [
        'Saisissez votre date de naissance.',
        'Voyez votre âge exact immédiatement.',
      ],
      faq: [
        {
          question: 'Le calcul de l’âge est-il précis ?',
          answer: 'Le calcul prend en compte les années bissextiles et le nombre exact de jours de chaque mois, pour un résultat précis.',
        },
      ],
    },
    'discount-calculator': {
      name: 'Calculatrice de réduction',
      description: 'Calculez le prix final après une réduction en pourcentage.',
      longDescription: 'Saisissez le prix original et le pourcentage de réduction pour voir immédiatement le montant économisé et le prix final.',
      keywords: ['calculatrice de réduction', 'calculatrice prix soldé', 'calculatrice remise', 'prix après réduction'],
      seoTitle: 'Calculatrice de réduction — calculez le prix soldé',
      seoDescription: 'Calculez le prix final après une réduction. Saisissez le prix original et le pourcentage pour voir combien vous économisez.',
      content:
        'Sachez exactement combien coûte une offre. Saisissez le prix original et le pourcentage de réduction pour obtenir instantanément le montant économisé et le prix final que vous payez — pratique pour comparer les offres, cumuler des réductions ou tarifer vos produits.',
      howToSteps: [
        'Saisissez le prix original.',
        'Saisissez le pourcentage de réduction.',
        'Voyez le montant économisé et le prix final immédiatement.',
      ],
      faq: [
        {
          question: 'Puis-je calculer plusieurs réductions ?',
          answer: 'Oui. Appliquez la première réduction pour obtenir un nouveau prix, puis utilisez-le comme prix original pour une seconde réduction.',
        },
      ],
    },
    'qr-code-generator': {
      name: 'Générateur de QR code',
      description: 'Créez des QR codes pour URLs, texte, e-mails et Wi-Fi.',
      longDescription:
        'Générez des QR codes pour n’importe quelle URL, texte, e-mail ou réseau Wi-Fi. Personnalisez la taille et le niveau de correction d’erreur. Téléchargez en PNG.',
      keywords: ['générateur qr code', 'créer qr code', 'fabriquer qr code', 'qr code gratuit', 'qr code url'],
      seoTitle: 'Générateur de QR code — créer des QR codes gratuitement',
      seoDescription: 'Créez gratuitement des QR codes. Générez des codes pour URLs, texte, e-mails et Wi-Fi et téléchargez-les en PNG, sans inscription.',
      content:
        'Transformez une URL, un message, un e-mail ou une connexion Wi-Fi en QR code scannable en quelques secondes. Choisissez le type de contenu, définissez la taille et le niveau de correction d’erreur, puis téléchargez un PNG net prêt pour l’impression ou l’écran. La génération se fait localement dans votre navigateur, sans compte ni envoi.',
      howToSteps: [
        'Choisissez le type (URL, texte, e-mail ou Wi-Fi).',
        'Saisissez le contenu.',
        'Personnalisez la taille et la correction d’erreur.',
        'Téléchargez le QR code en PNG.',
      ],
      faq: [
        {
          question: 'Qu’est-ce que la correction d’erreur dans un QR code ?',
          answer:
            'La correction d’erreur permet de lire un QR code même s’il est partiellement endommagé ou masqué. Des niveaux plus élevés offrent plus de robustesse mais produisent un code plus dense.',
        },
        {
          question: 'Combien de caractères un QR code peut-il contenir ?',
          answer: 'Un QR code peut contenir jusqu’à environ 4 296 caractères alphanumériques au niveau de correction d’erreur le plus bas.',
        },
      ],
    },
  },
  categoriesContent: {
    image: {
      name: 'Outils d’image',
      description: 'Compressez, redimensionnez, convertissez et recadrez des images directement dans votre navigateur.',
      seoTitle: 'Outils d’image — compresser, redimensionner, convertir et recadrer',
      seoDescription:
        'Outils d’image gratuits pour compresser, redimensionner, convertir et recadrer photos et graphiques. Tout fonctionne dans votre navigateur — sans envoi ni inscription.',
      longDescription:
        'Tout ce qu’il faut pour préparer des images pour le web, au même endroit. Réduisez une image avant de la partager, redimensionnez-la à des dimensions précises en pixels, basculez entre JPG, PNG et WebP, ou recadrez au ratio parfait pour un post social. Chaque outil d’image fonctionne entièrement dans votre navigateur, vos fichiers restent donc sur votre appareil.',
      keywords: ['outils image', 'compresser image', 'redimensionner image', 'recadrer image', 'convertir image'],
    },
    pdf: {
      name: 'Outils PDF',
      description: 'Fusionnez, fractionnez, compressez et convertissez des PDF en toute simplicité.',
      seoTitle: 'Outils PDF — fusionner, fractionner et compresser des PDF',
      seoDescription:
        'Outils PDF gratuits pour fusionner, fractionner, compresser et convertir des PDF. Le traitement dans le navigateur garde vos documents privés et sûrs.',
      longDescription:
        'Manipulez vos documents PDF sans installer de logiciel bureautique. Fusionnez plusieurs PDF en un seul, extrayez les pages dont vous avez besoin, réduisez la taille du fichier ou convertissez des pages en images. Le traitement se fait localement dans votre navigateur, vos documents confidentiels ne quittent donc jamais votre appareil.',
      keywords: ['outils pdf', 'fusionner pdf', 'fractionner pdf', 'compresser pdf', 'pdf en image'],
    },
    text: {
      name: 'Outils texte',
      description: 'Comptez des mots, convertissez la casse, nettoyez et transformez le texte instantanément.',
      seoTitle: 'Outils texte — compteur de mots, convertisseur de casse et nettoyeur',
      seoDescription:
        'Outils texte gratuits pour compter les mots, convertir la casse, nettoyer le formatage et supprimer les lignes en double. Instantanés, dans le navigateur et privés.',
      longDescription:
        'Des outils rapides pour quiconque écrit. Comptez les mots et les caractères pendant que vous tapez, basculez entre majuscules, minuscules et casse titre, retirez les espaces désordonnés et dédupliquez les listes en un clic. Ce que vous collez ne quitte jamais votre navigateur.',
      keywords: ['outils texte', 'compteur de mots', 'convertisseur de casse', 'nettoyeur texte', 'supprimer lignes en double'],
    },
    developer: {
      name: 'Outils développeurs',
      description: 'Formatez du JSON, encodez du Base64, générez des UUID et décodez des JWT.',
      seoTitle: 'Outils développeurs — formateur JSON, Base64, UUID et JWT',
      seoDescription:
        'Outils développeurs gratuits pour formater le JSON, encoder le Base64, générer des UUID et décoder des JWT. Outils rapides dans le navigateur pour les développeurs.',
      longDescription:
        'De petits outils qui font gagner du temps aux développeurs. Formatez et validez du JSON, encodez et décodez du Base64, générez des UUID cryptographiquement sûrs et inspectez des payloads JWT. Chaque outil fonctionne localement dans votre navigateur — les jetons et données sensibles ne sont donc jamais envoyés.',
      keywords: ['outils développeurs', 'formateur json', 'encodeur base64', 'générateur uuid', 'décodeur jwt'],
    },
    calculator: {
      name: 'Calculatrices',
      description: 'Des calculatrices rapides et précises pour les calculs quotidiens.',
      seoTitle: 'Calculatrices gratuites — pourcentages, âge et réductions',
      seoDescription: 'Calculatrices gratuites pour les pourcentages, l’âge et les réductions. Obtenez des résultats précis immédiatement dans votre navigateur.',
      longDescription:
        'Des calculatrices utiles pour les décisions quotidiennes. Calculez le pourcentage d’un nombre, connaissez votre âge exact jusqu’à aujourd’hui, ou voyez combien une réduction vous fait réellement économiser. Des résultats précis et instantanés, sans inscription ni publicités intrusives.',
      keywords: ['calculatrice', 'calculatrice pourcentage', 'calculatrice d’âge', 'calculatrice de réduction'],
    },
    converter: {
      name: 'Convertisseurs',
      description: 'Convertissez entre formats, unités et plus.',
      seoTitle: 'Convertisseurs — convertisseurs de formats et d’unités',
      seoDescription:
        'Convertisseurs gratuits pour basculer entre formats et unités. De nouveaux convertisseurs sont ajoutés régulièrement — revenez bientôt.',
      longDescription:
        'Une collection grandissante de convertisseurs pour basculer entre formats et unités. Cette catégorie est en constante expansion et de nouveaux convertisseurs sont ajoutés régulièrement — revenez bientôt pour trouver l’outil de conversion dont vous avez besoin.',
      keywords: ['convertisseur', 'convertisseur de formats', 'convertisseur d’unités'],
    },
    qr: {
      name: 'QR code',
      description: 'Créez des QR codes pour URLs, texte, e-mails et Wi-Fi.',
      seoTitle: 'Outils QR code — générateur de QR code gratuit',
      seoDescription: 'Créez gratuitement des QR codes. Générez des codes pour URLs, texte, e-mail et Wi-Fi et téléchargez-les en PNG haute qualité.',
      longDescription:
        'Créez des QR codes scannables en quelques secondes. Encodez une URL, du texte brut, un e-mail ou un réseau Wi-Fi, choisissez votre taille et votre niveau de correction d’erreur, et téléchargez un PNG net. La génération se fait localement dans votre navigateur — sans compte.',
      keywords: ['générateur qr code', 'créer qr code', 'fabriquer qr code'],
    },
    ai: {
      name: 'Outils IA',
      description: 'Des outils intelligents propulsés par l’IA — bientôt disponibles.',
      seoTitle: 'Outils IA — outils intelligents dans le navigateur (bientôt)',
      seoDescription:
        'Bientôt : des outils intelligents propulsés par l’IA sur Toollora. Restez à l’écoute pendant que nous ajoutons des outils utiles et respectueux de la vie privée.',
      longDescription:
        'Des outils propulsés par l’IA sont en préparation. Nous construisons des outils intelligents qui respectent l’approche « confidentialité d’abord » de Toollora — utiles, rapides et faciles à utiliser. Cette catégorie arrive bientôt, revenez voir les nouveautés.',
      keywords: ['outils ia', 'outils intelligence artificielle'],
    },
  },
  supportedLocales: [...locales],
};

export default dict;