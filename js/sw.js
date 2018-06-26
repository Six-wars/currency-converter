var cacheName = 'v1';

self.addEventListener('install', function(e) {
	console.log("[ServiceWorker] Installed")
})

self.addEventListener('activate', function(e) {
	console.log("[ServiceWorker] Activated")

	e.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {
				if (thisCacheName !== cacheName) {
					console.log("[ServiceWorker] Removing Cached File from Cache - ", thisCacheName);
					return caches.delete(thisCacheName);
				}
			}))
		})
	)
})

self.addEventListener('fetch', function(e) {
	console.log("[ServiceWorker] Fetching", e.request.url);
})