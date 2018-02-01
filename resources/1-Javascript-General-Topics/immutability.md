---
layout: lesson
title: "Immutability"
permalink: /immutability/
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


