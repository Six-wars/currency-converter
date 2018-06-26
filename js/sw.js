self.addEventListener('install', function(event) {
	console.log("[ServiceWorker] Installed")

	event.waitUntil(
		caches.open('main-cache-v1').then(function(cache) {
			return cache.addAll(
					[
						'../',
						'../js/script.js',
						'../css/style.css',
						'../css/bootstrap.min.css',
						'../js/jquery.min.js',
						'../img/bootstrap-solid.svg',
						//'https://free.currencyconverterapi.com/api/v5/currencies'
					]
				);
		})
	)
})

self.addEventListener('activate', function(event) {
	console.log("[ServiceWorker] Activated")
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) return response;
			return fetch(event.request);
		})
	);
})