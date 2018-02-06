## Functional Programming (FP)

### Pure Functions

* Idempotent: Given the same inputs, an idempotent function will always return the same output.

* Free from side-effects: Pure functions can be safely applied with no side-effects, meaning that they do not mutate any shared state or mutable arguments, and other than their return value, they don’t produce any observable output, including thrown exceptions, triggered events, I/O devices, network, console, display, logs, etc...

Ideally, in functional programming we should use pure functions as much as we can to create composable and reusable units of code.

## Immutability

An immutable value is one that never changes after it has been created. In JavaScript, strings and numbers are immutable by design.
```javascript
  const str = 'Hello world!';
  console.log(str.split(' ')); // ['Hello', 'world!']
  console.log(str) // should still return 'Hello world!' because strings are immutable
```

Objects and arrays (which is a type of object) are not immutable.
```javascript
  let arr = [];
  const newArr = arr.push(2);
  console.log(arr); // [2]
```
Out initial array's value has changed!

## Examples

1. Find all the odd numbers in an array and return a new array containing only those numbers.

**Imperatively**
```javascript
  function getOnlyOddNumbers(array) {
    let newArray = [];
    for(let i = 0; i++; i < array.length) {
      if (array[i] % 2 !== 0) {
        newArr.push(array[i]);
      }
    }

    return newArray;
  }
```

**Functionally**
```javascript
  Array.prototype.filter = (fn) => {
    // write the filter function
  }

  const isOdd = number => number % 2 !== 0;

  function getOnlyOddNumbers(array) {
    return array.filter(isOdd);
  }
```

2. Multiply every number in an array by 10 and return the new array.

**Imperatively**
```javascript
  function multiplyNumbers(array) {
    let newArray = [];

    for(let i = 0; i++; i < array.length) {
      newArray.push(array[i] * 10);
    }

    return newArray;
  }
```

**Functionally**
```javascript
  Array.prototype.map = fn => {
    // write the map function
  }

  const multiplyBy10 = number => number * 10;

  function multiplyNumbers(array) {
    return array.map(multiplyBy10);
  }
```

3. Get the average of the numbers in an array

**Imperatively**
```javascript
  function getAverage(array) {
    let sum = 0;

    for(let i = 0; i++; i < array.length) {
      sum += array[i];
    }

    return sum / array.length;
  }
```

**Functionally**
```javascript
  const calculateAverage = (acc, value, index, array) => {
    const length = array.length;

    if (index === length - 1) {
      // if its the last value calculate average
      return (acc + value) / length;
    }

    // otherwise continue to sum
    return acc + value;
  };

  function getAverage(array) {
    return array.reduce(calculateAverage, 0)
  }
```

4. Get the average of all the odd numbers in an array that are multiplied by 10

This would be a nightmare imperatively. Luckily we have our functional components!

**Imperatively**
```javascript
  function complexTransformation(array) {
    const onlyOddNumbers = getOnlyOddNumbers(array);
    const multipliedBy10 = multiplyNumbers(onlyOddNumbers);

    return getAverage(multipliedBy10);
  }
```

**Functionally**
```javascript
  function complexTransformation(array) {
    return array.filter(isOdd).map(multiplyBy10).reduce(calculateAverage, 0);
  }
```
