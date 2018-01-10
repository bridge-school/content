---
layout: lesson
title: "Map"
permalink: /map/
---


## What if I want a list of pets ages in human years?
```js
const listOfPets = [{type: 'Dog', age: 5}, {type: 'Cat', age: 11}, {type: 'Dog', age: 9}];

let listOfPetAgesInHumanYears = [];
const dogToHumanYearMultiplier = 7;
const catToHumanYearMultiplier = 4;

for(let i = 0; i < listOfPets.length; i++) {
  if(listOfPets[i].type === 'Dog'){
  listOfPetAgesInHumanYears.push(listOfPets[i].age * dogToHumanYearMultiplier);
  } else if (listOfPets[i].type === 'Cat') {
  listOfPetAgesInHumanYears.push(listOfPets[i].age * catToHumanYearMultiplier);
  }
}

```

## Challenges
- Can be hard to quickly understand what is happening
- Complexity increases significantly with more complex conditions
- Difficult to ensure immutability (ie, that we don't overwrite values in the original array, we may need it again later)

## What is Array.map?
- A functional programming tool found natively in javascript
- Creates a new array based off the data in a base array
- Does not modify the original array
- Makes a new list the same length as the original, where the values may be entirely different

## How does it work?
- With the same example as above

```js
const listOfPets = [{type: 'Dog', age: 5}, {type: 'Cat', age: 11}, {type: 'Dog', age: 9}];
const dogToHumanYearMultiplier = 7;
const catToHumanYearMultiplier = 4;

let listOfPetAgesInHumanYears = listOfPets.map(function(pet) {
  if(pet.type === 'Dog'){
    return pet.age * dogToHumanYearMultiplier;
  } else if(pet.type === 'Cat') {
    return pet.age * catToHumanYearMultiplier;
  }
});
```

- `map` exists as a method on all arrays, it takes one (also known as an anonymous function) function as an argument
- This anonymous function is called for each item in the array, as map iterates over each item
- This function is provided the value currently being iterated over as the first parameter, in the above
case, that means that `pet` represents `{type: 'Dog', age: 5}` the first time it is called, then `{type: 'Cat', age: 11}` the second time, 
and then `{type: 'Dog', age: 9}` the third.
- Whatever is returned in that function ends up in the new array at the same index
- In the above example, the first time `pet.type` is equal to `Dog`, therefore what is returned is `pet.age * dogToHumanYearMultiplier`,
which the first time evaluates to `5 * 7`, which means that in the new array at the first index, the value is `35`

## Useful Tips

- Often we want to create new arrays of objects, where we just **update** the object

```js
const listOfPets = [{type: 'Dog', age: 5}, {type: 'Cat', age: 11}, {type: 'Dog', age: 9}];
const dogToHumanYearMultiplier = 7;
const catToHumanYearMultiplier = 4;

// keep the list of pets, just add a new property for the human years
const updatedListOfPets = listOfPets.map(pet => Object.assign({}, pet, 
  { 
    inHumanYears: pet.type === 'Dog' ?  pet.age * dogToHumanYearMultiplier : pet.age * catToHumanYearMultiplier
  }));
```
 - The above uses `Object.assign()` - a useful method that merges objects together, when used correctly, it provides you an
 immutable solution to updating objects

```js
// DO NOT DO THIS
const listOfPets = [{type: 'Dog', age: 5}, {type: 'Cat', age: 11}, {type: 'Dog', age: 9}];
const dogToHumanYearMultiplier = 7;
const catToHumanYearMultiplier = 4;

const updatedListOfPets = listOfPets.map(pet => pet.inHumanYears = pet.type === 'Dog' ?  
      pet.age * dogToHumanYearMultiplier : pet.age * catToHumanYearMultiplier);
```

- In the above example, you are modifying the original `listOfPets`