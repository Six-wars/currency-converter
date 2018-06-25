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

var all_combinations = [];

for (let currency_id of currencies_ids) {
    for (let index in currencies_ids) {
        let second_currency = currencies_ids[index];
        if (second_currency != currency_id) { //avoid comparing with itself
            let comparison_string = `${currency_id}-${second_currency}`;

            //check if it's already saved
            if (all_combinations.indexOf(comparison_string) != -1) {
                all_combinations.push(comparison_string);
            }
        }
    }
}
