---
layout: lesson
title: "Filter"
permalink: /filter/
---


## Imagine trying to filter out numbers from a list, less than 18
```js
let myListOfAges = [22, 12, 43, 44, 22, 54, 16, 87, 12];

let myListOfOldEnoughAges = [];

for(let i = 0; i < myListOfAges.length; i++) {
  if(myListOfAges[i] >= 18) {
    myListOfOldEnoughAges.push(myListOfAges[i]);
  }
}

```

## Challenges
- Takes multiple lines to handle even the simplest filters
- Can be hard to quickly understand what is happening
- Complexity increases significantly with more complex conditions

## What is Array.filter?
- A functional programming tool found natively in javascript
- Creates a new array based off the data in a base array
- Does not modify the original array
- Only the items from the original array that pass a test are copied into a new array

## How does it work?
- With the same example as above

```js
let myListOfAges = [22, 12, 43, 44, 22, 54, 16, 87, 12];

// dont forget that 'eachAge >= 18' resolves to true or false,
// and that with arrow functions, the value on the right hand of the arrow is automatically returned
let myListOfOldEnoughAges = myListOfAges.filter(eachAge => eachAge >= 18);
```

- `filter` exists as a method on all arrays, it takes one unnamed function (also known as an anonymous function) as an argument
- This anonymous function is called for each item in the array, as filter iterates over each item
- This function is provided the value currently being iterated over as the first parameter, in the above
case, that means that `eachAge` represents `22` the first time it is called, then `12`, and then `43` and so on.
- This function expects either a `true` or a `false` to be returned inside of it.
- In the above example, the first time `eachAge` is equal to `22`, and `22 >= 18` resolves to `true`. That true is returned, and 
that means that `22` is kept in the next array

## Common Mistakes

- Filter does not modify the original array, it creates and returns a brand new one (which generally, is a very good thing)
```js
const allFriends = [{name: 'Sumit', isSuperFriend: true}, {name: 'Joanne', isSuperFriend: false}, {name: 'Purvi', isSuperFriend: false}];
const superFriends = allFriends.filter(friend => friend.isSuperFriend);
```
`allFriends` does not get modified, so later references to all of your friends are still available

- You should not create a new array and push into it in your filter 'loop'

```js

// DO NOT DO THIS
const allFriends = [{name: 'Sumit', isSuperFriend: true}, {name: 'Joanne', isSuperFriend: false}, {name: 'Purvi', isSuperFriend: false}];
const superFriends = [];

allFriends.filter(friend => {
  if(friend.isSuperFriend){
    superFriends.push(friend);
  }
})

```
In the above, the filter is not being correctly used, it is being used as an iterator, no different than `forEach` or a for loop.
Instead we should be ensuring that the functions being used inside of our filter are pure.

## Useful Tips

- Chaining together multiple filters, combined with other array methods, can make elaborate requirements seem trivial

```js
// Out of a list of all my friends, get the first superFriend's with dog(s) as pets
const allFriends = [
  {name: 'Sumit', isSuperFriend: true, pets: ['Cat', 'Bird']}, 
  {name: 'Joanne', isSuperFriend: false, pets: []}, 
  {name: 'Purvi', isSuperFriend: true, pets: ['Dog']},
  {name: 'Pete', isSuperFriend: true, pets: ['Monkey', 'Dog']},
  {name: 'Manal', isSuperFriend: false, pets: ['Dog']},
];

const dogOwningSuperFriends = 
  allFriends.filter(friend => friend.isSuperFriend) // resolves to just super friends
          .filter(friend => friend.pets.includes('Dog')); // takes the list of super friends and filters it further
```
The above does **not** include the friend `Manal`, because she is not a super friend, even though she has a dog 

- Filtering by the position in an array can be a very useful thing

```js
const peopleWaitingInLine = ['Della', 'Lisamarie', 'Melanie', 'Ahmed', 'Lucy', 'Purvi'];

// the first three people in line get a prize!!!!
const firstThreeInLine = peopleWaitingInLine.filter((person, index) => index < 3);
```

- The second parameter passed into the filter callback function is the index of the item currently being iterated over,
you can use this in your filters!
