/*
 * Name: NCombinatoR
 * Description: Computes indices for the set of combinations when given the size of the full set of outcomes
   and the number of items of interest
 * Arguments:
      n - size of the set of outcomes
      r - number of items of interest
      outcomes - OPTIONAL: an array of size n containing the full set of outcomes
 * Return:
      JSON Object {
        err - error if any
        data - array of combinations
      }
    Only err or data is set at a given time. If an error occurs, the data is never populated.
 */

module.exports = function(n, r, outcomes) {
  //marks which set corresponding to the combinations needs to be populated, either the set of indices or the set of objects
  var hasOutcomes = true;

  if(typeof outcomes === 'undefined') {
    hasOutcomes = false;
  }

  //utility to check if argument is an integer
  var isIntGT0 = function(n) {
    if(parseInt(n) === n) {
      return n > 0;
    }
    return false;
  };

  //checks for invalid arguments
  if(!isIntGT0(n) || !isIntGT0(r)) {
    return {'err' : 'Invalid number arguments. n and r must be integers greater than or equal to 0.'};
  }
  if(n < r) {
    return {'err': 'Invalid number arguments. In order for a valid set of combinations, the number of chosen outcomes r cannot be larger than the size of the full set of outcomes n.'};
  }
  if(r === 0) {
    return {"data" : []};
  }
  if(hasOutcomes && (typeof outcomes !== 'object' || outcomes.length !== n)) {
    return {'err' : 'Invalid third argument. Must be an array of possible outcomes of size n. n was supplied as ' + n + '.'};
  }

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
  };

  //start off the recursion by calling comb with no arguments
  var combinations = comb();
  if(hasOutcomes) {
    combinations  = combinations.map(function(elem, ind, arr) {
      return elem.map(function (element, index, array) {
        return outcomes[element];
      });
    });
  }
  return {'data' : combinations};
}
