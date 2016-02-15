/**
 * @file The main source file for KA Coins, a standard HTML game currency for Khan Academy's HTML environment.
 * @author KA Developers
 * @version 0.0.1
 * @license MIT
 */

/*
A closure is used here so that not all the variables declared are added to `window`.
However, `window` is passed in as `context` so that it can be used for desired global properties.
*/
(function(context) {
  
  var ec = context.btoa; // ???
  var dc = context.atob; // ???
  
  var storage = context.localStorage; // Get the storage object to be used from `window`
  
  var json = context.JSON; // Also, store the JSON object from `window`
  
  var math = context.Math; // ... See last comment
  
  var COIN_KEY = "kac-001"; // The key used in `localStorage` to store the coins is specified here as a constant
  
  var parseInt = context.parseInt; // Add a parseInt() function locally from `window`
  
  var getCoins = function() {
    return json.parse(dc(storage.getItem(COIN_KEY))).coins; // Convert the string from storage, and return its `coins` property
  };
  
  // setCoins(coinNumber) - `coinNumber` is the new number of coins to store
  var setCoins = function(coinNumber) {
    coinNumber = math.round(math.max(coinNumber, 0)); // Make sure `coinNumber` is at least zero and is an integer
    
    storage.setItem(COIN_KEY, ec(json.stringify({
      coins: coinNumber
    }))); // Change the value of the stored string so that it now is an object with the correct number of coins.
    
    return true; // Return true to confirm that the coin-setting operation was successful
  };
  
  var changeCoins = function(coinChange) {
    if (math.abs(coinChange) > 10) {
      return false; // Coins cannot be changed by more than ten either direction at once, so return false
    }
    
    var oldCoins = parseInt(getCoins(), 10); // Get the old number of coins and parse it as a base-ten integer
    
    setCoins(oldCoins + coinChange); // Set the new coins to the old coins added to the change in coin number
    
    return true; // Return true to confirm that the coin-setting operation was successful
  };
  
  // "Export" an object containing various functions to add to/subtract from/get the number of KA Coins.
  context.KACoins = {
    addOne: function() {
      return changeCoins(1);
    },
    subtractOne: function() {
      return changeCoins(-1);
    },
    addFive: function() {
      return changeCoins(5);
    },
    subtractFive: function() {
      return changeCoins(-5);
    },
    addTen: function() {
      return changeCoins(10);
    },
    get: function() {
      return parseInt(getCoins(), 10);
    }
  };
  
})(window);
