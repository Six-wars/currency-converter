if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('js/sw.js').then(function(registration) {
		console.log('Service Worker Registered')
	}).catch(function(err) {
		console.log("Service Worker Failed to Register", err);
	})
}


/* Buggy Code 
function getCurrenciesAndCombinations() {
    //variables used inside the fetch requests
    let currencies_ids = [];
    let all_combinations = [];
    
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
          for (let currency of currencies_ids) {
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
      });

    return currencies_ids, all_combinations;
}

const currencies, comparison = getCurrenciesAndCombinations();

End Buggy Code */

//Switch to using jQuery

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

var currencies_ids = [];
var all_combinations = [];
$.get("https://free.currencyconverterapi.com/api/v5/currencies", response => {
    let currencies = response['results'];
    for (key in currencies) {
      let currency = currencies[key];

      //get all the currency ID's
      currencies_ids.push(currency['id']);
    }

    for (currency of currencies_ids) {
        //add them to the select list of currencies
        let option_text = `<option value="${currency}">${currency}</option>`;
        $('#currency1').append(option_text);
        $('#currency2').append(option_text);

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

    
});

//on document ready
$(document).ready(function() {
    
});
