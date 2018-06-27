if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('js/sw.js').then(registration => {
		console.log('Service Worker Registered');
	}).catch(err => {
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

//on document ready
$(document).ready(function() {
    var currencies_ids = [];
    $.get("https://free.currencyconverterapi.com/api/v5/currencies", function(response) {
        let currencies = response['results'];
        for (key in currencies) {
          let currency = currencies[key];

          //get all the currency ID's
          currencies_ids.push(currency['id']);
        }
     
    });

    $('#convert').click(function() {
        let currency1 = $('#currency1').val();
        let currency2 = $('#currency2').val();

        const invalid_inputs = ["0", "Select a Currency"];

        if (invalid_inputs.includes(currency1) || invalid_inputs.includes(currency2)) {
            //display error and break
            $('#input-error').removeClass('hidden');
            return null;
        }

        //hide above error if passed
        $('#input-error').addClass('hidden');

        //url https://free.currencyconverterapi.com/api/v5/convert?q=USD_PHP&compact=y
        let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${currency1}_${currency2}&compact=y`;

        $(this).addClass('btn-warning').removeClass('btn-primary');
        var self = this;
        $.get(url, function(response) {
            let result = response[`${currency1}_${currency2}`]['val'];
            $('#result').text(result);
            self.removeClass('btn-warning').addClass('btn-primary');
        });

    });
});
