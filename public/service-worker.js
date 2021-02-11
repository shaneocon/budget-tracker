const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";
const FILES_TO_CACHE = [
  '/',
  '/db.js',
  '/index.html',
  '/index.js',
  '/styles.css',
  '/manifest.webmanifest'
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

// activate 
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

//fetch
self.addEventListener("fetch", event => {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(event.request)
          .then(response => {
            if(response.status === 200) {
              cache.put(event.request.url, response.clone());
            }

            return response;
          })
          .catch(err => {
            return cache.match(event.request);
          });
      })
    );
   
    return;

  } 
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request)
      });
    })
  );
});
// retrieve assets from cache
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request).then( response => {
//       return response || fetch(event.request);
//     })
//   );
// });
