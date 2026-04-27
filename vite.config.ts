import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from 'vite-plugin-pwa';
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8081,
    hmr: { clientPort: 8081 },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Italostudy Admin Panel',
        short_name: 'Admin Panel',
        description: 'Administrative Control Panel for Italostudy.',
        theme_color: '#6366f1',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'logo-dark-compact.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo-dark-compact.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'logo-dark-compact.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        // Increase the maximum size for precaching (to 5MB)
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/ik\.imagekit\.io\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'imagekit-images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // <== 30 days
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    }),
    {
      name: 'platform-portals-rewrite',
      configureServer(server: any) {

        server.middlewares.use(async (req: any, res: any, next: any) => {
          const url = (req.url || '').split('?')[0].replace(/\/$/, '') || '/';

          // ── PWA & Static Asset Safety ────────────────────────────────────
          // Do not rewrite requests for manifest, service worker, or static files
          if (
            url.includes('manifest.webmanifest') ||
            url.includes('manifest.json') ||
            url.includes('registerSW.js') ||
            url.includes('sw.js') ||
            url.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2)$/)
          ) {
            return next();
          }

          const rewrites: Record<string, string> = {
            '/': 'index.html',
            '/it': 'index-it.html',
            '/tr': 'index-tr.html',
            '/status': 'status.html',
            '/roadmap': 'roadmap.html',
            '/updates': 'updates.html',
            '/method': 'method.html',
            '/imat': 'imat.html',
            '/cent-s': 'cent-s.html',
            '/exams': 'exams.html',
            '/contact': 'contact.html',
            '/blog': 'blog.html',
            '/resources': 'resources.html',
            '/cent-s-mock': 'cent-s-mock.html',
            '/imat-mock': 'imat-mock.html'
          };

          let targetFile = rewrites[url];

          // Dynamic detection for cluster pages (e.g. /imat-syllabus-2026 -> imat-syllabus-2026.html)
          if (!targetFile && url.length > 1) {
            const fileName = url.startsWith('/') ? url.slice(1) : url;
            const potentialFile = fileName.endsWith('.html') ? fileName : fileName + '.html';
            const filePath = path.resolve(__dirname, potentialFile);
            const publicPath = path.resolve(__dirname, 'public', potentialFile);

            if (fs.existsSync(filePath)) {
              targetFile = potentialFile;
            } else if (fs.existsSync(publicPath)) {
              targetFile = potentialFile;
            }
          }

          if (targetFile) {
            const rootPath = path.resolve(__dirname, targetFile);
            const publicPath = path.resolve(__dirname, 'public', targetFile);

            let finalPath = fs.existsSync(rootPath) ? rootPath : (fs.existsSync(publicPath) ? publicPath : null);

            if (finalPath) {
              const html = fs.readFileSync(finalPath, 'utf8');
              const transformedHtml = await server.transformIndexHtml(url, html);
              res.setHeader('Content-Type', 'text/html');
              return res.end(transformedHtml);
            }
          }
          next();
        });
      }
    }
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
