// ⚔️ Dragones & Mazmorras 5e — Service Worker
// Permite instalación y uso offline

const CACHE_NAME = 'dnd5e-v1.0.0';
const OFFLINE_URL = './index.html';

const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Cinzel+Decorative:wght@400;700&family=IM+Fell+English:ital@0;1&family=Uncial+Antiqua&display=swap',
];

// INSTALL: Cachear recursos esenciales
self.addEventListener('install', event => {
  console.log('[D&D SW] Instalando Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[D&D SW] Cacheando recursos offline');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('[D&D SW] Algunos recursos no se pudieron cachear:', err);
      });
    })
  );
  self.skipWaiting();
});

// ACTIVATE: Limpiar caches antiguas
self.addEventListener('activate', event => {
  console.log('[D&D SW] Activando Service Worker...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[D&D SW] Eliminando cache antigua:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// FETCH: Estrategia Network-First con fallback a cache
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Peticiones a la API de Anthropic: siempre network (sin cache)
  if (url.hostname === 'api.anthropic.com') {
    event.respondWith(fetch(request));
    return;
  }

  // Google Fonts: Cache-First
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        }).catch(() => new Response('', { status: 408 }));
      })
    );
    return;
  }

  // Recursos locales: Network-First con fallback a cache
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).then(cached => {
          if (cached) return cached;
          if (request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
          return new Response('Sin conexión', { status: 503, statusText: 'Offline' });
        });
      })
  );
});

// Mensajes desde la app
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
  if (event.data === 'getCacheInfo') {
    caches.open(CACHE_NAME).then(cache => cache.keys()).then(keys => {
      event.ports[0].postMessage({ cached: keys.length, version: CACHE_NAME });
    });
  }
});
