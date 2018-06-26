if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('js/sw.js').then(function(registration) {
		console.log('Service Worker Registered')
	}).catch(function(err) {
		console.log("Service Worker Failed to Register", err);
	})
}

//variables used inside the fetch requests
var currencies_ids = [];
var all_combinations = [];
var results = {};

fetch('https://free.currencyconverterapi.com/api/v5/currencies')
  .then(response => {
    return response.json();
  })
  .then(myJson => {
    let currencies = myJson['results'];
    for (key in currencies) {
      let currency = currencies[key];

      //get all the currency ID's
      currencies_ids.push(currency['id']);
    } 
    return currencies_ids;
  }).then(currencies_ids => {
      //loop through each item in the list...
      for (let currency_id of currencies_ids) {
          //and compare it to every element in the list
          for (let index in currencies_ids) {
              //get the second currency to compare to, allow comparing with itself e.g. USD_USD 
              //because site returns expected conversion rate: 1
              let second_currency = currencies_ids[index];
              let comparison_string = `${currency_id}_${second_currency}`;

              //If not found in the list (new comparison) to list
              if (all_combinations.indexOf(comparison_string) == -1) {
                  all_combinations.push(comparison_string);
              }
          }
      }
      //free version has a limit so need to eventually will need to query without exceeding the limit
      return all_combinations.slice(0, 2); 
  }).then(all_combinations => {
      for (let comparison of all_combinations) {
          let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${comparison}&compact=y`;
          fetch(url)
            .then(response => {
              return response.json();
            })
            .then(myJson => {
                let value = myJson[comparison]['val'];
                results[comparison] = value;
            })
      }
  });

      
