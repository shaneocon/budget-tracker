const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";
const FILES_TO_CACHE = [
  '/',
  '/db.js',
  '/index.html',
  '/manifest.webmanifest',
  '/css/styles.css',
  '/icon/icon-192x192.png',
  '/icon/icon-512x512.png',
];


// install event handler
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log("Pre-cached files stored successfully");
      return cache.addAll(FILES_TO_CACHE)
    })
  );
  console.log('Installed');
  self.skipWaiting();
});

// retrieve assets from cache
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request).then( response => {
//       return response || fetch(event.request);
//     })
//   );
// });
