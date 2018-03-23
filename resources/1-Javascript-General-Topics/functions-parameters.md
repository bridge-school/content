## Parameters

The parameters of a function should inform you almost immediately what expected information this function needs to work. If these parameters are not 
passed in correctly, odds are, this function is not going to behave as intended, or will most likely throw an error.

Looking at this simple example, we can see a single parameter passed into the function `myThing`.

```javascript
function myThing(someParam){
  return someParam * 10;
}
```

Let's refactor this a bit to be a bit clearer - the name `someParam`


```js
function myThing(aNumber){
  return aNumber * 10;
}
```

Now this is a bit clearer. On first pass, it's clear now that the first parameter being passed in should be a number.


### Arguments 

[MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)

Arguments are an interesting variable found only in javascript functions, and they are what is referred to as an [ArrayLike](http://2ality.com/2013/05/quirk-array-like-objects.html).

Their relation to parameters is simple, the term arguments/parameters are often used interchangeably, but technically: 

Parameters: These are the variables that are written in the function definition, within the `()` brackets.
Arguments: These are the *values* that are passed into functions

```js

// here, param1 and param2 are technically parameters
function myFunction(param1, param2) {
  return param1 - param2;
}

// here, the numbers 10 and 5 are arguments
myFunction(10, 5);
```

So with this in mind, `arguments`, the special variable only found in functions, are an array-like object that represent the values passed into the function.
They are -not- mapped to the parameter names. What this means is that even if you do not declare parameters in your function, they still exist if your function has arguments passed in.

They are referred to as `array-like` objects because, like arrays they
1. Have all their keys as numbers going from 0 to 1 (like an array!)
2. Have a length that indicates how many properties there are currently

Without too much work, you can turn an array-like like arguments into an actual array.

```js

function noParamFunction() {
  return arguments[0] + arguments[1];
}

noParamFunction(5, 20); // this resolves to 25!! 
```