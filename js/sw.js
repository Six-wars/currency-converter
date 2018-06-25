var cacheName = 'v1';
var cacheFiles = [
	'./',
	'./index.html',
	'./css/bootstrap.min.css',
	'./css/style.css',
	'script.js',
	'./img/bootstrap-solid.svg'
]

self.addEventListener('install', function(e) {
	console.log("[ServiceWorker] Installed")

	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log("[ServiceWorker] Caching cacheFiles");
			return cache.addAll(cacheFiles);
		})
	)
})

self.addEventListener('activate', function(e) {
	console.log("[ServiceWorker] Activated")
})

self.addEventListener('fetch', function(e) {
	console.log("[ServiceWorker] Fetching", e.request.url);
})