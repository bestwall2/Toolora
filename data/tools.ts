import type { LucideIcon } from 'lucide-react';
import {
  ImageIcon,
  Minimize2,
  Crop,
  RefreshCcw,
  Scissors,
  Archive,
  Images,
  Type,
  CaseSensitive,
  ListFilter,
  Eraser,
  Code2,
  Binary,
  Hash,
  Key,
  Percent,
  CalendarDays,
  Tag,
  QrCode,
  Wand2,
  ScanText,
  Fingerprint,
  Palette,
  Sparkles,
} from 'lucide-react';

export interface ToolFAQ {
  question: string;
  answer: string;
}

export type ChainType = 'image' | 'pdf';

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  icon: LucideIcon;
  keywords: string[];
  relatedTools: string[];
  seoTitle: string;
  seoDescription: string;
  content: string;
  howToSteps: string[];
  faq: ToolFAQ[];
  isPopular?: boolean;
  isBrowserSide: boolean;
  badge?: string;
  inputType?: ChainType;
  outputType?: ChainType;
}

export const tools: Tool[] = [
  // ─── IMAGE ───────────────────────────────────────────────────────────────
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    slug: 'image-compressor',
    description: 'Reduce image file size while keeping excellent quality.',
    longDescription:
      'Compress JPG, PNG and WebP images directly in your browser. No upload to any server — your files stay private.',
    category: 'image',
    icon: Minimize2,
    keywords: ['compress image', 'reduce image size', 'optimize image', 'jpg compressor', 'png compressor'],
    relatedTools: ['image-resizer', 'image-converter', 'image-cropper', 'pdf-to-images'],
    seoTitle: 'Image Compressor — Compress JPG, PNG & WebP Online Free',
    seoDescription:
      'Compress images online for free. Reduce JPG, PNG and WebP file sizes without losing quality. 100% browser-based — your files are never uploaded.',
    content:
      'Large images slow down websites, eat into storage limits and take forever to upload. The Image Compressor reduces the file size of JPG, PNG and WebP images while keeping the visual quality intact, making it easy to share photos and prepare graphics for the web. Compression runs entirely in your browser, so there is no upload step and no limit on the number of images you can process.',
    howToSteps: [
      'Upload your image by dragging and dropping it or clicking the upload area.',
      'Adjust the quality slider to control compression level.',
      'Click "Compress Image" to process it.',
      'Download your optimized image.',
    ],
    faq: [
      {
        question: 'Does image compression reduce quality?',
        answer:
          'Compression reduces file size by removing redundant data. At higher quality settings (70–90%), the difference is virtually invisible to the human eye.',
      },
      {
        question: 'Are my images uploaded to a server?',
        answer:
          'No. All compression happens entirely in your browser using the Canvas API. Your files never leave your device.',
      },
      {
        question: 'What image formats are supported?',
        answer: 'JPG/JPEG, PNG and WebP are supported for compression.',
      },
    ],
    isPopular: true,
    isBrowserSide: true,
    inputType: 'image',
    outputType: 'image',
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    slug: 'image-resizer',
    description: 'Resize images to any dimension with aspect ratio control.',
    longDescription:
      'Resize JPG, PNG and WebP images to exact pixel dimensions. Lock the aspect ratio or use common presets.',
    category: 'image',
    icon: ImageIcon,
    keywords: ['resize image', 'image dimensions', 'scale image', 'crop size', 'change image size'],
    relatedTools: ['image-compressor', 'image-converter', 'image-cropper'],
    seoTitle: 'Image Resizer — Resize Images Online Free',
    seoDescription:
      'Resize images online for free. Set exact width and height, lock aspect ratio, or use presets. Works in your browser — no upload needed.',
    content:
      'Whether you need a banner in a specific dimension or a profile picture at the right pixel size, this tool resizes images to exact measurements without distorting them. Keep the aspect ratio locked and change just one dimension, or apply a common preset such as HD or 720p. Everything is processed on your device, so your photos never leave your computer.',
    howToSteps: [
      'Upload your image.',
      'Enter the desired width and height, or choose a preset.',
      'Toggle "Lock Aspect Ratio" if needed.',
      'Click "Resize Image" and download the result.',
    ],
    faq: [
      {
        question: 'Can I resize without distorting the image?',
        answer: 'Yes. Enable "Lock Aspect Ratio" and only change one dimension — the other adjusts automatically.',
      },
      {
        question: 'What presets are available?',
        answer: 'Common presets include 1920×1080 (HD), 1280×720 (720p), 800×600, 400×400, and social media sizes.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
    inputType: 'image',
    outputType: 'image',
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    slug: 'image-converter',
    description: 'Convert images between JPG, PNG and WebP formats.',
    longDescription:
      'Convert between popular image formats: JPG to PNG, PNG to WebP, WebP to JPG and more — all in the browser.',
    category: 'image',
    icon: RefreshCcw,
    keywords: ['convert image', 'jpg to png', 'png to webp', 'webp to jpg', 'image format converter'],
    relatedTools: ['image-compressor', 'image-resizer', 'image-cropper'],
    seoTitle: 'Image Converter — Convert JPG, PNG, WebP Online Free',
    seoDescription:
      'Convert images between JPG, PNG and WebP formats for free. Fast, private, browser-based image format conversion.',
    content:
      'Different projects call for different image formats. This converter switches between JPG, PNG and WebP in a couple of clicks — for example converting a WebP screenshot to PNG for an editor that does not support it, or converting to WebP to shrink a file for the web. Transparency is preserved for PNG and WebP, and the whole process happens locally in your browser.',
    howToSteps: [
      'Upload your image.',
      'Select the target format (JPG, PNG or WebP).',
      'Adjust quality if converting to JPG.',
      'Click "Convert" and download.',
    ],
    faq: [
      {
        question: 'Does converting to WebP reduce file size?',
        answer:
          'Yes. WebP typically produces 25–35% smaller files than JPG at the same visual quality, making it ideal for the web.',
      },
      {
        question: 'Will PNG transparency be preserved?',
        answer:
          'Transparency is preserved when converting to PNG or WebP. Converting to JPG will fill transparency with a white background.',
      },
    ],
    isPopular: true,
    isBrowserSide: true,
    inputType: 'image',
    outputType: 'image',
  },
  {
    id: 'image-cropper',
    name: 'Image Cropper',
    slug: 'image-cropper',
    description: 'Crop images with custom or preset aspect ratios.',
    longDescription:
      'Crop images precisely using a drag-to-select crop area. Choose from free, square, 16:9, 4:3 and other common ratios.',
    category: 'image',
    icon: Crop,
    keywords: ['crop image', 'image cropper', 'cut image', 'trim image', 'aspect ratio crop'],
    relatedTools: ['image-compressor', 'image-resizer', 'image-converter'],
    seoTitle: 'Image Cropper — Crop Images Online Free',
    seoDescription:
      'Crop images online for free. Choose from preset aspect ratios or crop freely. Fast, browser-based, no software required.',
    content:
      'Crop your images to the exact composition you want, whether that is a square avatar, a widescreen header or a free-form cut. Pick a preset ratio like 16:9 or 4:3, or drag the handles to define your own area. The original file is never modified — you simply download a new cropped copy, processed locally on your device.',
    howToSteps: [
      'Upload your image.',
      'Select an aspect ratio or drag to define a custom crop area.',
      'Adjust the crop selection.',
      'Click "Crop Image" and download.',
    ],
    faq: [
      {
        question: 'What aspect ratios are available?',
        answer: 'Free crop, Square (1:1), 16:9, 4:3, and 3:2 are available.',
      },
      {
        question: 'Is the original image modified?',
        answer: 'No. The original file is never modified. You download a new cropped copy.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
    inputType: 'image',
    outputType: 'image',
  },

  // ─── PDF ─────────────────────────────────────────────────────────────────
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    slug: 'pdf-merger',
    description: 'Merge multiple PDF files into one document.',
    longDescription:
      'Upload multiple PDFs, reorder them by dragging, then merge into a single file — all in your browser using pdf-lib.',
    category: 'pdf',
    icon: Archive,
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'pdf merger', 'pdf combiner'],
    relatedTools: ['pdf-splitter', 'pdf-compressor', 'pdf-to-images'],
    seoTitle: 'PDF Merger — Merge PDF Files Online Free',
    seoDescription:
      'Merge multiple PDF files into one online for free. Reorder pages, combine documents. 100% browser-based — files stay private.',
    content:
      'Combine several PDFs into a single document in a few clicks. Upload the files, drag them into the order you want, and merge — useful for putting together reports, scans or invoices before sending or archiving. All merging is done locally with pdf-lib, so your documents are never uploaded to a server.',
    howToSteps: [
      'Upload two or more PDF files.',
      'Drag to reorder them if needed.',
      'Click "Merge PDFs".',
      'Download the combined PDF.',
    ],
    faq: [
      {
        question: 'How many PDFs can I merge?',
        answer:
          'There is no hard limit. For very large files, merging may take a few seconds depending on your device.',
      },
      {
        question: 'Are my PDFs uploaded to a server?',
        answer: 'No. All merging is done locally in your browser. Your files are never transmitted anywhere.',
      },
    ],
    isPopular: true,
    isBrowserSide: true,
    inputType: 'pdf',
    outputType: 'pdf',
  },
  {
    id: 'pdf-splitter',
    name: 'PDF Splitter',
    slug: 'pdf-splitter',
    description: 'Split a PDF into separate pages or extract specific pages.',
    longDescription:
      'Upload a PDF and extract individual pages, a range of pages, or split the document into equal parts.',
    category: 'pdf',
    icon: Scissors,
    keywords: ['split pdf', 'extract pdf pages', 'pdf splitter', 'separate pdf pages'],
    relatedTools: ['pdf-merger', 'pdf-compressor', 'pdf-to-images'],
    seoTitle: 'PDF Splitter — Split & Extract PDF Pages Online Free',
    seoDescription:
      'Split PDF files online for free. Extract specific pages or split into individual files. Fast, browser-based, no sign-up.',
    content:
      'Extract exactly the pages you need from a larger PDF. Pull out a single page to send on its own, select a range to make a new document, or split every page into separate files. Processing is done in your browser, which makes it convenient for handling documents you would rather not upload anywhere.',
    howToSteps: [
      'Upload your PDF.',
      'Select the pages you want to extract, or choose "Split all pages".',
      'Click "Split PDF".',
      'Download the resulting files.',
    ],
    faq: [
      {
        question: 'Can I extract just a few pages?',
        answer: 'Yes. Enter specific page numbers or a range (e.g. 1-3, 5, 7-9) to extract only those pages.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
    inputType: 'pdf',
    outputType: 'pdf',
  },
  {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    slug: 'pdf-compressor',
    description: 'Reduce PDF file size by removing metadata and optimizing streams.',
    longDescription:
      'Reduce PDF file size client-side by removing metadata and optimizing internal streams. For deeper compression, a backend endpoint can be added.',
    category: 'pdf',
    icon: Minimize2,
    keywords: ['compress pdf', 'reduce pdf size', 'pdf compressor', 'optimize pdf', 'smaller pdf'],
    relatedTools: ['pdf-merger', 'pdf-splitter', 'pdf-to-images'],
    seoTitle: 'PDF Compressor — Compress PDF Files Online Free',
    seoDescription:
      'Compress PDF files online for free. Remove metadata and reduce file size instantly in your browser. No upload required.',
    content:
      'Trim the size of a PDF before sending it by email or uploading it to a portal with a size limit. This tool removes embedded metadata and optimises internal streams to reduce the file size while keeping the pages readable. It runs entirely in your browser, so sensitive documents are not transmitted anywhere.',
    howToSteps: [
      'Upload your PDF.',
      'Choose a compression level.',
      'Click "Compress PDF".',
      'Download the optimized PDF.',
    ],
    faq: [
      {
        question: 'How much can I compress a PDF?',
        answer:
          'Browser-based compression removes metadata and optimizes streams, typically saving 5–30%. For maximum compression, a server-based tool is more effective.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
    inputType: 'pdf',
    outputType: 'pdf',
    badge: 'Basic',
  },
  {
    id: 'pdf-to-images',
    name: 'PDF to Images',
    slug: 'pdf-to-images',
    description: 'Convert PDF pages to PNG or JPG images.',
    longDescription:
      'Render each page of a PDF as a high-quality PNG or JPG image using PDF.js. Download individually or all at once.',
    category: 'pdf',
    icon: Images,
    keywords: ['pdf to image', 'pdf to png', 'pdf to jpg', 'convert pdf pages', 'extract images from pdf'],
    relatedTools: ['pdf-merger', 'pdf-splitter', 'image-compressor'],
    seoTitle: 'PDF to Images — Convert PDF Pages to PNG/JPG Online Free',
    seoDescription:
      'Convert PDF pages to PNG or JPG images online for free. Download individual pages or all at once. Fast and private.',
    content:
      'Turn a PDF into a set of images when you need to embed pages in a presentation, post them online or make quick screenshots. Each page is rendered as a high-quality PNG or JPG, and you can download pages individually or all together as a ZIP archive. Rendering happens locally in your browser using PDF.js.',
    howToSteps: [
      'Upload your PDF.',
      'Choose the output format (PNG or JPG) and quality.',
      'Click "Convert to Images".',
      'Download individual pages or all pages as a ZIP.',
    ],
    faq: [
      {
        question: 'What resolution are the exported images?',
        answer: 'Images are rendered at 1.5× scale by default, giving clear, high-quality output from most PDFs.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
    inputType: 'pdf',
    outputType: 'image',
  },

  // ─── TEXT ─────────────────────────────────────────────────────────────────
  {
    id: 'word-counter',
    name: 'Word Counter',
    slug: 'word-counter',
    description: 'Count words, characters, sentences and estimate reading time.',
    longDescription:
      'Paste or type your text to instantly get word count, character count, sentence count, paragraph count and estimated reading time.',
    category: 'text',
    icon: Type,
    keywords: ['word counter', 'character counter', 'count words', 'word count tool', 'reading time'],
    relatedTools: ['case-converter', 'text-cleaner', 'remove-duplicate-lines'],
    seoTitle: 'Word Counter — Count Words & Characters Online Free',
    seoDescription:
      'Count words, characters, sentences and paragraphs online for free. Get instant reading time estimates. No sign-up required.',
    content:
      'Track the length of your writing as you go. Paste or type any text to see a live count of words, characters, sentences and paragraphs, plus an estimated reading time. Useful for blog posts, essays, social captions and anywhere a word limit applies. Your text is analysed locally in your browser and is never stored.',
    howToSteps: [
      'Paste or type your text into the box.',
      'View the live statistics instantly.',
    ],
    faq: [
      {
        question: 'How is reading time calculated?',
        answer: 'Reading time is estimated at 200 words per minute, which is the average adult reading speed.',
      },
      {
        question: 'Does this tool store my text?',
        answer: 'No. All processing happens in your browser. Your text is never sent anywhere.',
      },
    ],
    isPopular: true,
    isBrowserSide: true,
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    slug: 'case-converter',
    description: 'Convert text to UPPERCASE, lowercase, Title Case, camelCase and more.',
    longDescription:
      'Transform text between 8 different case formats: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case and kebab-case.',
    category: 'text',
    icon: CaseSensitive,
    keywords: ['case converter', 'uppercase', 'lowercase', 'title case', 'camelcase', 'snake_case', 'kebab-case'],
    relatedTools: ['word-counter', 'text-cleaner', 'remove-duplicate-lines'],
    seoTitle: 'Case Converter — Convert Text Case Online Free',
    seoDescription:
      'Convert text to uppercase, lowercase, title case, camelCase, snake_case and more. Free, instant, browser-based text case converter.',
    content:
      'Reformat text without retyping it. Switch between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case and kebab-case in a single click — handy when pasting text between editors, writing code identifiers or preparing headlines. The conversion is instant and runs entirely in your browser.',
    howToSteps: [
      'Paste your text into the input box.',
      'Click the desired case format.',
      'Copy the converted result.',
    ],
    faq: [
      {
        question: 'What is the difference between camelCase and PascalCase?',
        answer:
          'camelCase starts with a lowercase letter (e.g. "myVariable") while PascalCase starts with an uppercase letter (e.g. "MyVariable").',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
  },
  {
    id: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    slug: 'remove-duplicate-lines',
    description: 'Remove duplicate lines from text, with sorting and filtering options.',
    longDescription:
      'Paste a list of lines and remove duplicates instantly. Options include keeping the first or last occurrence, sorting alphabetically, and removing empty lines.',
    category: 'text',
    icon: ListFilter,
    keywords: ['remove duplicates', 'deduplicate text', 'unique lines', 'remove duplicate lines', 'text deduplication'],
    relatedTools: ['text-cleaner', 'word-counter', 'case-converter'],
    seoTitle: 'Remove Duplicate Lines — Online Text Deduplicator',
    seoDescription:
      'Remove duplicate lines from text online for free. Sort, keep first or last occurrence, remove empty lines. Instant browser-based processing.',
    content:
      'Clean up lists, CSV exports and pasted data by removing repeated lines. Choose to keep the first or last occurrence of each entry, sort the result alphabetically, and drop empty lines. The tool works instantly in your browser, so even large lists are handled locally without uploading anything.',
    howToSteps: [
      'Paste your text or list into the input box.',
      'Choose your deduplication options.',
      'Click "Remove Duplicates".',
      'Copy or download the result.',
    ],
    faq: [
      {
        question: 'Is the comparison case-sensitive?',
        answer: 'Yes, by default. Lines with different casing are treated as different. A case-insensitive option is also available.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
  },
  {
    id: 'text-cleaner',
    name: 'Text Cleaner',
    slug: 'text-cleaner',
    description: 'Clean and sanitize text by removing extra spaces, empty lines and more.',
    longDescription:
      'Quickly clean pasted text by removing extra whitespace, empty lines, duplicate lines, and normalizing line breaks.',
    category: 'text',
    icon: Eraser,
    keywords: ['text cleaner', 'clean text', 'remove extra spaces', 'normalize text', 'text formatter'],
    relatedTools: ['remove-duplicate-lines', 'word-counter', 'case-converter'],
    seoTitle: 'Text Cleaner — Clean & Format Text Online Free',
    seoDescription:
      'Clean text online for free. Remove extra spaces, empty lines, duplicate lines and normalize whitespace instantly.',
    content:
      'Tidy up text copied from emails, documents or PDFs that arrives with stray line breaks and double spacing. Remove extra whitespace, delete empty lines, de-duplicate repeated lines and normalize line endings to a consistent style. Everything is processed locally in your browser for a quick, private cleanup.',
    howToSteps: [
      'Paste your text into the input box.',
      'Choose the cleaning options.',
      'Click "Clean Text".',
      'Copy or download the cleaned result.',
    ],
    faq: [
      {
        question: 'What does "Normalize line breaks" do?',
        answer: 'It converts Windows-style (\\r\\n) and old Mac-style (\\r) line endings to standard Unix-style (\\n) line endings.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
  },

  // ─── DEVELOPER ────────────────────────────────────────────────────────────
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, minify and validate JSON with syntax highlighting.',
    longDescription:
      'Paste JSON to format it with proper indentation, minify it for production, or validate it to catch errors with helpful line-number hints.',
    category: 'developer',
    icon: Code2,
    keywords: ['json formatter', 'json validator', 'json minifier', 'format json', 'json beautifier'],
    relatedTools: ['base64-tool', 'uuid-generator', 'jwt-decoder'],
    seoTitle: 'JSON Formatter & Validator — Format JSON Online Free',
    seoDescription:
      'Format, minify and validate JSON online for free. Get instant error messages with line numbers. Fast, browser-based JSON tools.',
    content:
      'A daily companion for working with JSON. Beautify messy responses with proper indentation, minify JSON for storage or transport, and validate it to catch syntax errors with clear line-number hints. The tool handles files of several megabytes entirely in your browser, so there is no limit on pasting large payloads.',
    howToSteps: [
      'Paste your JSON into the input box.',
      'Click "Format" to beautify or "Minify" to compact it.',
      'If there are errors, they will be highlighted with line numbers.',
      'Copy or download the result.',
    ],
    faq: [
      {
        question: 'Does this tool support large JSON files?',
        answer: 'Yes. The tool works entirely in the browser and can handle JSON files of several megabytes without issues.',
      },
    ],
    isPopular: true,
    isBrowserSide: true,
  },
  {
    id: 'base64-tool',
    name: 'Base64 Encoder / Decoder',
    slug: 'base64-tool',
    description: 'Encode text to Base64 or decode Base64 back to text.',
    longDescription:
      'Convert plain text to Base64-encoded strings and decode Base64 back to readable text. Fully client-side — nothing is sent anywhere.',
    category: 'developer',
    icon: Binary,
    keywords: ['base64 encoder', 'base64 decoder', 'encode base64', 'decode base64', 'base64 converter'],
    relatedTools: ['json-formatter', 'uuid-generator', 'jwt-decoder'],
    seoTitle: 'Base64 Encoder / Decoder — Encode & Decode Base64 Online',
    seoDescription:
      'Encode text to Base64 or decode Base64 strings online for free. Instant, browser-based, private Base64 converter.',
    content:
      'Convert between plain text and Base64 whenever you need a text-safe representation of data — embedding images in HTML or CSS, passing values in URLs, or inspecting tokens. Encode and decode instantly with no upload step; all processing happens locally in your browser.',
    howToSteps: [
      'Enter your text or Base64 string.',
      'Click "Encode" or "Decode".',
      'Copy the result.',
    ],
    faq: [
      {
        question: 'What is Base64 used for?',
        answer:
          'Base64 is commonly used to encode binary data for text-based transport, such as embedding images in HTML/CSS, encoding API tokens, or passing data in URLs.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    slug: 'uuid-generator',
    description: 'Generate UUID v4 identifiers in bulk.',
    longDescription:
      'Generate one or many UUID v4 random identifiers instantly. Copy individual UUIDs or copy all at once.',
    category: 'developer',
    icon: Hash,
    keywords: ['uuid generator', 'uuid v4', 'generate uuid', 'unique id', 'guid generator'],
    relatedTools: ['json-formatter', 'base64-tool', 'jwt-decoder'],
    seoTitle: 'UUID Generator — Generate UUID v4 Online Free',
    seoDescription:
      'Generate UUID v4 identifiers online for free. Generate 1 to 100 UUIDs at once and copy them instantly. No sign-up required.',
    content:
      'Create unique identifiers for database keys, test data or session tokens. Generate between 1 and 100 cryptographically secure UUID v4 values at once, then copy them individually or all together. Generation uses the browser\u2019s native crypto API and never leaves your device.',
    howToSteps: [
      'Select how many UUIDs you want to generate.',
      'Click "Generate".',
      'Copy individual UUIDs, or click "Copy" to copy them all at once.',
    ],
    faq: [
      {
        question: 'What is UUID v4?',
        answer:
          'UUID v4 is a randomly generated 128-bit identifier. It is practically guaranteed to be unique across space and time, making it ideal for database primary keys and session tokens.',
      },
      {
        question: 'Are these UUIDs truly random?',
        answer: 'Yes. They are generated using the browser\'s crypto.getRandomValues() API, which is cryptographically secure.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Decode and inspect JWT tokens — header, payload and signature.',
    longDescription:
      'Paste a JWT to decode and display its header and payload sections. Decoding is not verification — always handled client-side, never sent to any server.',
    category: 'developer',
    icon: Key,
    keywords: ['jwt decoder', 'decode jwt', 'jwt parser', 'json web token', 'jwt inspector'],
    relatedTools: ['json-formatter', 'base64-tool', 'uuid-generator'],
    seoTitle: 'JWT Decoder — Decode JSON Web Tokens Online',
    seoDescription:
      'Decode JWT tokens online. Inspect header and payload claims. 100% client-side — your token is never sent to any server.',
    content:
      'Look inside a JSON Web Token to see exactly what it contains. Paste a JWT and instantly read its header and payload claims, which is useful when debugging authentication flows or verifying what data an application has attached to a token. Decoding happens entirely in your browser — your token never leaves your device, and signatures are never touched.',
    howToSteps: [
      'Paste your JWT into the input field.',
      'The header and payload are decoded and displayed instantly.',
    ],
    faq: [
      {
        question: 'Is my JWT sent to a server?',
        answer: 'Absolutely not. The token is decoded entirely in your browser using JavaScript. It never leaves your device.',
      },
      {
        question: 'Does this tool verify the JWT signature?',
        answer: 'No. Decoding only reads the header and payload. Signature verification requires the secret key, which should never be shared with any tool.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
  },

  // ─── CALCULATORS ─────────────────────────────────────────────────────────
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    description: 'Calculate percentages, percentage of a number and percentage change.',
    longDescription:
      'Three modes: what is X% of Y, X is what % of Y, and percentage increase/decrease between two values.',
    category: 'calculator',
    icon: Percent,
    keywords: ['percentage calculator', 'percent of number', 'percentage increase', 'percentage change', 'calculate percent'],
    relatedTools: ['age-calculator', 'discount-calculator'],
    seoTitle: 'Percentage Calculator — Calculate Percentages Online',
    seoDescription:
      'Calculate percentages online for free. Find percentage of a number, percentage change, and more. Instant results, no sign-up.',
    content:
      'Work out percentages quickly for budgets, grades, tax or discounts. Use one of three modes — the value of a percentage of a number, what percentage one number is of another, or the percentage change between two values — and get an instant, accurate result.',
    howToSteps: [
      'Choose a calculation mode.',
      'Enter the values.',
      'View the result instantly.',
    ],
    faq: [
      {
        question: 'How do I calculate a percentage increase?',
        answer: 'Use the "Percentage Change" mode. Enter the original and new values and the tool shows the exact percentage increase or decrease.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    slug: 'age-calculator',
    description: 'Calculate exact age from date of birth in years, months and days.',
    longDescription:
      'Enter a date of birth and get the exact age in years, months, days and total days lived.',
    category: 'calculator',
    icon: CalendarDays,
    keywords: ['age calculator', 'calculate age', 'date of birth calculator', 'how old am i', 'birthday calculator'],
    relatedTools: ['percentage-calculator', 'discount-calculator'],
    seoTitle: 'Age Calculator — Calculate Your Exact Age Online',
    seoDescription:
      'Calculate your exact age from date of birth. Get years, months, days and total days. Free online age calculator.',
    content:
      'Find out exactly how old you are — or how old someone else is — down to the day. Enter a date of birth and get the age in years, months and days along with the total number of days lived. The calculation accounts for leap years and month lengths for a precise result.',
    howToSteps: [
      'Enter your date of birth.',
      'View your exact age instantly.',
    ],
    faq: [
      {
        question: 'How accurate is the age calculation?',
        answer: 'The calculation accounts for leap years and the exact number of days in each month, giving you a precise result.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    slug: 'discount-calculator',
    description: 'Calculate final price after a percentage discount.',
    longDescription:
      'Enter an original price and a discount percentage to instantly see the discount amount and the final price you pay.',
    category: 'calculator',
    icon: Tag,
    keywords: ['discount calculator', 'sale price calculator', 'percent off calculator', 'price after discount'],
    relatedTools: ['percentage-calculator', 'age-calculator'],
    seoTitle: 'Discount Calculator — Calculate Sale Price Online',
    seoDescription:
      'Calculate the final price after a discount online. Enter original price and discount percentage to see how much you save.',
    content:
      'See exactly what a sale really costs. Enter an original price and a discount percentage to instantly get the amount you save and the final price you pay — useful for comparing deals, stacking offers or setting sale prices for your own products.',
    howToSteps: [
      'Enter the original price.',
      'Enter the discount percentage.',
      'See the discount amount and final price instantly.',
    ],
    faq: [
      {
        question: 'Can I calculate multiple discounts?',
        answer: 'Yes. Apply the first discount to get a new price, then use that as the original price for a second discount.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
  },

  // ─── QR ──────────────────────────────────────────────────────────────────
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    slug: 'qr-code-generator',
    description: 'Generate QR codes for URLs, text, emails and WiFi.',
    longDescription:
      'Create QR codes for any URL, text, email address or WiFi network. Customise the size and error correction level. Download as PNG.',
    category: 'qr',
    icon: QrCode,
    keywords: ['qr code generator', 'create qr code', 'qr code maker', 'free qr code', 'qr code url'],
    relatedTools: ['image-compressor', 'image-converter', 'uuid-generator'],
    seoTitle: 'QR Code Generator — Create Free QR Codes Online',
    seoDescription:
      'Generate QR codes online for free. Create QR codes for URLs, text, email and WiFi. Download as PNG. No sign-up needed.',
    content:
      'Turn a link, message, email address or WiFi login into a scannable QR code in seconds. Choose the content type, set the size and error correction level, and download a crisp PNG ready for print or screen. Generation runs locally in your browser, with no account or upload required.',
    howToSteps: [
      'Select the type (URL, text, email or WiFi).',
      'Enter your content.',
      'Customise size and error correction.',
      'Download your QR code as PNG.',
    ],
    faq: [
      {
        question: 'What is error correction in a QR code?',
        answer:
          'Error correction allows a QR code to be read even if part of it is damaged or obscured. Higher levels provide more resilience but produce a denser code.',
      },
      {
        question: 'How many characters can a QR code hold?',
        answer: 'A QR code can hold up to around 4,296 alphanumeric characters at the lowest error correction level.',
      },
    ],
    isPopular: true,
    isBrowserSide: true,
  },

  // ─── NEW TOOLS ─────────────────────────────────────────────────────────
  {
    id: 'image-background-remover',
    name: 'Image Background Remover',
    slug: 'image-background-remover',
    description: 'Remove the background from photos of people automatically.',
    longDescription:
      'Cut out the background from selfies and portraits with AI running in your browser. The person is kept and saved as a transparent PNG.',
    category: 'image',
    icon: Wand2,
    keywords: ['remove background', 'background remover', 'cut out image', 'transparent background', 'remove bg'],
    relatedTools: ['image-cropper', 'image-compressor', 'image-converter', 'image-to-text'],
    seoTitle: 'Image Background Remover — Remove Background Online Free',
    seoDescription:
      'Remove the background from photos of people for free. AI-powered cutout runs in your browser — your images are never uploaded.',
    content:
      'Whether you need a clean headshot for a profile, a product photo or a transparent cutout for a design, this tool removes the background from photos of people automatically. An on-device AI model detects the person in the image and separates them from the background, so you can download a transparent PNG ready to use anywhere. Everything runs locally in your browser — the first use downloads a small model, after which it is cached, and your photos never leave your device.',
    howToSteps: [
      'Upload a photo of a person (JPG or PNG).',
      'Click "Remove Background". The model loads on first use.',
      'Preview the transparent cutout.',
      'Download the PNG with a transparent background.',
    ],
    faq: [
      {
        question: 'Is my photo uploaded to a server?',
        answer:
          'No. The segmentation model runs entirely in your browser using WebAssembly. Your image never leaves your device.',
      },
      {
        question: 'Does it work on objects or just people?',
        answer:
          'This tool uses a selfie segmentation model optimised for people. For photos of animals or objects the results may be poor.',
      },
      {
        question: 'Why does it need to download a model?',
        answer:
          'The AI model (~2 MB) is downloaded once from Google\'s CDN the first time you use the tool, then cached in your browser for future visits.',
      },
    ],
    isPopular: true,
    isBrowserSide: true,
    inputType: 'image',
    outputType: 'image',
  },
  {
    id: 'image-to-text',
    name: 'Image to Text (OCR)',
    slug: 'image-to-text',
    description: 'Extract text from images and scanned documents.',
    longDescription:
      'Turn pictures, screenshots and scanned pages into editable text. Optical Character Recognition runs locally in your browser.',
    category: 'image',
    icon: ScanText,
    keywords: ['ocr', 'image to text', 'extract text from image', 'scan text', 'optical character recognition'],
    relatedTools: ['image-background-remover', 'text-cleaner', 'word-counter', 'image-converter'],
    seoTitle: 'Image to Text — Extract Text from Images Online Free',
    seoDescription:
      'Extract text from images, screenshots and scanned documents for free with OCR that runs in your browser. No upload required.',
    content:
      'Need the text from a screenshot, a photo of a document or a scanned page? This tool reads the text straight off the image using Optical Character Recognition (OCR) and gives it back to you as copyable, editable text. The recognition engine runs locally in your browser, so your document is never uploaded anywhere. English, Arabic, French and Spanish text is supported, and you can copy the result or download it as a text file.',
    howToSteps: [
      'Upload an image or scanned document (JPG, PNG or WebP).',
      'Pick the recognition language (auto-selected for your UI language).',
      'Click "Extract Text". The OCR engine loads on first use.',
      'Copy the result or download it as a .txt file.',
    ],
    faq: [
      {
        question: 'Is my document uploaded anywhere?',
        answer:
          'No. The OCR engine runs locally in your browser, so your images and documents never leave your device.',
      },
      {
        question: 'Which languages are supported?',
        answer: 'English, Arabic, French and Spanish are supported and match the language of the site.',
      },
      {
        question: 'How accurate is the recognition?',
        answer:
          'Accuracy depends on image quality. Clear, well-lit, straight images with readable text give the best results.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
    inputType: 'image',
  },
  {
    id: 'image-enhancer',
    name: 'Image Enhancer',
    slug: 'image-enhancer',
    description: 'Boost photo quality with brightness, contrast, saturation and sharpening.',
    longDescription:
      'Bring dull or blurry photos back to life. Adjust brightness, contrast, saturation and sharpness with live preview, or let one-click Auto Enhance pick smart settings for you. Everything runs in your browser — your photos never leave your device.',
    category: 'image',
    icon: Sparkles,
    keywords: ['enhance image', 'photo enhancer', 'sharpen image', 'improve photo quality', 'image quality'],
    relatedTools: ['image-compressor', 'image-converter', 'image-resizer', 'image-background-remover'],
    seoTitle: 'Image Enhancer — Enhance Photo Quality Online Free',
    seoDescription:
      'Enhance image quality online for free. Adjust brightness, contrast, saturation and sharpness, or auto-enhance photos in one click. 100% in-browser, no upload.',
    content:
      'Need a quick quality boost before sharing a photo or posting it online? Use this enhancer to brighten underexposed shots, restore washed-out colors and sharpen soft edges. The sliders give you full control with a live before/after preview, while Auto Enhance applies a balanced preset in one click. Because the processing happens entirely on your device, no image is ever uploaded to a server.',
    howToSteps: [
      'Upload your image.',
      'Click "Auto Enhance" or fine-tune the sliders.',
      'Preview the enhanced result.',
      'Download the image or send it to another tool.',
    ],
    faq: [
      {
        question: 'Does enhancing reduce the image quality?',
        answer:
          'No. The tool only adjusts brightness, contrast, saturation and sharpness — it never resamples below your original resolution (large images are processed at up to 2560px for speed).',
      },
      {
        question: 'Are my photos uploaded to a server?',
        answer:
          'Never. All processing happens in your browser, so your images stay on your device. That is the core privacy promise of Toollora.',
      },
      {
        question: 'Can I chain the result into another tool?',
        answer:
          'Yes. After enhancing, use the "Continue with" panel to send the result straight to the compressor, converter, resizer, background remover or OCR.',
      },
    ],
    isBrowserSide: true,
    inputType: 'image',
    outputType: 'image',
    isPopular: true,
  },
  {
    id: 'image-generator',
    name: 'AI Image Generator',
    slug: 'image-generator',
    description: 'Create stunning images from a text prompt with AI, no login required.',
    longDescription:
      'Describe what you want to see and our AI turns your words into an image. Tune the result with a negative prompt, seed and resolution to control composition and style. Powered by a free text-to-image engine, no account or sign-up needed.',
    category: 'image',
    icon: Wand2,
    keywords: ['ai image generator', 'text to image', 'ai art generator', 'generate image from text', 'image generator'],
    relatedTools: ['image-enhancer', 'image-resizer', 'image-converter', 'image-compressor'],
    seoTitle: 'AI Image Generator - Create Images from Text Online Free',
    seoDescription:
      'Generate AI images from a text prompt for free. Control seed and resolution, add a negative prompt, and download in one click. No login required.',
    content:
      'Write a prompt describing the scene, subject, style or mood you want, then hit Generate. Our AI produces a unique image in seconds. For finer control, add a negative prompt to tell the AI what to avoid, set a fixed seed to reproduce a result and choose a resolution. The generator runs right on this page — preview the result and download it in one click.',
    howToSteps: [
      'Type a detailed description of the image you want.',
      'Optionally set a negative prompt, seed and resolution.',
      'Click "Generate".',
      'Preview the result in the embedded generator and download it.',
    ],
    faq: [
      {
        question: 'Is the image generator really free?',
        answer:
          'Yes. Each generation is free and requires no account, login or credit card.',
      },
      {
        question: 'Can I control what the AI creates?',
        answer:
          'Yes. Use a descriptive prompt, add a negative prompt to avoid unwanted elements, set a seed to reproduce results, and choose a resolution.',
      },
      {
        question: 'Are generated images safe to use?',
        answer:
          'Generated images are original outputs of the AI model. Review the result before using it for commercial purposes, as AI generation policies vary by platform.',
      },
    ],
    isBrowserSide: false,
    outputType: 'image',
    isPopular: true,
  },
  {
    id: 'sha-hash-generator',
    name: 'SHA-256 Hash Generator',
    slug: 'sha-hash-generator',
    description: 'Generate SHA-256, SHA-384 and SHA-512 hashes for text and files.',
    longDescription:
      'Hash text or files with the SHA-2 family (SHA-256, SHA-384, SHA-512) using your browser\'s built-in cryptography. Offline and instant.',
    category: 'developer',
    icon: Fingerprint,
    keywords: ['sha256', 'sha-256', 'hash generator', 'sha512', 'checksum', 'file hash'],
    relatedTools: ['base64-tool', 'uuid-generator', 'json-formatter'],
    seoTitle: 'SHA-256 Hash Generator — Hash Text & Files Online Free',
    seoDescription:
      'Generate SHA-256, SHA-384 and SHA-512 hashes for text or files for free. Runs entirely offline in your browser using WebCrypto.',
    content:
      'Compute a cryptographic fingerprint of any text or file with the SHA-2 family of hash functions. Choose between SHA-256, SHA-384 and SHA-512, type some text or pick a file, and get the hash instantly. Hashing runs entirely on your device using the browser\'s built-in WebCrypto API, which makes it useful for verifying file integrity or comparing checksums without ever uploading your data.',
    howToSteps: [
      'Choose an algorithm (SHA-256, SHA-384 or SHA-512).',
      'Type text or upload a file to hash.',
      'The hash updates instantly.',
      'Copy the result to your clipboard.',
    ],
    faq: [
      {
        question: 'Is a hash encryption?',
        answer:
          'No. Hashing is a one-way function: it produces a fixed-size fingerprint of the input, but the input cannot be recovered from the hash.',
      },
      {
        question: 'What is a hash used for?',
        answer:
          'Hashes are commonly used to verify file integrity (checksums), store passwords securely and detect duplicate data.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    slug: 'color-converter',
    description: 'Convert colors between HEX, RGB and HSL formats.',
    longDescription:
      'Convert any color between HEX, RGB and HSL, preview it live and copy the code in the format you need.',
    category: 'developer',
    icon: Palette,
    keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl', 'color picker', 'css color'],
    relatedTools: ['json-formatter', 'base64-tool', 'sha-hash-generator'],
    seoTitle: 'Color Converter — HEX, RGB & HSL Converter Online Free',
    seoDescription:
      'Convert colors between HEX, RGB and HSL for free. Live preview and copy-to-clipboard, all in your browser.',
    content:
      'Working with color codes across CSS, design tools and image software often means switching between HEX, RGB and HSL. This converter takes any color you provide in any of the three formats and instantly shows you the equivalent values in the others, with a live preview of the color. Change any channel and every field updates together, so you can always copy the exact code your tool needs.',
    howToSteps: [
      'Pick a color with the color picker or type a HEX, RGB or HSL value.',
      'The other formats update instantly.',
      'Use the live preview to check the color.',
      'Copy the code in the format you need.',
    ],
    faq: [
      {
        question: 'What is HSL?',
        answer:
          'HSL stands for Hue, Saturation and Lightness. It is a color model that describes a color by its position on a color wheel, its intensity and its brightness.',
      },
      {
        question: 'Is there a difference between #FFF and #FFFFFF?',
        answer:
          'No — both represent the same white color. Short 3-digit HEX codes are shorthand for the full 6-digit form.',
      },
    ],
    isPopular: false,
    isBrowserSide: true,
  },
];

export const getToolBySlug = (slug: string): Tool | undefined =>
  tools.find((t) => t.slug === slug);

export const getToolsByCategory = (category: string): Tool[] =>
  tools.filter((t) => t.category === category);

export const getPopularTools = (): Tool[] =>
  tools.filter((t) => t.isPopular);

export const getRelatedTools = (tool: Tool): Tool[] =>
  tool.relatedTools
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean) as Tool[];
