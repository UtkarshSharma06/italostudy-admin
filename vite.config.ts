import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 8081,
    strictPort: true,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  // Drop console/debugger statements from production builds only
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks(id) {
          // ─── Core React runtime (smallest, most shared) ───────────────────
          if (id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')) return 'chunk-react';

          // ─── Routing ──────────────────────────────────────────────────────
          if (id.includes('react-router-dom') ||
            id.includes('react-router/')) return 'chunk-router';

          // ─── Supabase (large, changes infrequently) ───────────────────────
          if (id.includes('@supabase')) return 'chunk-supabase';

          // ─── UI Primitives — Radix UI components ─────────────────────────
          if (id.includes('@radix-ui')) return 'chunk-radix';

          // ─── Animations ───────────────────────────────────────────────────
          if (id.includes('framer-motion')) return 'chunk-motion';

          // ─── Charts / Data Visualization ─────────────────────────────────
          if (id.includes('recharts') ||
            id.includes('d3-') ||
            id.includes('victory')) return 'chunk-charts';

          // ─── Rich Text / Editor (very heavy, rarely changes) ─────────────
          if (id.includes('@tinymce') ||
            id.includes('tinymce')) return 'chunk-tinymce';

          // ─── i18n / Localization ──────────────────────────────────────────
          if (id.includes('i18next') ||
            id.includes('react-i18next')) return 'chunk-i18n';

          // ─── Three.js / 3D (VERY HEAVY) ──────────────────────────────────
          if (id.includes('three') ||
            id.includes('@react-three')) return 'chunk-three';

          // ─── TensorFlow / AI (VERY HEAVY) ────────────────────────────────
          if (id.includes('@tensorflow') ||
            id.includes('@mediapipe')) return 'chunk-ai';

          // ─── PDF Generation / OCR ────────────────────────────────────────
          if (id.includes('jspdf') ||
            id.includes('html2canvas') ||
            id.includes('tesseract.js')) return 'chunk-pdf-ocr';

          // ─── AWS / S3 SDK ────────────────────────────────────────────────
          if (id.includes('@aws-sdk')) return 'chunk-aws';

          // ─── Capacitor (Mobile SDK) ──────────────────────────────────────
          if (id.includes('@capacitor')) return 'chunk-capacitor';

          // ─── LiveKit / WebRTC ────────────────────────────────────────────
          if (id.includes('livekit')) return 'chunk-livekit';

          // ─── Utility libraries ────────────────────────────────────────────
          if (id.includes('date-fns') ||
            id.includes('clsx') ||
            id.includes('class-variance-authority') ||
            id.includes('tailwind-merge') ||
            id.includes('lucide-react')) return 'chunk-utils';

          // ─── KaTeX — math renderer, only used in protected practice pages ─
          // Safe to split: pure leaf-node library, no app init dependencies
          if (id.includes('node_modules/katex')) return 'chunk-katex';

          // ─── Everything else in node_modules ─────────────────────────────
          if (id.includes('node_modules')) return 'chunk-vendor';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      }
    },
    minify: 'esbuild',
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    target: ['es2020', 'chrome96', 'safari15', 'firefox95'],
    cssMinify: true,
  },
  optimizeDeps: {
    include: [
      'react', 'react-dom', 'react-router-dom',
      '@supabase/supabase-js', 'framer-motion',
      'clsx', 'tailwind-merge',
      'recharts',
    ],
  },
}));
