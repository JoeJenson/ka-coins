/**
 * @file The main source file for KA Coins, a standard HTML game currency for Khan Academy's HTML environment.
 * @author Joe Jenson
 * @version 0.0.1
 * @license MIT
 */

/*
A closure is used here so that not all the variables declared are added to `window`.
However, `window` is passed in as `context` so that it can be used for desired global properties.
*/
(function(context) {
  
  var storage = context.localStorage; // Get the storage object to be used from `window`
  
  var json = context.JSON; // Also, store the JSON object from `window`
  
  var math = context.Math; // ... See last comment
  
  var COIN_KEY = "kac-001"; // The key used in `localStorage` to store the coins is specified here as a constant
  
  var getCoins = function() {
    return json.parse(storage.getItem(COIN_KEY)).coins; // Convert the string from storage, and return its `coins` property
  };
  
  var setCoins = function(coinNumber) {
    coinNumber = Math.max(coinNumber, 0); // Make sure `coinNumber` is at least zero
    
    storage.setItem(COIN_KEY, json.stringify({
      coins: coinNumber
    })); // Change the value of the stored string so that it now is an object with the correct number of coins.
    
    return true; // Return true to confirm that the coin-setting operation was successful
  };
  
})(window);
