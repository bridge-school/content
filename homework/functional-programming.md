## FP Exercises

## Scope and Closure

1.
```javascript
  const stuff = ['backpack', 'water bottle'];
  const getOtherStuff = () => {
    console.log(stuff); // what is printed to the console?
    return [...stuff, 'books'];
  };
```

2.
```javascript
  const numberTransform = (x, y) => {
    const add(a, b) {
      return a + b;
    }

    return add(x, y) * 10;
  };

  add(1, 2) // what is the result?
  numberTransform(1, 2) // what is the result?
```

### Pure functions

For each of the following functions decide whether they are pure functions or not and explain why briefly.

1.
```javascript
  function(x, y) {
    console.log(x + y);
    return x + y;
  }
```

2.
```javascript
  function(x, y) {
    return x + y;
  }
```

3.
```javascript
  function(x, y) {
    return x + y + Math.random();
  }
```

4.
```javascript
  function(x, y) {
    const rand = Math.random();

    if(rand > 0.5) {
      throw 'This random number is greater than 0.5';
    }

    return x + y;
  }
```
