if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('js/sw.js').then(function(registration) {
		console.log('Service Worker Registered')
	}).catch(function(err) {
		console.log("Service Worker Failed to Register", err);
	})
}

fetch("https://free.currencyconverterapi.com/api/v5/currencies", {
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
    },
    method: 'GET',
    mode: 'cors', 
    redirect: 'follow',
    referrer: 'no-referrer',
    })
    .then(response => response.json()).then((json) => {
      	console.log(json)
	})