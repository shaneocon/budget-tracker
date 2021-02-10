// install event handler
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('static').then( cache => {
      return cache.addAll([
        '/',
        '/db.js',
        '/index.html',
        '/manifest.webmanifest',
        '/css/styles.css',
        '/icon/icon-192x192.png',
        '/icon/icon-512x512.png',
      ]);
    })
  );
  console.log('Install');
  self.skipWaiting();
});

// retrieve assets from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then( response => {
      return response || fetch(event.request);
    })
  );
});
