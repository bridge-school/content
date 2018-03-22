#### Parameter

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
