// Linc AI service worker — makes the app installable and work offline.
const CACHE = 'linc-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;   // don't cache score posts etc.
  e.respondWith(
    fetch(e.request)
      .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{}); return r; })
      .catch(() => caches.match(e.request))   // offline → use the saved copy
  );
});
