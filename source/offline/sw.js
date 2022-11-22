if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((registration) => {
            console.log("Service Worker registration successful: ", registration)
        }, (err) => {
            console.log("Registration failed", err)
        })
    })
}

let cache_name = 'mysite-v1'

let urls_to_cache = [
 '/',
 'http://127.0.0.1:5501/source/offline/index.html',
 'http://127.0.0.1:5501/source/offline/index.html?',
 //'/searchBar',
 //'/restaurantEntry',



]

self.addEventListener('install', (e) => {
    console.log("install");
 e.waitUntil(caches.open(cache_name).then((cache) => {
     for(let i = 0; i < 4; i++){
         console.log(urls_to_cache[i]);
         cache.add(urls_to_cache[i]);
     }
  //return cache.addAll(urls_to_cache)
 }) )
})
/*
self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then((response) => {
     if(response)
      return response
     else
      return fetch(e.request)
    }) )
})

*/
self.addEventListener('fetch', function (event) {
    event.respondWith(caches.open(cache_name).then((cache) => {
      // Respond with the image from the cache or from the network
      return cache.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).then((fetchedResponse) => {
            if(fetchedResponse){
                cache.put(event.request, fetchedResponse.clone());
                return fetchedResponse;
            }else{
                return fetch(event.request)

            }
        });
      });
    }));
   });