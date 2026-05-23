const CACHE = 'kt-v1'
const PRECACHE = ['/', '/index.html']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)))
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      return (
        r ||
        fetch(e.request).then((resp) => {
          return caches.open(CACHE).then((c) => {
            c.put(e.request, resp.clone())
            return resp
          })
        })
      )
    })
  )
})
