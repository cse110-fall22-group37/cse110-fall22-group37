
const CACHE_NAME = 'restaurant-cache';

// Installs the service worker. Feed it some initial URLs to cache
/*self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache)=>{
      // CONSTANTS
      const empty = [];       
      return cache.addAll(empty);
    }));
  
});*/


if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
     navigator.serviceWorker.register('sw.js')
     .then((registration) => {
       console.log("Service Worker registration successful")
      }, (err) => {
       console.log("Registration failed")
      })
     })
   }

   let cache_name = 'entries'
  /* let urls_to_cache = [
    '/',
    '/*.js',
    './*.js',
    "index.html",
    "./search-bar/search-bar.html", 
   ]*/

   /*self.addEventListener("install", (event) => {
    console.log("Service Worker : Installed!")

    event.waitUntil(
        (async() => {
            try {
                cache_obj = await caches.open(cache)
                cache_obj.addAll(caching_files)
            }
            catch{

            }
        })()
    )
} );*/
self.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache)=>{
        const empty = [
  ];
        return cache.addAll(empty);
      }));
    
  });
   // Activates the service worker
self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
  });
  
  
/*
   self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then((response) => {
     if(response)
      return response
     else
      return fetch(e.request)
    }) )
   });
*/

// Intercept fetch requests and cache them
self.addEventListener('fetch', function (event) {
    event.respondWith(caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).then((fetchedResponse) => {
          cache.put(event.request, fetchedResponse.clone());
          return fetchedResponse;
        });
      });
    }));
  });
  