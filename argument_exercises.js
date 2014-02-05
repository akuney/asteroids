var sum = function() {
  var totalSum = 0;

  for (var i = 0; i < arguments.length; i++) {
    totalSum += arguments[i];
  }

  return totalSum;
}

console.log(sum(1,2,3,4,5))

Function.prototype.myBind = function(obj) {
  var that = this;
  var outerArgs = Array.prototype.slice.call(arguments, 1);

  return function() {
    var innerArgs = Array.prototype.slice.call(arguments);
    var totalArgs = outerArgs.concat(innerArgs);
    console.log(totalArgs);
    return that.apply(obj, totalArgs);
  }
}

var cat = {
  age: 5,

  getOlder: function(i){
    return this.age += i;
  }
};

 var ageOneYear = function() {
  return this.age;
}


console.log(ageOneYear.myBind(cat, 3)());

var curriedSum = function(numArgs){
  var numbers = [];

  var _curriedSum = function(num){
    numbers.push(num);
    if (numbers.length === numArgs){
      var sum = 0;
      for (var i = 0; i < numbers.length; i++){
        sum += numbers[i];
      }
      return sum;
    }
    else {
      return _curriedSum;
    }
  }

  return _curriedSum;
}

Function.prototype.curry = function(obj, numArgs) {
  var args = [];
  var that = this;

  var _curry = function(arg) {
    args.push(arg);

    if (args.length === numArgs) {
      return that.apply(obj, args);
    } else {
      return _curry;
    }
  }

  return _curry;
}

var sum1 = sum.curry(null, 4);
console.log(sum1(5)(30)(20)(5));

var older = cat.getOlder.curry(cat, 4);
console.log(older(1)(2)(3)(4));