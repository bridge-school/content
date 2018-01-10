---
layout: lesson
title: "Reduce"
permalink: /reduce/
---


## Sometimes you need to turn an array of numbers into just one big number
```js
let soldItems = [
  {productId: 1, price: 30.99},
  {productId: 2, price: 12.99},
  {productId: 3, price: 61.99},
  {productId: 4, price: 17.99},
  {productId: 5, price: 22.99},
];

let totalSales = 0;

for(let i = 0; i < soldItems.length; i++) {
  totalSales += soldItems[i].price;
}

```

## What is Array.reduce?
- A functional programming tool found natively in javascript
- Creates **any** new data structure
- Does not modify the original array

## How does it work?
- With the same example as above

```js
const soldItems = [
  {productId: 1, price: 30.99},
  {productId: 2, price: 12.99},
  {productId: 3, price: 61.99},
  {productId: 4, price: 17.99},
  {productId: 5, price: 22.99},
];

const totalSales = soldItems.reduce((accumulator, nextItem) => accumulator + nextItem.price, 0);
```

- `reduce` exists as a method on all arrays, it takes one unnamed function (also known as an anonymous function) as the first argument
- This anonymous function is called for each item in the array, as reduce iterates over each item
- It also takes an optional second parameter, which will act as the first value
  - In the above example, `0` is the optional second parameter
  - The first time reduce is called, `accumulator` is equal to `0`
- This function is provided the value currently being iterated over as the **second** parameter
  - In the above example, the first time it is called, `nextItem` is equal to `{productId: 1, price: 30.99}`
- The return of the function dictates what the value of the `accumulator` is the next time it is called
  - the first time it's called, we add `accumulator + nextItem.price` ie `0 + 30.99`, and return it
  - the second time it's called, we add `accumulator + nextItem.price` ie `30.99 + 12.99`, and return it
  - the third time it's called, we add `accumulator + nextItem.price` ie `43.98 + 61.99`, and return it
  - etc
- The final time the function is called and an item is returned, you resolve your reduce to whatever the last return is


## Useful Tips
- Remember that you can return any sort of type in your reduce, and it will resolve to it
- A neat trick is turning an array into an object

```js
const soldItems = [
  {productId: 1, price: 30.99},
  {productId: 2, price: 12.99},
  {productId: 3, price: 61.99},
  {productId: 4, price: 17.99},
  {productId: 5, price: 22.99},
];

const groupedByPriceCategory = soldItems.reduce(
  (acc, nextItem) => nextItem.price < 20 ? 
  Object.assign({}, { underTwenty: acc.underTwenty.concat(nextItem) }) :
  Object.assign({}, { overTwenty: acc.overTwenty.concat(nextItem) }), 
  {overTwenty: [], underTwenty: []});
```

