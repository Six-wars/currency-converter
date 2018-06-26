var cacheName = 'main-cache-v1';
var cacheurls = [
	'/',
	'js/script.js',
	'css/style.css',
	'css/bootstrap.min.css',
	'js/jquery.min.js',
	'img/bootstrap-solid.svg'
]

self.addEventListener('install', event => {
	console.log("[ServiceWorker] Installed")

	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(cacheurls);
		})
	)
})

self.addEventListener('activate', event => {
	console.log("[ServiceWorker] Activated")
})

self.addEventListener('fetch', event => {
	event.respondWith(

	);
})