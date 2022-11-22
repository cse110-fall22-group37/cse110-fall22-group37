

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

let cache_name = 'mysite-v1'
let urls_to_cache = [
 '/',
 '/index.html',
 'restaurantEntry/',

]
self.addEventListener("install", (event) => {
    console.log("Service Worker : Installed!")

    event.waitUntil(
        
        (async() => {
            try {
                cache_obj = await caches.open(cache_name)
                cache_obj.addAll(caching_files)
            }
            catch(error){
                console.log(error);
                console.log("error occured while caching...")
            }
        })()
    )
} )
self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then((response) => {
     if(response)
      return response
     else{
         console.log(e.request);
      return fetch(e.request)
     }
    }) )
   })