'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Lazy load components to optimize package chunks
export const toolComponents: Record<string, React.ComponentType> = {
  // Image
  'image-compressor': dynamic(() => import('@/components/tools/image/ImageCompressor').then((m) => m.ImageCompressor), {
    ssr: false,
  }),
  'image-resizer': dynamic(() => import('@/components/tools/image/ImageResizer').then((m) => m.ImageResizer), {
    ssr: false,
  }),
  'image-converter': dynamic(() => import('@/components/tools/image/ImageConverter').then((m) => m.ImageConverter), {
    ssr: false,
  }),
  'image-cropper': dynamic(() => import('@/components/tools/image/ImageCropper').then((m) => m.ImageCropper), {
    ssr: false,
  }),

  // PDF
  'pdf-merger': dynamic(() => import('@/components/tools/pdf/PdfMerger').then((m) => m.PdfMerger), {
    ssr: false,
  }),
  'pdf-splitter': dynamic(() => import('@/components/tools/pdf/PdfSplitter').then((m) => m.PdfSplitter), {
    ssr: false,
  }),
  'pdf-compressor': dynamic(() => import('@/components/tools/pdf/PdfCompressor').then((m) => m.PdfCompressor), {
    ssr: false,
  }),
  'pdf-to-images': dynamic(() => import('@/components/tools/pdf/PdfToImages').then((m) => m.PdfToImages), {
    ssr: false,
  }),

  // Text
  'word-counter': dynamic(() => import('@/components/tools/text/WordCounter').then((m) => m.WordCounter), {
    ssr: false,
  }),
  'case-converter': dynamic(() => import('@/components/tools/text/CaseConverter').then((m) => m.CaseConverter), {
    ssr: false,
  }),
  'remove-duplicate-lines': dynamic(() => import('@/components/tools/text/RemoveDuplicateLines').then((m) => m.RemoveDuplicateLines), {
    ssr: false,
  }),
  'text-cleaner': dynamic(() => import('@/components/tools/text/TextCleaner').then((m) => m.TextCleaner), {
    ssr: false,
  }),

  // Dev
  'json-formatter': dynamic(() => import('@/components/tools/dev/JsonFormatter').then((m) => m.JsonFormatter), {
    ssr: false,
  }),
  'base64-tool': dynamic(() => import('@/components/tools/dev/Base64Tool').then((m) => m.Base64Tool), {
    ssr: false,
  }),
  'uuid-generator': dynamic(() => import('@/components/tools/dev/UuidGenerator').then((m) => m.UuidGenerator), {
    ssr: false,
  }),
  'jwt-decoder': dynamic(() => import('@/components/tools/dev/JwtDecoder').then((m) => m.JwtDecoder), {
    ssr: false,
  }),

  // Calc
  'percentage-calculator': dynamic(() => import('@/components/tools/calc/PercentageCalculator').then((m) => m.PercentageCalculator), {
    ssr: false,
  }),
  'age-calculator': dynamic(() => import('@/components/tools/calc/AgeCalculator').then((m) => m.AgeCalculator), {
    ssr: false,
  }),
  'discount-calculator': dynamic(() => import('@/components/tools/calc/DiscountCalculator').then((m) => m.DiscountCalculator), {
    ssr: false,
  }),

  // QR
  'qr-code-generator': dynamic(() => import('@/components/tools/qr/QrCodeGenerator').then((m) => m.QrCodeGenerator), {
    ssr: false,
  }),
};
