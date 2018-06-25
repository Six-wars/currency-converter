if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('js/sw.js').then(function(registration) {
		console.log('Service Worker Registered')
	}).catch(function(err) {
		console.log("Service Worker Failed to Register", err);
	})
}

var currencies_ids = [];
fetch('https://free.currencyconverterapi.com/api/v5/currencies')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    let currencies = myJson['results'];
    for (key in currencies) {
      let currency = currencies[key];

      //get all the currency ID's
      currencies_ids.push(currency['id']);
    }
  });

console.log(currencies_ids);