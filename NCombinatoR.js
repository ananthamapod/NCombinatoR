/*
 * Name: NCombinatoR
 * Description: Computes indices for the set of combinations when given the size of the list of outcomes,
   and the number of items of interest
 * Arguments:
      n - size of the list of outcomes
      r - number of items of interest
 * Return: array of combinations
 */

function NCombinatoR(n, r) {
  //check for incorrect arguments
  if(!isInt(n) || !isInt(r)) {
    return [];
  }

  //utility to check if argument is an integer
  var isInt = function(n) {
    return parseInt(n) === n;
  };

  //inner function for heavy lifting
  var comb = function(indices) {

    if(indices === undefined) {
      indices = [];
    }
    //return array of combinations
    var ret = [];
    //for all but the last index of the combination, recurse
    if(indices.length < r-1) {
      //set the iterator to start at 0 to account for the first index of the combination
      var i = 0;
      //if not in the first index of the combination, the iterator starts at the point beyond the previous index
      if(indices.length !== 0) {
        i = indices[indices.length-1] + 1;
      }

      for(i; i < n-(r-indices.length-1); i++) {
        var arr = indices.slice(0);
        arr.push(i);

        //add all combinations generated to the return list
        Array.prototype.push.apply(ret, comb(arr));
      }
    //at the last index of the combination, escape condition, don't recurse
    } else {
      var test = indices[indices.length-1];
      if(test === undefined) {
        test = -1;
      }

      while(test < n-1) {
        test++;
        var arr = indices.slice(0);
        arr.push(test);

        ret.push(arr);
      }
    }
    return ret;
  }

  return comb([]);
}

var combs = NCombinatoR("",1);
console.log(combs);
console.log(combs.length);
