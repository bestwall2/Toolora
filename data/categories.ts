import {
  FileImage,
  FileText,
  Type,
  Code2,
  Calculator,
  RefreshCcw,
  Sparkles,
  QrCode,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  longDescription: string;
  keywords: string[];
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const categories: Category[] = [
  {
    id: 'image',
    name: 'Image Tools',
    slug: 'image',
    description: 'Compress, resize, convert and crop images directly in your browser.',
    seoTitle: 'Image Tools — Compress, Resize, Convert & Crop Images',
    seoDescription:
      'Free online image tools to compress, resize, convert and crop photos and graphics. Everything runs in your browser — no upload, no sign-up.',
    longDescription:
      'Everything you need to prepare images for the web in one place. Shrink a photo before sharing it, resize a picture to exact pixel dimensions, switch between JPG, PNG and WebP, or crop to the perfect ratio for a social post. Every image tool runs entirely in your browser, so your files stay on your own device.',
    keywords: ['image tools', 'compress image', 'resize image', 'crop image', 'convert image'],
    icon: FileImage,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
  },
  {
    id: 'pdf',
    name: 'PDF Tools',
    slug: 'pdf',
    description: 'Merge, split, compress and convert PDF files with ease.',
    seoTitle: 'PDF Tools — Merge, Split & Compress PDF Files',
    seoDescription:
      'Free online PDF tools to merge, split, compress and convert PDF files. Browser-based processing keeps your documents private and secure.',
    longDescription:
      'Work with PDF documents without installing desktop software. Combine several PDFs into one file, pull out the pages you need, reduce file size, or turn pages into images. Processing happens locally in your browser, so confidential documents never leave your computer.',
    keywords: ['pdf tools', 'merge pdf', 'split pdf', 'compress pdf', 'pdf to image'],
    icon: FileText,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/40',
  },
  {
    id: 'text',
    name: 'Text Tools',
    slug: 'text',
    description: 'Count words, convert cases, clean and transform text instantly.',
    seoTitle: 'Text Tools — Word Counter, Case Converter & Cleaner',
    seoDescription:
      'Free online text tools to count words, convert case, clean formatting and remove duplicate lines. Instant, browser-based and private.',
    longDescription:
      'Quick utilities for anyone who writes. Count words and characters as you type, switch between uppercase, lowercase and title case, strip messy whitespace, and de-duplicate lists in a click. Nothing you paste ever leaves your browser.',
    keywords: ['text tools', 'word counter', 'case converter', 'text cleaner', 'remove duplicate lines'],
    icon: Type,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/40',
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    slug: 'developer',
    description: 'Format JSON, encode Base64, generate UUIDs and decode JWTs.',
    seoTitle: 'Developer Tools — JSON Formatter, Base64, UUID & JWT',
    seoDescription:
      'Free online developer tools to format JSON, encode Base64, generate UUIDs and decode JWTs. Fast, browser-based utilities for developers.',
    longDescription:
      'Small utilities that save developers time. Format and validate JSON, encode and decode Base64, generate cryptographically secure UUIDs, and inspect JWT payloads. Every tool runs locally in your browser, so sensitive tokens and data are never transmitted anywhere.',
    keywords: ['developer tools', 'json formatter', 'base64 encoder', 'uuid generator', 'jwt decoder'],
    icon: Code2,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/40',
  },
  {
    id: 'calculator',
    name: 'Calculators',
    slug: 'calculator',
    description: 'Quick and accurate calculators for everyday maths.',
    seoTitle: 'Free Online Calculators — Percentage, Age & Discount',
    seoDescription:
      'Free online calculators for percentages, age and discounts. Get accurate results instantly, right in your browser.',
    longDescription:
      'Handy calculators for everyday decisions. Work out a percentage of a number, find your exact age down to the day, or see how much a sale discount really saves you. Results are accurate and instant, with no sign-up and no intrusive ads.',
    keywords: ['online calculator', 'percentage calculator', 'age calculator', 'discount calculator'],
    icon: Calculator,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/40',
  },
  {
    id: 'converter',
    name: 'Converters',
    slug: 'converter',
    description: 'Convert between formats, units and more.',
    seoTitle: 'Converters — Online Format & Unit Converters',
    seoDescription:
      'Free online converters to change between formats and units. New converters are added regularly — check back soon.',
    longDescription:
      'A growing collection of converters for switching between formats and units. This category is being expanded, and new converters are added on a regular basis — check back to find the conversion tool you need.',
    keywords: ['online converter', 'format converter', 'unit converter'],
    icon: RefreshCcw,
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-50 dark:bg-teal-950/40',
  },
  {
    id: 'qr',
    name: 'QR Code',
    slug: 'qr',
    description: 'Generate QR codes for URLs, text, emails and WiFi.',
    seoTitle: 'QR Code Tools — Free QR Code Generator',
    seoDescription:
      'Generate QR codes online for free. Create codes for URLs, text, email and WiFi and download them as high-quality PNG images.',
    longDescription:
      'Create scannable QR codes in seconds. Encode a URL, plain text, an email address or a WiFi network, choose your size and error correction level, and download a crisp PNG. Generation happens locally in your browser — no account needed.',
    keywords: ['qr code generator', 'create qr code', 'qr code maker'],
    icon: QrCode,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
  },
  {
    id: 'ai',
    name: 'AI Tools',
    slug: 'ai',
    description: 'Smart tools powered by AI — coming soon.',
    seoTitle: 'AI Tools — Smart Browser-Based Utilities (Coming Soon)',
    seoDescription:
      'Coming soon: smart AI-powered tools on Toollora. Follow along as we add useful, privacy-friendly utilities powered by AI.',
    longDescription:
      'AI-assisted tools are in the works. We are building smart utilities that stay true to Toollora\u2019s privacy-first approach — helpful, fast and easy to use. This category is coming soon, so check back to see what\u2019s new.',
    keywords: ['ai tools', 'ai utilities'],
    icon: Sparkles,
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-50 dark:bg-pink-950/40',
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);