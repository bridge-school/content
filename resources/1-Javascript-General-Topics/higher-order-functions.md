### What is a higher order function?
- Functions that operate on other functions
    - either by taking them as arguments or by returning them
- Functions with callbacks are considered higher order functions 

```js
const functionToPass = someNumber => someNumber * 2;


// this function does NOT return a function, it returns the RESULT of a function call + arithmetic
const higherOrderFunctionWithCallback = (number, callBackFunction) => callBackFunction(number) + number;
```

- Functions that return functions are also higher order functions

```js
const higherOrderFunctionThatReturnsAFunction = number1 => number2 => number1 + number2;

// in traditional, pre-arrow function javascript, it would be written like this:
function sameAsAbove(number1) {
  return function(number2) {
    return number1 + number2;
  }
}
```

### What problem does it solve?
- This is a concept that underpins a lot of the complexity hidden away in libraries/frameworks, 
there is value in understanding it

- `Partial functions` in javascript are functions you want to provide arguments to 'over time', or not all at once
- These are sometimes written using bind (this is less common now)
```js
const add = (num1, num2) => num1 + num2;

// the first argument in the bind updates the `this` context inside of the funciton scope, which is pointless
// inside of an arrow function, every other argument is assigned to parameters in the function definition, in order
const partialAdd = add.bind(null, 5);


// results in 11
partialAdd(6);
```
- Often we want a 'base value' for our functions to be used multiple times later, but want to keep our functions generic

```js

const builder = buildingBase => (rooms, floors, address) => ({...buildingBase, rentalUnits, floors, address});

const houseBuilder = builder({type: 'house', hasLawn: true});

const house1 = houseBuilder(4, 2, '123 Mocking Bird lane');
const house2 = houseBuilder(3, 1, '234 Mocking Bird lane');

const apartmentBuildingBuilder = builder({type: 'apartment'});

const apartmentBuilding1 = apartmentBuildingBuilder(22, 170, '345 Mocking Bird Lane');
// etc
```
