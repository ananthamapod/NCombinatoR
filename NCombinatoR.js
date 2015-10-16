  function NCombinatoR(n, r) {
    //inner function for heavy lifting
    var comb = function(indices) {
      if(indices === undefined) {
        indices = [];
      }
      var ret = [];
      if(indices.length < r-1) {
        var i = 0;
        if(indices.length !== 0) {
          i = indices[indices.length-1] + 1;
        }
        for(i; i < n; i++) {
          var arr = indices.slice(0);
          arr.push(i);
          var combs = comb(arr);
          for(var j = 0; j < combs.length; j++) {
            ret.push(combs[j]);
          }
        }
      } else {
        ret = [];
        var test = indices[indices.length-1];
        if(test < n-1) {
          test++;
          while(test <= n-1) {
            var arr = indices.slice(0);
            arr.push(test);
            ret.push(arr);
            test++;
          }
        }
      }
      return ret;
    }

    return comb();
  }
