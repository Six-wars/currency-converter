if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('js/sw.js').then(function(registration) {
		console.log('Service Worker Registered')
	}).catch(function(err) {
		console.log("Service Worker Failed to Register", err);
	})
}

//returns conversion e.g. {ALL_XCD: 0.025028}}
function getConvRate(comparison) {
    var result = {}
    let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${comparison}&compact=y`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
          let value = myJson[comparison]['val'];
          result[comparison] = value;
          return result;
      })
    return result;
}

function getCurrencies() {
    //variables used inside the fetch requests
    let currencies_ids = [];
    
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
      })

    return currencies_ids;
}

function getCombinations(currencies) {
    let all_combinations = [];

    for (let currency of currencies) {
        //and compare it to every element in the list
        for (let index in currencies_ids) {
            //get the second currency to compare to, allow comparing with itself e.g. USD_USD 
            //because site returns expected conversion rate: 1
            let second_currency = currencies_ids[index];
            let comparison_string = `${currency}_${second_currency}`;

            //If not found in the list (new comparison) to list
            if (all_combinations.indexOf(comparison_string) == -1) {
                all_combinations.push(comparison_string);
            }
        }
    }
    return all_combinations;
}

const currencies = getCurrencies();
const comparisons = getCombinations();

      
