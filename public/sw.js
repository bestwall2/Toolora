const VERSION = 'v1';
const PRECACHE = `${VERSION}-precache`;
const PAGES = `${VERSION}-pages`;
const ASSETS = `${VERSION}-assets`;

const PRECACHE_URLS = ['/offline.html', '/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => !key.startsWith(VERSION)).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  const isAsset = url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/fonts/');

  if (isAsset) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  if (
    url.pathname === '/offline.html' ||
    url.pathname === '/manifest.webmanifest' ||
    url.pathname.startsWith('/icon-') ||
    url.pathname.startsWith('/apple-icon')
  ) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok || response.type === 'opaque') {
      const copy = response.clone();
      const cache = await caches.open(PAGES);
      cache.put(request, copy);
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    const fallback = await caches.match('/offline.html');
    if (fallback) {
      return new Response(fallback.body, {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Toollora-Offline': '1',
        },
      });
    }
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(ASSETS);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok || response.type === 'opaque') {
        const copy = response.clone();
        cache.put(request, copy);
      }
      return response;
    })
    .catch(() => undefined);

  return cached || (await network);
}