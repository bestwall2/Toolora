import type { Dictionary } from '../types';
import { locales } from '../config';

const dict: Dictionary = {
  meta: {
    defaultTitle: 'Toollora — herramientas gratuitas en línea para el día a día',
    defaultDescription:
      'Herramientas en línea gratuitas y potentes para PDF, imágenes, texto, desarrolladores y más. Rápidas, simples y gratis, sin registro.',
    keywords: ['herramientas gratuitas', 'herramientas pdf', 'herramientas imágenes', 'herramientas texto', 'herramientas desarrolladores', 'toollora'],
  },
  nav: {
    allTools: 'Todas las herramientas',
    images: 'Imágenes',
    pdf: 'PDF',
    devTools: 'Herramientas para desarrolladores',
    searchTools: 'Buscar herramientas',
    search: 'Buscar',
    searchPlaceholder: 'Buscar herramientas…',
    toggleTheme: 'Cambiar tema',
    toggleMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  langSwitcher: {
    label: 'Idioma',
    changeLanguage: 'Cambiar idioma',
  },
  footer: {
    tagline: 'Herramientas gratuitas, rápidas y privadas para tareas cotidianas. Sin registro.',
    toolsTitle: 'Herramientas',
    popularTitle: 'Populares',
    companyTitle: 'Empresa',
    allTools: 'Todas las herramientas',
    imageTools: 'Herramientas de imagen',
    pdfTools: 'Herramientas PDF',
    textTools: 'Herramientas de texto',
    developerTools: 'Herramientas para desarrolladores',
    calculators: 'Calculadoras',
    about: 'Acerca de',
    contact: 'Contacto',
    privacy: 'Privacidad',
    terms: 'Términos',
    sitemap: 'Mapa del sitio',
    rights: 'Todos los derechos reservados.',
    madeWith: 'Hecho con cuidado para la web.',
    browserProcessed: 'Procesamiento en el navegador: tus archivos permanecen privados.',
  },
  common: {
    download: 'Descargar',
    copy: 'Copiar',
    copied: '¡Copiado!',
    clear: 'Limpiar',
    change: 'Cambiar',
    close: 'Cerrar',
    remove: 'Quitar',
    submit: 'Enviar',
    loading: 'Cargando…',
    processing: 'Procesando…',
    popular: 'Popular',
    useTool: 'Usar la herramienta',
    browse: 'Explorar',
    backToTools: 'Volver a todas las herramientas',
  },
  home: {
    heroTitle: 'Herramientas gratuitas en línea para el día a día',
    heroSubtitle:
      'Herramientas potentes para PDF, imágenes, texto, archivos, desarrolladores y más. Rápidas, simples y gratis, sin registro.',
    popular: 'Populares:',
    browseByCategory: 'Explorar por categoría',
    browseByCategoryDesc: 'Explora nuestro directorio, organizado por categorías.',
    popularTools: 'Herramientas populares',
    popularToolsDesc: 'Las herramientas más usadas en Toollora por desarrolladores, escritores y diseñadores.',
    whyChoose: '¿Por qué elegir Toollora?',
    whyChooseDesc: 'Diseñamos aplicaciones que respetan la privacidad del usuario y funcionan a máxima velocidad.',
    whyFeatures: [
      {
        title: 'Privacidad primero',
        desc: 'Los archivos se procesan íntegramente en tu navegador. Nunca enviamos tus archivos ni datos sensibles a nuestros servidores.',
      },
      {
        title: 'Sin registro',
        desc: 'Las herramientas gratuitas deben ser fáciles. Usa cualquier herramienta y descarga el resultado al instante, sin cuenta.',
      },
      {
        title: 'Pensado para móvil',
        desc: 'Del recorte de imágenes a la edición de documentos, diseñamos interfaces limpias que se adaptan perfectamente a pantallas pequeñas.',
      },
    ],
    faqTitle: 'Preguntas frecuentes',
    faqDesc: 'Consultas generales sobre las funciones y la arquitectura de Toollora.',
    faqs: [
      {
        question: '¿Todas las herramientas de Toollora son gratuitas?',
        answer:
          'Sí. Todas las herramientas son completamente gratuitas, sin cargos ocultos, sin registro y sin límites de uso para tareas estándar.',
      },
      {
        question: '¿Necesito crear una cuenta?',
        answer: 'No se requiere ninguna cuenta para las herramientas actuales. Abre la página de la herramienta, úsala y descarga el resultado.',
      },
      {
        question: '¿Se envían mis archivos a sus servidores?',
        answer:
          'Para todas las herramientas que funcionan en el navegador, tus archivos se procesan localmente y nunca se envían a ningún servidor. Marcamos claramente las herramientas que procesan datos localmente.',
      },
      {
        question: '¿Qué formatos de imagen se admiten?',
        answer: 'Toollora admite los formatos de imagen más comunes, incluidos JPG, PNG y WebP para las herramientas de imagen.',
      },
      {
        question: '¿Puedo usar Toollora en mi teléfono?',
        answer: 'Sí. Toollora es totalmente adaptable y funciona en todos los tamaños de pantalla, desde móviles pequeños hasta monitores grandes.',
      },
      {
        question: '¿Qué tan precisas son las calculadoras?',
        answer: 'Todas las calculadoras usan la aritmética de punto flotante estándar de JavaScript y producen resultados precisos para el uso diario.',
      },
      {
        question: '¿Qué navegadores se admiten?',
        answer:
          'Toollora funciona en todos los navegadores modernos, incluidos Chrome, Firefox, Safari y Edge. Algunas funciones avanzadas como el procesamiento de PDF requieren un navegador reciente.',
      },
      {
        question: '¿Añadirán más herramientas?',
        answer:
          'Sí. La plataforma está diseñada para crecer. Se añaden herramientas nuevas con regularidad. Si tienes una idea, contáctanos a través de la página de contacto.',
      },
    ],
  },
  toolsPage: {
    title: 'Todas las herramientas gratuitas en línea: el directorio completo',
    subtitle:
      'Explora el directorio completo de herramientas gratuitas de Toollora. Comprime imágenes, fusiona PDF, formatea JSON, genera códigos QR y más.',
    searchResults: 'Resultados de búsqueda para',
    showingResults: 'Mostrando',
    noResults: 'Ninguna herramienta coincide con',
    viewAllTools: 'Ver todas las herramientas',
    allTools: 'Todas las herramientas',
  },
  categoryPage: {
    viewAllTools: 'Ver todas las herramientas',
    emptyTitle: 'Las herramientas de esta categoría llegarán pronto.',
  },
  toolPage: {
    browserBased: 'Funciona en el navegador',
    about: 'Acerca de',
    howToUse: 'Cómo usar',
    faqTitle: 'Preguntas frecuentes',
    peopleAlsoUse: 'La gente también usa',
    home: 'Inicio',
    allTools: 'Todas las herramientas',
    notFoundTitle: 'Herramienta no encontrada',
    notFoundDesc: 'La herramienta que buscas no existe o quizás se movió.',
  },
  searchModal: {
    title: 'Buscar herramientas',
    placeholder: 'Buscar una herramienta…',
    noResults: 'Ninguna herramienta coincide con',
    tryDifferent: 'Intenta buscar por nombre de herramienta, categoría o palabra clave.',
    popularTools: 'Herramientas populares',
    navigate: 'Navegar',
    open: 'Abrir',
    close: 'Cerrar',
    esc: 'Esc',
  },
  aboutPage: {
    title: 'Acerca de Toollora',
    subtitle: 'Descubre por qué construimos herramientas web gratuitas en el navegador, para todos.',
    p1: 'Toollora nació de una necesidad simple: una caja de herramientas esencial que hace tareas cotidianas (comprimir imágenes, dividir PDF, codificar base64, validar JSON) sin obligarte a enviar tus datos sensibles a servidores lejanos ni soportar anuncios invasivos.',
    p2: 'La mayoría de los portales web envían tus archivos a servidores privados. En Toollora apostamos por el procesamiento en el navegador. Usamos interfaces WebAssembly modernas y el Canvas nativo para redimensionar, fusionar y limpiar tus archivos directamente en tu dispositivo.',
    features: [
      {
        title: 'Privacidad integrada',
        desc: 'Los archivos se procesan en el entorno aislado del navegador y nunca se envían a ningún servidor.',
      },
      {
        title: 'Ejecución instantánea',
        desc: 'Sin filas de espera. El procesamiento termina en una fracción de segundo con los recursos locales del dispositivo.',
      },
      {
        title: 'Gratis para siempre',
        desc: 'Sin suscripciones mensuales ni muros de pago para las herramientas esenciales. El procesamiento estándar de archivos sigue siendo totalmente gratuito.',
      },
    ],
  },
  contactPage: {
    title: 'Contáctanos',
    subtitle: '¿Comentarios, informe de errores o sugerencia de función? Envíanos un mensaje.',
    form: {
      name: 'Tu nombre',
      email: 'Tu correo electrónico',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      successTitle: '¡Mensaje enviado con éxito!',
      successDesc: 'Gracias por contactar a Toollora. Valoramos tus comentarios y te responderemos si es necesario.',
      sendAnother: 'Enviar otro mensaje',
      namePlaceholder: 'María García',
      emailPlaceholder: 'nombre@ejemplo.com',
      messagePlaceholder: '¿En qué podemos ayudarte?',
    },
  },
  privacyPage: {
    title: 'Política de privacidad',
    updated: 'Última actualización:',
    sections: [
      {
        heading: 'Resumen',
        body: [
          'Toollora se compromete a proteger tu privacidad. La mayoría de las herramientas procesan los archivos íntegramente en tu navegador, lo que significa que tus archivos nunca se envían a nuestros servidores, salvo que se indique expresamente.',
        ],
      },
      {
        heading: 'Datos que recopilamos',
        body: [
          'No pedimos una cuenta ni recopilamos información personal para usar las herramientas. Podemos recopilar estadísticas de uso anónimas y agregadas para mejorar la plataforma. Los archivos procesados por las herramientas del navegador nunca abandonan tu dispositivo.',
        ],
      },
      {
        heading: 'Procesamiento en el navegador',
        body: [
          'Las herramientas marcadas como «en el navegador» funcionan completamente en tu dispositivo con tecnologías como el Canvas API. Tus imágenes, PDF y textos permanecen locales y nunca se envían por la red.',
        ],
      },
      {
        heading: 'Cookies y almacenamiento',
        body: [
          'Usamos almacenamiento local para recordar preferencias como el tema y el idioma. Puedes borrar estos datos en cualquier momento desde la configuración de tu navegador.',
        ],
      },
      {
        heading: 'Servicios de terceros',
        body: [
          'No vendemos tus datos. Cualquier servicio de terceros que usemos (como analíticas) solo recibe información anónima y no identificable.',
        ],
      },
      {
        heading: 'Contacto',
        body: [
          'Si tienes preguntas sobre esta política, contáctanos a través de la página de contacto.',
        ],
      },
    ],
  },
  termsPage: {
    title: 'Términos de servicio',
    updated: 'Última actualización:',
    sections: [
      {
        heading: 'Aceptación de los términos',
        body: [
          'Al usar Toollora aceptas estos términos. Si no estás de acuerdo, no uses el sitio.',
        ],
      },
      {
        heading: 'Uso de las herramientas',
        body: [
          'Todas las herramientas están disponibles gratuitamente para fines legítimos. Puedes usarlas en proyectos personales o comerciales. No debes usarlas para procesar contenido ilegal, dañino o que infrinja los derechos de otros.',
        ],
      },
      {
        heading: 'Sin garantía',
        body: [
          'Las herramientas se proporcionan «tal cual», sin ninguna garantía. Si bien nos esforzamos por mantenerlas precisas y disponibles, no garantizamos la ausencia de errores ni una disponibilidad ininterrumpida.',
        ],
      },
      {
        heading: 'Responsabilidad',
        body: [
          'Toollora no será responsable de daños indirectos, incidentales o consecuentes derivados del uso de las herramientas.',
        ],
      },
      {
        heading: 'Cambios',
        body: [
          'Podemos actualizar estos términos de vez en cuando. El uso continuado del sitio tras los cambios constituye la aceptación de los términos revisados.',
        ],
      },
    ],
  },
  toolUi: {
    common: {
      dropHere: 'Suelta tu archivo aquí',
      orClickToBrowse: 'o haz clic para explorar',
      maxSize: 'Tamaño máximo',
      upload: 'Subir',
      download: 'Descargar',
      copy: 'Copiar',
      copied: '¡Copiado!',
      clear: 'Limpiar',
      change: 'Cambiar',
      processing: 'Procesando…',
      fileTooLarge: 'El archivo es demasiado grande.',
      invalidFile: 'Archivo no válido. Inténtalo de nuevo.',
      removeFile: 'Quitar archivo',
    },
    tools: {
      imageCompressor: {
        quality: 'Calidad',
        compress: 'Comprimir imagen',
        compressing: 'Comprimiendo…',
        compressed: 'comprimida',
        smaller: 'más pequeña',
        uploadLabel: 'Suelta tu imagen aquí',
        uploadSublabel: 'Admite JPG, PNG y WebP · Máx. 50 MB',
      },
      imageResizer: {
        presets: 'Preajustes',
        width: 'Ancho (px)',
        height: 'Alto (px)',
        outputFormat: 'Formato de salida',
        quality: 'Calidad',
        lockAspect: 'Bloquear relación de aspecto',
        original: 'Original',
        output: 'Salida',
        resize: 'Redimensionar imagen',
        resizing: 'Redimensionando…',
        changeImage: 'Cambiar imagen',
        uploadLabel: 'Suelta tu imagen aquí',
        uploadSublabel: 'Admite JPG, PNG y WebP · Máx. 50 MB',
      },
      imageConverter: {
        targetFormat: 'Formato de destino',
        quality: 'Calidad',
        convert: 'Convertir imagen',
        converting: 'Convirtiendo…',
        converted: 'Convertido a',
        successfully: 'con éxito',
        changeImage: 'Cambiar imagen',
        uploadLabel: 'Suelta tu imagen aquí',
        uploadSublabel: 'Admite JPG, PNG y WebP · Máx. 50 MB',
      },
      imageCropper: {
        crop: 'Recortar imagen',
        cropHint: 'Arrastra para ajustar el área de recorte',
        download: 'Descargar imagen recortada',
        changeImage: 'Cambiar imagen',
        uploadLabel: 'Suelta tu imagen aquí',
        uploadSublabel: 'Admite JPG, PNG y WebP · Máx. 50 MB',
      },
      pdfMerger: {
        addMore: 'Añadir más PDF',
        merge: 'Fusionar PDF',
        merging: 'Fusionando…',
        uploadLabel: 'Suelta tus PDF aquí',
        uploadSublabel: 'Varios PDF · Máx. 50 MB por archivo',
        remove: 'Quitar',
      },
      pdfSplitter: {
        pages: 'páginas',
        page: 'página',
        splitMode: 'Modo de división',
        splitAll: 'Dividir en páginas separadas',
        splitAllDesc: 'Crea',
        splitAllDesc2: 'archivos PDF separados',
        splitRange: 'Extraer páginas específicas',
        splitRangeDesc: 'Ej.: 1-3, 5, 7-9',
        splitEvery: 'Dividir cada N páginas',
        splitEveryDesc: 'Dividir en partes iguales',
        splitEveryLabel: 'Dividir cada',
        pagesUnit: 'páginas',
        split: 'Dividir PDF',
        splitting: 'Dividiendo…',
        success: '¡PDF dividido y descargado con éxito!',
        noValidPages: 'No hay páginas válidas en ese rango.',
        invalidPdf: 'No se pudo leer el PDF. Verifica que el archivo sea válido.',
        splitFailed: 'No se pudo dividir el PDF. Asegúrate de que el archivo sea válido.',
        uploadLabel: 'Suelta tu PDF aquí',
        uploadSublabel: 'Un solo PDF · Máx. 50 MB',
      },
      pdfCompressor: {
        compress: 'Comprimir PDF',
        compressing: 'Comprimiendo…',
        compressed: 'comprimido',
        smaller: 'más pequeño',
        invalidPdf: 'No se pudo leer el PDF. Verifica que el archivo sea válido.',
        compressFailed: 'No se pudo comprimir el PDF. Asegúrate de que el archivo sea válido.',
        uploadLabel: 'Suelta tu PDF aquí',
        uploadSublabel: 'Un solo PDF · Máx. 50 MB',
      },
      pdfToImages: {
        format: 'Formato de imagen',
        dpi: 'DPI',
        convert: 'Convertir PDF a imágenes',
        converting: 'Convirtiendo…',
        convertFailed: 'No se pudo convertir el PDF. Asegúrate de que el archivo sea válido.',
        uploadLabel: 'Suelta tu PDF aquí',
        uploadSublabel: 'Un solo PDF · Máx. 50 MB',
        page: 'Página',
      },
      wordCounter: {
        words: 'Palabras',
        characters: 'Caracteres',
        noSpaces: 'sin espacios',
        sentences: 'Oraciones',
        paragraphs: 'Párrafos',
        readingTime: 'Tiempo de lectura',
        minutes: 'min',
        topKeywords: 'Palabras clave más frecuentes',
        typeHint: 'Escribe arriba (palabras de 4 caracteres o más) para ver la densidad de palabras.',
        clearText: 'Limpiar texto',
        ariaLabel: 'Texto para contar',
        placeholder: 'Escribe o pega tu texto aquí para contar palabras y caracteres…',
      },
      caseConverter: {
        upper: 'MAYÚSCULAS',
        lower: 'minúsculas',
        titleCase: 'Tipo Título',
        sentenceCase: 'Tipo oración',
        camelCase: 'camelCase',
        pascalCase: 'PascalCase',
        snakeCase: 'snake_case',
        kebabCase: 'kebab-case',
        characters: 'caracteres',
        words: 'palabras',
        copyText: 'Copiar texto',
        clear: 'Limpiar',
        ariaLabel: 'Texto para convertir',
        placeholder: 'Pega tu texto aquí para convertirlo a diferentes formatos…',
      },
      removeDuplicateLines: {
        input: 'Texto de entrada',
        result: 'Resultado',
        optionsTitle: 'Opciones de deduplicación',
        mode: 'Modo de deduplicación',
        keepFirst: 'Conservar la primera aparición',
        keepLast: 'Conservar la última aparición',
        filtering: 'Filtrado y orden',
        caseSensitive: 'Comparación sensible a mayúsculas',
        removeEmptyLines: 'Eliminar líneas vacías',
        sortAlphabetically: 'Ordenar alfabéticamente',
        remove: 'Eliminar duplicados',
        copyResult: 'Copiar resultado',
        inputPlaceholder: 'Pega tu lista aquí. Un elemento por línea…',
        resultPlaceholder: 'El resultado aparecerá aquí…',
      },
      textCleaner: {
        input: 'Texto de entrada',
        cleaned: 'Texto limpio',
        optionsTitle: 'Opciones de limpieza',
        trimLines: 'Recortar líneas',
        trimLinesDesc: 'Eliminar espacios al principio y al final',
        extraSpaces: 'Eliminar espacios múltiples',
        extraSpacesDesc: 'Reemplazar varios espacios por uno solo',
        removeEmptyLines: 'Eliminar líneas vacías',
        removeEmptyLinesDesc: 'Eliminar líneas vacías por completo',
        removeDuplicates: 'Eliminar líneas duplicadas',
        removeDuplicatesDesc: 'Conservar solo líneas únicas',
        normalizeBreaks: 'Normalizar saltos de línea',
        normalizeBreaksDesc: 'Convertir CRLF a Unix LF',
        clean: 'Limpiar texto',
        copyResult: 'Copiar resultado',
        inputPlaceholder: 'Pega tu texto aquí para limpiarlo…',
        resultPlaceholder: 'El texto limpio aparecerá aquí…',
      },
      jsonFormatter: {
        input: 'Pega la entrada JSON',
        output: 'Salida',
        clear: 'Limpiar',
        copy: 'Copiar',
        download: 'Descargar',
        format: 'Formatear JSON',
        minify: 'Minificar JSON',
        errorTitle: 'Error de análisis JSON',
        errorNearLine: 'Error cerca de la línea:',
        outputPlaceholder: 'La salida JSON formateada aparecerá aquí…',
        inputPlaceholder: '{ "clave": "valor", "arreglo": [1, 2, 3] }',
      },
      base64Tool: {
        input: 'Entrada',
        output: 'Salida',
        encodeTitle: 'Texto a Base64',
        decodeTitle: 'Base64 a texto',
        swap: 'Alternar modo',
        encode: 'Codificar a Base64',
        decode: 'Decodificar Base64',
        copyResult: 'Copiar resultado',
        clear: 'Limpiar',
        encodeError: 'No se pudo codificar el texto de entrada.',
        decodeError: 'Cadena Base64 no válida. Verifica la entrada.',
        inputPlaceholderEncode: 'Escribe el texto plano aquí…',
        inputPlaceholderDecode: 'Escribe la cadena Base64 aquí…',
        outputPlaceholder: 'La salida aparecerá aquí…',
      },
      uuidGenerator: {
        title: 'Generador de UUID',
        generate: 'Generar',
        copy: 'Copiar',
        copied: '¡Copiado!',
        count: 'Cantidad de UUID',
        version: 'Versión',
        ariaLabel: 'UUID',
      },
      jwtDecoder: {
        privacyTitle: 'Privacidad y no verificación',
        privacyDesc:
          'La decodificación se realiza íntegramente en tu navegador. Los tokens nunca se envían a ningún servidor. Ten en cuenta que decodificar los claims no verifica la firma ni la expiración.',
        pasteToken: 'Pega un token JWT',
        header: 'Encabezado (algoritmo y tipo)',
        payload: 'Payload (claims)',
        invalidStructure:
          'Estructura JWT no válida. Un token debe tener tres partes separadas por puntos (header.payload.signature).',
        invalidClaims: 'No se pudieron analizar los claims del token. Verifica que el token sea un Base64Url válido.',
        tokenPlaceholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
      percentageCalculator: {
        of: 'X % de Y',
        is: 'X es qué % de Y',
        change: 'Aumento / disminución %',
        whatIs: '¿Qué es',
        percentOf: '% de',
        isWhatPercentOf: 'es qué porcentaje de',
        from: 'de',
        to: 'a',
        result: 'Resultado:',
        increase: 'Aumento',
        decrease: 'Disminución',
        xLabel: 'Valor X',
        yLabel: 'Valor Y',
        oldValue: 'Valor anterior',
        newValue: 'Valor nuevo',
      },
      ageCalculator: {
        selectDob: 'Selecciona la fecha de nacimiento',
        years: 'años',
        months: 'meses',
        days: 'días',
        totalDays: 'Días totales',
      },
      discountCalculator: {
        price: 'Precio original',
        discount: 'Descuento (%)',
        youSave: 'Ahorras',
        finalPrice: 'Precio final',
        pricePlaceholder: '0.00',
        discountPlaceholder: 'Ej.: 20',
      },
      qrGenerator: {
        url: 'URL',
        text: 'Texto',
        email: 'Correo',
        wifi: 'Wi-Fi',
        websiteUrl: 'URL del sitio',
        plainText: 'Texto plano',
        emailTo: 'Para',
        subject: 'Asunto',
        message: 'Mensaje',
        ssid: 'Nombre de la red',
        encryption: 'Tipo de cifrado',
        password: 'Contraseña',
        imageSize: 'Tamaño de imagen',
        errorCorrection: 'Corrección de errores',
        yourQr: 'Tu código QR',
        enterContent: 'Ingresa el contenido para la vista previa',
        download: 'Descargar código QR',
        urlPlaceholder: 'https://ejemplo.com',
        textPlaceholder: 'Escribe tu texto aquí…',
        emailPlaceholder: 'hola@ejemplo.com',
        subjectPlaceholder: 'Línea de asunto',
        messagePlaceholder: 'Escribe el contenido del correo aquí…',
        ssidPlaceholder: 'RedCasa',
        passwordPlaceholder: 'Contraseña de la red',
      },
    },
  },
  toolsContent: {
    'image-compressor': {
      name: 'Compresor de imágenes',
      description: 'Reduce el tamaño de las imágenes manteniendo una calidad excelente.',
      longDescription: 'Comprime imágenes JPG, PNG y WebP directamente en tu navegador. Sin envío a ningún servidor: tus archivos permanecen privados.',
      keywords: ['compresor de imágenes', 'reducir tamaño de imagen', 'optimizar imagen', 'comprimir jpg', 'comprimir png'],
      seoTitle: 'Compresor de imágenes: comprime JPG, PNG y WebP gratis',
      seoDescription:
        'Comprime tus imágenes gratis en línea. Reduce el tamaño de archivos JPG, PNG y WebP sin perder calidad. Funciona íntegramente en el navegador: tus archivos no se envían.',
      content:
        'Las imágenes grandes ralentizan los sitios, consumen almacenamiento y tardan en subirse. El compresor de imágenes reduce el tamaño de los archivos JPG, PNG y WebP mientras preserva la calidad visual, facilitando el compartir y preparar gráficos para la web. La compresión se realiza íntegramente en tu navegador, así que no hay paso de subida ni límite en el número de imágenes que puedes procesar.',
      howToSteps: [
        'Sube tu imagen arrastrándola o haciendo clic en el área.',
        'Ajusta el control deslizante de calidad para controlar la compresión.',
        'Haz clic en «Comprimir imagen» para procesar.',
        'Descarga tu imagen optimizada.',
      ],
      faq: [
        {
          question: '¿La compresión reduce la calidad?',
          answer:
            'La compresión reduce el tamaño del archivo eliminando datos redundantes. Con ajustes de calidad altos (70–90 %), la diferencia es casi invisible al ojo humano.',
        },
        {
          question: '¿Se envían mis imágenes a un servidor?',
          answer: 'No. La compresión se realiza íntegramente en tu navegador con el Canvas API. Tus archivos nunca abandonan tu dispositivo.',
        },
        {
          question: '¿Qué formatos se admiten?',
          answer: 'La compresión admite JPG/JPEG, PNG y WebP.',
        },
      ],
    },
    'image-resizer': {
      name: 'Redimensionador de imágenes',
      description: 'Redimensiona imágenes a cualquier tamaño con control de la relación de aspecto.',
      longDescription: 'Redimensiona imágenes JPG, PNG y WebP a dimensiones exactas en píxeles. Bloquea la relación de aspecto o usa preajustes.',
      keywords: ['redimensionar imagen', 'dimensiones de imagen', 'tamaño de imagen', 'escalar imagen', 'redimensionador'],
      seoTitle: 'Redimensionador de imágenes: redimensiona gratis',
      seoDescription:
        'Redimensiona tus imágenes gratis en línea. Define ancho y alto exactos, bloquea la relación de aspecto o usa preajustes. Funciona en tu navegador, sin subida.',
      content:
        'Ya sea un banner con dimensiones precisas o una foto de perfil con el tamaño correcto, esta herramienta redimensiona tus imágenes a medidas exactas sin distorsionarlas. Mantén la relación de aspecto bloqueada y cambia una sola dimensión, o aplica un preajuste como HD o 720p. El procesamiento ocurre en tu dispositivo, así que tus imágenes nunca abandonan tu computadora.',
      howToSteps: [
        'Sube tu imagen.',
        'Ingresa el ancho y alto deseados o elige un preajuste.',
        'Activa «Bloquear relación de aspecto» si es necesario.',
        'Haz clic en «Redimensionar imagen» y descarga.',
      ],
      faq: [
        {
          question: '¿Puedo redimensionar sin distorsionar la imagen?',
          answer: 'Sí. Activa «Bloquear relación de aspecto» y cambia una sola dimensión: la otra se ajusta automáticamente.',
        },
        {
          question: '¿Qué preajustes están disponibles?',
          answer: 'Los preajustes comunes incluyen 1920×1080 (HD), 1280×720 (720p), 800×600, 400×400 y tamaños de redes sociales.',
        },
      ],
    },
    'image-converter': {
      name: 'Conversor de imágenes',
      description: 'Convierte imágenes entre JPG, PNG y WebP.',
      longDescription: 'Convierte entre formatos de imagen comunes: JPG a PNG, PNG a WebP, WebP a JPG y más, todo en el navegador.',
      keywords: ['convertir imagen', 'jpg a png', 'png a webp', 'webp a jpg', 'conversor de formatos de imagen'],
      seoTitle: 'Conversor de imágenes: convierte JPG, PNG y WebP gratis',
      seoDescription: 'Convierte tus imágenes gratis entre JPG, PNG y WebP. Conversión rápida y privada, íntegramente en el navegador.',
      content:
        'Distintos proyectos exigen distintos formatos. Este conversor cambia entre JPG, PNG y WebP en pocos clics, por ejemplo para convertir una captura WebP a PNG para un editor que no la admite, o pasar a WebP para reducir el tamaño en la web. La transparencia se conserva en PNG y WebP, y todo ocurre localmente en tu navegador.',
      howToSteps: [
        'Sube tu imagen.',
        'Elige el formato de destino (JPG, PNG o WebP).',
        'Ajusta la calidad si conviertes a JPG.',
        'Haz clic en «Convertir» y descarga.',
      ],
      faq: [
        {
          question: '¿Convertir a WebP reduce el tamaño?',
          answer: 'Sí. WebP suele producir archivos 25–35 % más pequeños que JPG con la misma calidad visual, lo que lo hace ideal para la web.',
        },
        {
          question: '¿Se conserva la transparencia PNG?',
          answer: 'La transparencia se conserva al convertir a PNG o WebP. Convertir a JPG rellena la transparencia con fondo blanco.',
        },
      ],
    },
    'image-cropper': {
      name: 'Recortador de imágenes',
      description: 'Recorta imágenes con proporciones personalizadas o predefinidas.',
      longDescription: 'Recorta imágenes con precisión usando un área de recorte arrastrable. Elige libre, cuadrado, 16:9, 4:3 y otras proporciones comunes.',
      keywords: ['recortar imagen', 'recortador', 'cortar imagen', 'editar imagen', 'recorte proporción'],
      seoTitle: 'Recortador de imágenes: recorta gratis',
      seoDescription: 'Recorta tus imágenes gratis en línea. Elige proporciones predefinidas o recorta libremente. Rápido, en el navegador y sin software.',
      content:
        'Recorta tus imágenes a la composición exacta que quieras, ya sea una foto de perfil cuadrada, un encabezado ancho o un recorte libre. Selecciona una proporción predefinida como 16:9 o 4:3, o arrastra los tiradores para definir tu zona. El archivo original nunca se modifica: solo descargas una nueva copia recortada procesada localmente en tu dispositivo.',
      howToSteps: [
        'Sube tu imagen.',
        'Elige una proporción o arrastra para definir un área personalizada.',
        'Ajusta la selección de recorte.',
        'Haz clic en «Recortar imagen» y descarga.',
      ],
      faq: [
        {
          question: '¿Qué proporciones están disponibles?',
          answer: 'Libre, cuadrado (1:1), 16:9, 4:3 y 3:2 están disponibles.',
        },
        {
          question: '¿Se modifica la imagen original?',
          answer: 'No. El archivo original nunca se modifica. Se descarga una nueva copia recortada.',
        },
      ],
    },
    'pdf-merger': {
      name: 'Fusionador de PDF',
      description: 'Fusiona varios PDF en un solo documento.',
      longDescription: 'Sube varios PDF, reorganízalos arrastrando y luego fúndelos en un solo archivo, todo en tu navegador con pdf-lib.',
      keywords: ['fusionar pdf', 'unir pdf', 'combinar pdf', 'fusionador pdf', 'fusionar documentos'],
      seoTitle: 'Fusionador de PDF: fusiona PDF gratis',
      seoDescription:
        'Fusiona varios PDF en un solo archivo gratis. Reorganiza páginas y combina documentos. Funciona íntegramente en el navegador: tus archivos permanecen privados.',
      content:
        'Fusiona varios PDF en un solo documento en pocos clics. Sube los archivos, arrástralos al orden que quieras y fúndelos: ideal para agrupar informes, escaneos o facturas antes de enviarlos o archivarlos. La fusión ocurre localmente con pdf-lib, así que tus documentos no se envían a ningún servidor.',
      howToSteps: [
        'Sube dos o más PDF.',
        'Arrastra para reorganizar si es necesario.',
        'Haz clic en «Fusionar PDF».',
        'Descarga el PDF fusionado.',
      ],
      faq: [
        {
          question: '¿Cuántos PDF puedo fusionar?',
          answer: 'No hay límite estricto. Con archivos muy grandes, la fusión puede tardar unos segundos según tu dispositivo.',
        },
        {
          question: '¿Se envían mis PDF a un servidor?',
          answer: 'No. La fusión se realiza íntegramente localmente en tu navegador. Tus archivos no se envían a ningún lugar.',
        },
      ],
    },
    'pdf-splitter': {
      name: 'Divisor de PDF',
      description: 'Divide un PDF en páginas separadas o extrae páginas específicas.',
      longDescription: 'Sube un PDF y extrae páginas individuales, un rango de páginas o divide el documento en partes iguales.',
      keywords: ['dividir pdf', 'extraer páginas pdf', 'separar pdf', 'divisor pdf'],
      seoTitle: 'Divisor de PDF: separa y extrae páginas gratis',
      seoDescription: 'Divide tus PDF gratis en línea. Extrae páginas específicas o sepáralas en archivos. Rápido y en el navegador.',
      content:
        'Extrae exactamente las páginas que necesitas de un PDF más grande. Separa una página para enviarla sola, elige un rango para crear un documento nuevo o divide cada página en archivos separados. El procesamiento ocurre en tu navegador, ideal para documentos que prefieres no enviar a ningún lugar.',
      howToSteps: [
        'Sube tu PDF.',
        'Elige las páginas a extraer o «Dividir todas las páginas».',
        'Haz clic en «Dividir PDF».',
        'Descarga los archivos resultantes.',
      ],
      faq: [
        {
          question: '¿Puedo extraer solo algunas páginas?',
          answer: 'Sí. Ingresa números de página específicos o un rango (ej.: 1-3, 5, 7-9) para extraer solo esas páginas.',
        },
      ],
    },
    'pdf-compressor': {
      name: 'Compresor de PDF',
      description: 'Reduce el tamaño de un PDF eliminando metadatos y optimizando flujos.',
      longDescription:
        'Reduce el tamaño de tu PDF en tu dispositivo eliminando metadatos y optimizando los flujos internos. Para una compresión más profunda, se puede añadir un backend.',
      keywords: ['comprimir pdf', 'reducir tamaño pdf', 'compresor pdf', 'optimizar pdf', 'pdf más pequeño'],
      seoTitle: 'Compresor de PDF: comprime PDF gratis',
      seoDescription: 'Comprime tus PDF gratis en línea. Elimina metadatos y reduce el tamaño al instante en tu navegador, sin subida.',
      content:
        'Reduce el tamaño de un PDF antes de enviarlo por correo o subirlo a un portal con límite de tamaño. Esta herramienta elimina los metadatos incorporados y optimiza los flujos internos para reducir el volumen manteniendo las páginas legibles. Funciona íntegramente en tu navegador, así que los documentos sensibles no se envían a ningún lugar.',
      howToSteps: [
        'Sube tu PDF.',
        'Elige el nivel de compresión.',
        'Haz clic en «Comprimir PDF».',
        'Descarga el PDF optimizado.',
      ],
      faq: [
        {
          question: '¿Cuánto puedo comprimir un PDF?',
          answer:
            'La compresión en el navegador elimina metadatos y optimiza flujos, ahorrando normalmente 5–30 %. Para una compresión máxima, una herramienta de servidor es más eficaz.',
        },
      ],
      badge: 'Básico',
    },
    'pdf-to-images': {
      name: 'PDF a imágenes',
      description: 'Convierte páginas de PDF en imágenes PNG o JPG.',
      longDescription: 'Renderiza cada página de un PDF como imagen PNG o JPG de alta calidad con PDF.js. Descarga cada página o todas juntas.',
      keywords: ['pdf a imagen', 'pdf a png', 'pdf a jpg', 'convertir páginas pdf', 'extraer imágenes pdf'],
      seoTitle: 'PDF a imágenes: convierte páginas PDF a PNG/JPG gratis',
      seoDescription: 'Convierte páginas de PDF en imágenes PNG o JPG gratis. Descarga las páginas individualmente o todas juntas. Rápido y privado.',
      content:
        'Convierte un PDF en una serie de imágenes cuando necesites incrustar páginas en una presentación, publicarlas o tomar vistas previas rápidas. Cada página se renderiza como imagen PNG o JPG de alta calidad y puedes descargar las páginas individualmente o todas juntas en un archivo ZIP. El renderizado ocurre localmente en tu navegador con PDF.js.',
      howToSteps: [
        'Sube tu PDF.',
        'Elige el formato de salida (PNG o JPG) y la calidad.',
        'Haz clic en «Convertir a imágenes».',
        'Descarga las páginas individualmente o todas en ZIP.',
      ],
      faq: [
        {
          question: '¿Cuál es la resolución de las imágenes exportadas?',
          answer: 'Las imágenes se renderizan a escala 1.5× por defecto, ofreciendo una salida nítida y de alta calidad desde la mayoría de los PDF.',
        },
      ],
    },
    'word-counter': {
      name: 'Contador de palabras',
      description: 'Cuenta palabras, caracteres, oraciones y estima el tiempo de lectura.',
      longDescription: 'Pega o escribe tu texto para obtener al instante el número de palabras, caracteres, oraciones, párrafos y el tiempo de lectura estimado.',
      keywords: ['contador de palabras', 'contador de caracteres', 'contar palabras', 'herramienta número de palabras', 'tiempo de lectura'],
      seoTitle: 'Contador de palabras: cuenta palabras y caracteres gratis',
      seoDescription: 'Cuenta palabras, caracteres, oraciones y párrafos gratis. Obtén estimaciones de tiempo de lectura al instante, sin registro.',
      content:
        'Sigue la longitud de tu escritura mientras escribes. Pega o escribe cualquier texto para ver un conteo instantáneo de palabras, caracteres, oraciones y párrafos, junto con una estimación del tiempo de lectura. Ideal para blogs, artículos, leyendas sociales y cualquier lugar con un límite de palabras. Tu texto se analiza localmente en tu navegador y nunca se almacena.',
      howToSteps: [
        'Pega o escribe tu texto en el área.',
        'Mira las estadísticas en vivo al instante.',
      ],
      faq: [
        {
          question: '¿Cómo se calcula el tiempo de lectura?',
          answer: 'El tiempo de lectura se estima a 200 palabras por minuto, la velocidad promedio de lectura de un adulto.',
        },
        {
          question: '¿Esta herramienta almacena mi texto?',
          answer: 'No. Todo se procesa en tu navegador. Tu texto no se envía a ningún lugar.',
        },
      ],
    },
    'case-converter': {
      name: 'Conversor de mayúsculas/minúsculas',
      description: 'Convierte texto a MAYÚSCULAS, minúsculas, tipo título, camelCase y más.',
      longDescription:
        'Convierte texto entre 8 formatos: MAYÚSCULAS, minúsculas, tipo título, tipo oración, camelCase, PascalCase, snake_case y kebab-case.',
      keywords: ['conversor de mayúsculas', 'mayúsculas', 'minúsculas', 'tipo título', 'camelcase', 'snake_case', 'kebab-case'],
      seoTitle: 'Conversor de mayúsculas/minúsculas: convierte texto gratis',
      seoDescription:
        'Convierte texto a MAYÚSCULAS, minúsculas, tipo título, camelCase, snake_case y más. Gratis, instantáneo y en el navegador.',
      content:
        'Reformatea texto sin volver a escribirlo. Cambia entre mayúsculas, minúsculas, tipo título, tipo oración, camelCase, PascalCase, snake_case y kebab-case con un clic, útil al pegar texto entre editores, escribir identificadores de código o preparar títulos. La conversión es instantánea y ocurre íntegramente en tu navegador.',
      howToSteps: [
        'Pega tu texto en el área de entrada.',
        'Haz clic en el formato deseado.',
        'Copia el resultado convertido.',
      ],
      faq: [
        {
          question: '¿Cuál es la diferencia entre camelCase y PascalCase?',
          answer: 'camelCase empieza con minúscula (ej.: «miVariable») mientras que PascalCase empieza con mayúscula (ej.: «MiVariable»).',
        },
      ],
    },
    'remove-duplicate-lines': {
      name: 'Eliminar líneas duplicadas',
      description: 'Elimina líneas duplicadas del texto con opciones de orden y filtrado.',
      longDescription:
        'Pega una lista de líneas y elimina duplicados al instante. Opciones: conservar la primera o última aparición, orden alfabético y eliminar líneas vacías.',
      keywords: ['eliminar duplicados', 'líneas únicas', 'deduplicar texto', 'eliminar líneas duplicadas'],
      seoTitle: 'Eliminar líneas duplicadas: deduplica texto',
      seoDescription:
        'Elimina líneas duplicadas del texto gratis. Ordena, conserva la primera o última aparición y elimina líneas vacías. Procesamiento instantáneo en el navegador.',
      content:
        'Limpia listas, exportaciones CSV y datos pegados eliminando líneas repetidas. Elige conservar la primera o última aparición de cada elemento, ordena el resultado alfabéticamente y elimina las líneas vacías. La herramienta funciona al instante en tu navegador: incluso listas grandes se procesan localmente, sin subir nada.',
      howToSteps: [
        'Pega tu texto o lista en el área de entrada.',
        'Elige las opciones de deduplicación.',
        'Haz clic en «Eliminar duplicados».',
        'Copia o descarga el resultado.',
      ],
      faq: [
        {
          question: '¿La comparación distingue mayúsculas?',
          answer: 'Sí, por defecto. Líneas con mayúsculas distintas se consideran diferentes. También hay una opción sin distinción.',
        },
      ],
    },
    'text-cleaner': {
      name: 'Limpiador de texto',
      description: 'Limpia y corrige texto eliminando espacios múltiples, líneas vacías y más.',
      longDescription:
        'Limpia rápidamente texto pegado eliminando espacios múltiples, líneas vacías, duplicados y normalizando los saltos de línea.',
      keywords: ['limpiador de texto', 'limpiar texto', 'eliminar espacios múltiples', 'normalizar texto', 'formateador texto'],
      seoTitle: 'Limpiador de texto: limpia y formatea texto gratis',
      seoDescription: 'Limpia tu texto gratis. Elimina espacios múltiples, líneas vacías, duplicados y normaliza saltos de línea al instante.',
      content:
        'Ordena texto copiado de correos, documentos o PDF que llega con saltos de línea aleatorios y espacios dobles. Elimina espacios múltiples, suprime líneas vacías, retira líneas duplicadas y normaliza los finales de línea con un estilo consistente. Todo se procesa localmente en tu navegador para una limpieza rápida y privada.',
      howToSteps: [
        'Pega tu texto en el área de entrada.',
        'Elige las opciones de limpieza.',
        'Haz clic en «Limpiar texto».',
        'Copia o descarga el texto limpio.',
      ],
      faq: [
        {
          question: '¿Qué hace «Normalizar saltos de línea»?',
          answer: 'Convierte los finales de línea de Windows (\\r\\n) y Mac antiguo (\\r) al final de línea Unix estándar (\\n).',
        },
      ],
    },
    'json-formatter': {
      name: 'Formateador JSON',
      description: 'Formatea, minifica y valida JSON con resaltado de sintaxis.',
      longDescription:
        'Pega JSON para formatearlo con sangría adecuada, minificarlo para producción o validarlo para detectar errores con indicaciones de número de línea.',
      keywords: ['formateador json', 'validador json', 'minificador json', 'formatear json', 'json bonito'],
      seoTitle: 'Formateador y validador JSON: formatea JSON gratis',
      seoDescription:
        'Formatea, minifica y valida JSON gratis. Obtén mensajes de error instantáneos con números de línea. Herramientas JSON rápidas en el navegador.',
      content:
        'Un compañero diario para trabajar con JSON. Embellece respuestas desordenadas con sangría correcta, minifica JSON para almacenamiento o transporte y valídalo para detectar errores de sintaxis con indicaciones claras de número de línea. La herramienta maneja archivos de varios megabytes íntegramente en tu navegador, sin límites para pegar payloads grandes.',
      howToSteps: [
        'Pega tu JSON en el área de entrada.',
        'Haz clic en «Formatear» para embellecer o «Minificar» para comprimir.',
        'Los errores se resaltan con números de línea.',
        'Copia o descarga el resultado.',
      ],
      faq: [
        {
          question: '¿Esta herramienta maneja archivos JSON grandes?',
          answer: 'Sí. Funciona íntegramente en el navegador y puede procesar archivos JSON de varios megabytes sin problemas.',
        },
      ],
    },
    'base64-tool': {
      name: 'Codificador/decodificador Base64',
      description: 'Codifica texto a Base64 o decodifica Base64 a texto.',
      longDescription: 'Convierte texto plano a cadenas Base64 y decodifícalas a texto legible. Funciona íntegramente en tu dispositivo: nada se envía.',
      keywords: ['codificador base64', 'decodificador base64', 'codificar base64', 'decodificar base64', 'convertir base64'],
      seoTitle: 'Codificador/decodificador Base64: codifica y decodifica',
      seoDescription: 'Codifica texto a Base64 o decodifica cadenas gratis. Conversor Base64 instantáneo, privado y en el navegador.',
      content:
        'Cambia entre texto plano y Base64 cada vez que necesites una representación segura de datos: incrustar imágenes en HTML/CSS, pasar valores en URLs o inspeccionar tokens. Codifica y decodifica al instante sin paso de subida; todo se procesa localmente en tu navegador.',
      howToSteps: [
        'Ingresa tu texto o cadena Base64.',
        'Haz clic en «Codificar» o «Decodificar».',
        'Copia el resultado.',
      ],
      faq: [
        {
          question: '¿Para qué se usa Base64?',
          answer:
            'Base64 se usa comúnmente para codificar datos binarios para transporte textual, como incrustar imágenes en HTML/CSS, codificar tokens de API o pasar datos en URLs.',
        },
      ],
    },
    'uuid-generator': {
      name: 'Generador de UUID',
      description: 'Genera UUID v4 en volumen.',
      longDescription: 'Genera al instante uno o más UUID v4 aleatorios. Copia los identificadores individualmente o todos juntos.',
      keywords: ['generador uuid', 'uuid v4', 'generar uuid', 'identificador único', 'generador guid'],
      seoTitle: 'Generador de UUID: genera UUID v4 gratis',
      seoDescription: 'Genera UUID v4 gratis. Crea de 1 a 100 identificadores de una vez y cópialos al instante, sin registro.',
      content:
        'Crea identificadores únicos para claves de base de datos, datos de prueba o tokens de sesión. Genera de 1 a 100 UUID v4 criptográficamente seguros de una vez y luego cópialos individualmente o todos juntos. La generación usa la API crypto nativa del navegador y nunca abandona tu dispositivo.',
      howToSteps: [
        'Elige cuántos UUID generar.',
        'Haz clic en «Generar».',
        'Copia los identificadores individualmente o haz clic en «Copiar todo».',
      ],
      faq: [
        {
          question: '¿Qué es un UUID v4?',
          answer:
            'Un UUID v4 es un identificador de 128 bits generado aleatoriamente. Su unicidad está prácticamente garantizada en el tiempo y el espacio, lo que lo hace ideal para claves primarias de bases de datos y tokens de sesión.',
        },
        {
          question: '¿Estos identificadores son realmente aleatorios?',
          answer: 'Sí. Se generan con la API crypto.getRandomValues() del navegador, que es criptográficamente segura.',
        },
      ],
    },
    'jwt-decoder': {
      name: 'Decodificador JWT',
      description: 'Decodifica e inspecciona tokens JWT: encabezado, payload y firma.',
      longDescription:
        'Pega un token JWT para decodificar y mostrar las secciones de encabezado y payload. Decodificar no es verificar: siempre se procesa en tu dispositivo y no se envía a ningún servidor.',
      keywords: ['decodificar jwt', 'decodificador jwt', 'analizador jwt', 'json web token', 'inspector jwt'],
      seoTitle: 'Decodificador JWT: decodifica tokens web JSON',
      seoDescription: 'Decodifica tokens web JSON en línea. Inspecciona los claims del encabezado y el payload. Funciona íntegramente en tu dispositivo: tu token no se envía.',
      content:
        'Mira dentro de un token web JSON para ver exactamente qué contiene. Pega un JWT y lee al instante los claims de su encabezado y payload, útil para depurar flujos de autenticación o verificar los datos asociados al token. La decodificación ocurre íntegramente en tu navegador: tu token nunca abandona tu dispositivo y las firmas nunca se tocan.',
      howToSteps: [
        'Pega el JWT en el campo de entrada.',
        'El encabezado y el payload del token se decodifican y muestran al instante.',
      ],
      faq: [
        {
          question: '¿Se envía mi JWT a un servidor?',
          answer: 'Nunca. El token se decodifica íntegramente en tu navegador con JavaScript. Nunca abandona tu dispositivo.',
        },
        {
          question: '¿Esta herramienta verifica la firma del JWT?',
          answer: 'No. La decodificación solo lee el encabezado y el payload. Verificar la firma requiere la clave secreta, que nunca debe compartirse con ninguna herramienta.',
        },
      ],
    },
    'percentage-calculator': {
      name: 'Calculadora de porcentajes',
      description: 'Calcula porcentajes, el porcentaje de un número y el cambio porcentual.',
      longDescription: 'Tres modos: qué es X % de Y, X es qué % de Y, y el porcentaje de aumento/disminución entre dos valores.',
      keywords: ['calculadora de porcentajes', 'porcentaje de un número', 'aumento porcentual', 'cambio porcentual', 'calcular porcentaje'],
      seoTitle: 'Calculadora de porcentajes: calcula porcentajes gratis',
      seoDescription: 'Calcula porcentajes gratis. Encuentra el porcentaje de un número, el cambio porcentual y más. Resultados instantáneos, sin registro.',
      content:
        'Calcula porcentajes rápidamente para presupuestos, calificaciones, impuestos o descuentos. Usa uno de los tres modos —el valor de un porcentaje de un número, el porcentaje que un número representa de otro o el cambio porcentual entre dos valores— y obtén un resultado preciso al instante.',
      howToSteps: [
        'Elige el modo de cálculo.',
        'Ingresa los valores.',
        'Mira el resultado al instante.',
      ],
      faq: [
        {
          question: '¿Cómo calculo un aumento porcentual?',
          answer: 'Usa el modo «Cambio porcentual». Ingresa el valor anterior y el nuevo y la herramienta mostrará exactamente el aumento o la disminución porcentual.',
        },
      ],
    },
    'age-calculator': {
      name: 'Calculadora de edad',
      description: 'Calcula la edad exacta desde la fecha de nacimiento en años, meses y días.',
      longDescription: 'Ingresa la fecha de nacimiento y obtén la edad exacta en años, meses y días, además del total de días.',
      keywords: ['calculadora de edad', 'calcular edad', 'calculadora fecha de nacimiento', 'cuántos años tengo', 'calculadora cumpleaños'],
      seoTitle: 'Calculadora de edad: calcula tu edad exacta',
      seoDescription: 'Calcula tu edad exacta desde tu fecha de nacimiento. Obtén años, meses, días y días totales. Gratis.',
      content:
        'Sabe exactamente cuántos años tienes —o tiene otra persona— hasta hoy. Ingresa una fecha de nacimiento y obtén la edad en años, meses y días, con el total de días. El cálculo considera los años bisiestos y la duración de los meses para un resultado preciso.',
      howToSteps: [
        'Ingresa tu fecha de nacimiento.',
        'Mira tu edad exacta al instante.',
      ],
      faq: [
        {
          question: '¿Qué tan preciso es el cálculo de edad?',
          answer: 'El cálculo considera los años bisiestos y el número exacto de días de cada mes, lo que da un resultado preciso.',
        },
      ],
    },
    'discount-calculator': {
      name: 'Calculadora de descuento',
      description: 'Calcula el precio final después de un descuento porcentual.',
      longDescription: 'Ingresa el precio original y el porcentaje de descuento para ver al instante el monto ahorrado y el precio final.',
      keywords: ['calculadora de descuento', 'calculadora precio de oferta', 'calculadora descuento porcentual', 'precio después del descuento'],
      seoTitle: 'Calculadora de descuento: calcula el precio de oferta',
      seoDescription: 'Calcula el precio final después de un descuento. Ingresa el precio original y el porcentaje para ver cuánto ahorras.',
      content:
        'Sabe exactamente cuánto cuesta una oferta. Ingresa el precio original y el porcentaje de descuento para obtener al instante el monto ahorrado y el precio final que pagas, útil para comparar ofertas, acumular descuentos o fijar el precio de tus productos.',
      howToSteps: [
        'Ingresa el precio original.',
        'Ingresa el porcentaje de descuento.',
        'Mira el monto ahorrado y el precio final al instante.',
      ],
      faq: [
        {
          question: '¿Puedo calcular varios descuentos?',
          answer: 'Sí. Aplica el primer descuento para obtener un nuevo precio y luego úsalo como precio original para un segundo descuento.',
        },
      ],
    },
    'qr-code-generator': {
      name: 'Generador de códigos QR',
      description: 'Crea códigos QR para URLs, texto, correos y Wi-Fi.',
      longDescription:
        'Genera códigos QR para cualquier URL, texto, correo electrónico o red Wi-Fi. Personaliza el tamaño y el nivel de corrección de errores. Descarga en PNG.',
      keywords: ['generador qr', 'crear qr', 'hacer código qr', 'código qr gratis', 'código qr url'],
      seoTitle: 'Generador de códigos QR: crea códigos QR gratis',
      seoDescription: 'Crea códigos QR gratis. Genera códigos para URLs, texto, correos y Wi-Fi y descárgalos en PNG, sin registro.',
      content:
        'Convierte una URL, un mensaje, un correo electrónico o una conexión Wi-Fi en un código QR escaneable en segundos. Elige el tipo de contenido, define el tamaño y el nivel de corrección de errores y descarga un PNG nítido listo para imprimir o mostrar. La generación ocurre localmente en tu navegador, sin cuenta ni subida.',
      howToSteps: [
        'Elige el tipo (URL, texto, correo o Wi-Fi).',
        'Ingresa el contenido.',
        'Personaliza el tamaño y la corrección de errores.',
        'Descarga el código QR como PNG.',
      ],
      faq: [
        {
          question: '¿Qué es la corrección de errores en un código QR?',
          answer:
            'La corrección de errores permite leer un código QR aunque parte esté dañada o cubierta. Los niveles más altos ofrecen más robustez pero producen un código más denso.',
        },
        {
          question: '¿Cuántos caracteres puede contener un código QR?',
          answer: 'Un código QR puede contener hasta unos 4296 caracteres alfanuméricos en el nivel más bajo de corrección de errores.',
        },
      ],
    },
  },
  categoriesContent: {
    image: {
      name: 'Herramientas de imagen',
      description: 'Comprime, redimensiona, convierte y recorta imágenes directamente en tu navegador.',
      seoTitle: 'Herramientas de imagen: comprimir, redimensionar, convertir y recortar',
      seoDescription:
        'Herramientas de imagen gratuitas para comprimir, redimensionar, convertir y recortar fotos y gráficos. Todo funciona en tu navegador: sin subida ni registro.',
      longDescription:
        'Todo lo que necesitas para preparar imágenes para la web en un solo lugar. Reduce una imagen antes de compartirla, redimensiona a dimensiones exactas en píxeles, cambia entre JPG, PNG y WebP, o recorta a la proporción perfecta para una publicación social. Cada herramienta de imagen funciona íntegramente en tu navegador, así que tus archivos permanecen en tu dispositivo.',
      keywords: ['herramientas de imagen', 'comprimir imagen', 'redimensionar imagen', 'recortar imagen', 'convertir imagen'],
    },
    pdf: {
      name: 'Herramientas PDF',
      description: 'Fusiona, divide, comprime y convierte PDF con facilidad.',
      seoTitle: 'Herramientas PDF: fusionar, dividir y comprimir PDF',
      seoDescription:
        'Herramientas PDF gratuitas para fusionar, dividir, comprimir y convertir PDF. El procesamiento en el navegador mantiene tus documentos privados y seguros.',
      longDescription:
        'Manipula tus documentos PDF sin instalar software de oficina. Fusiona varios PDF en uno, extrae las páginas que necesitas, reduce el tamaño del archivo o convierte páginas en imágenes. El procesamiento ocurre localmente en tu navegador, así que los documentos confidenciales nunca abandonan tu dispositivo.',
      keywords: ['herramientas pdf', 'fusionar pdf', 'dividir pdf', 'comprimir pdf', 'pdf a imagen'],
    },
    text: {
      name: 'Herramientas de texto',
      description: 'Cuenta palabras, convierte mayúsculas/minúsculas, limpia y transforma texto al instante.',
      seoTitle: 'Herramientas de texto: contador de palabras, conversor y limpiador',
      seoDescription:
        'Herramientas de texto gratuitas para contar palabras, convertir mayúsculas/minúsculas, limpiar formato y eliminar líneas duplicadas. Instantáneas, en el navegador y privadas.',
      longDescription:
        'Herramientas rápidas para quien escribe. Cuenta palabras y caracteres mientras escribes, cambia entre mayúsculas, minúsculas y tipo título, elimina espacios desordenados y deduplica listas con un clic. Lo que pegas nunca abandona tu navegador.',
      keywords: ['herramientas de texto', 'contador de palabras', 'conversor de mayúsculas', 'limpiador de texto', 'eliminar líneas duplicadas'],
    },
    developer: {
      name: 'Herramientas para desarrolladores',
      description: 'Formatea JSON, codifica Base64, genera UUID y decodifica JWT.',
      seoTitle: 'Herramientas para desarrolladores: formateador JSON, Base64, UUID y JWT',
      seoDescription:
        'Herramientas gratuitas para desarrolladores para formatear JSON, codificar Base64, generar UUID y decodificar JWT. Herramientas rápidas en el navegador.',
      longDescription:
        'Pequeñas herramientas que ahorran tiempo a los desarrolladores. Formatea y valida JSON, codifica y decodifica Base64, genera UUID criptográficamente seguros e inspecciona payloads de JWT. Cada herramienta funciona localmente en tu navegador, así que los tokens y datos sensibles nunca se envían.',
      keywords: ['herramientas desarrolladores', 'formateador json', 'codificador base64', 'generador uuid', 'decodificador jwt'],
    },
    calculator: {
      name: 'Calculadoras',
      description: 'Calculadoras rápidas y precisas para cálculos cotidianos.',
      seoTitle: 'Calculadoras gratuitas: porcentajes, edad y descuentos',
      seoDescription: 'Calculadoras gratuitas de porcentajes, edad y descuentos. Obtén resultados precisos al instante en tu navegador.',
      longDescription:
        'Calculadoras útiles para decisiones cotidianas. Calcula el porcentaje de un número, conoce tu edad exacta hasta hoy o mira cuánto te ahorra realmente un descuento. Resultados precisos e instantáneos, sin registro ni anuncios intrusivos.',
      keywords: ['calculadora', 'calculadora de porcentajes', 'calculadora de edad', 'calculadora de descuento'],
    },
    converter: {
      name: 'Conversores',
      description: 'Convierte entre formatos, unidades y más.',
      seoTitle: 'Conversores: conversores de formatos y unidades',
      seoDescription:
        'Conversores gratuitos para cambiar entre formatos y unidades. Se añaden conversores nuevos con regularidad: vuelve pronto.',
      longDescription:
        'Una colección creciente de conversores para cambiar entre formatos y unidades. Esta categoría se expande constantemente y se añaden conversores nuevos con regularidad: vuelve pronto para encontrar la herramienta de conversión que necesitas.',
      keywords: ['conversor', 'conversor de formatos', 'conversor de unidades'],
    },
    qr: {
      name: 'Código QR',
      description: 'Crea códigos QR para URLs, texto, correos y Wi-Fi.',
      seoTitle: 'Herramientas de código QR: generador de QR gratuito',
      seoDescription: 'Crea códigos QR gratis. Genera códigos para URLs, texto, correo y Wi-Fi y descárgalos como PNG de alta calidad.',
      longDescription:
        'Crea códigos QR escaneables en segundos. Codifica una URL, texto plano, un correo electrónico o una red Wi-Fi, elige tu tamaño y nivel de corrección de errores y descarga un PNG nítido. La generación ocurre localmente en tu navegador, sin cuenta.',
      keywords: ['generador qr', 'crear qr', 'hacer código qr'],
    },
    ai: {
      name: 'Herramientas de IA',
      description: 'Herramientas inteligentes impulsadas por IA: próximamente.',
      seoTitle: 'Herramientas de IA: herramientas inteligentes en el navegador (próximamente)',
      seoDescription:
        'Próximamente: herramientas inteligentes impulsadas por IA en Toollora. Mantente atento mientras añadimos herramientas útiles y respetuosas con la privacidad.',
      longDescription:
        'Se están preparando herramientas impulsadas por IA. Construimos herramientas inteligentes que respetan el enfoque de «privacidad primero» de Toollora: útiles, rápidas y fáciles de usar. Esta categoría llegará pronto, vuelve para ver las novedades.',
      keywords: ['herramientas ia', 'herramientas inteligencia artificial'],
    },
  },
  supportedLocales: [...locales],
};

export default dict;