# Functions

### Scope and Closure

* When you first start writing a program in JS, you are in the `Global Scope`. If we define a variable, it will be defined globally.
```javascript
  const number = 1;
```
We generally want to avoid globally scoped variables as you can very quickly run into namespacing issues.

* A local scope refers to any scope defined inside the global scope. Each function defined has its own local scope.
```js
  // scope 1: Global scope out here
  const myFunction = () => {
    // scope 2: Local scope in here
  };
```
Locally scoped items are not available to the global scope.

* When we define a function inside a function, the inner function has access to the scope of the outer function. But not the other way around. This is Closure! Thats all it is!!
```js
  // scope 1: Global scope out here
  const myFunction = () => {
    // scope 2
    const number = 1;
    const myOtherFunction = () => {
      // scope 3: `number` is accessible here!! We've created a closure because stuff defined in there isnt accessible outside of this function
    };
  };
```

### Anatomy of a function

When we approach a function, one of the most valuable abilities is to comfortably understand what the goals
and the use cases of a function are. This can be difficult when a function is not named well, however eventually
even a poorly named function can be parsed by someone with enough experience and knowledge - for example:

```js
function myThing(someParam){
  return someParam * 10;
}
```
The naming of this function is no good - but even then, it becomes clear quickly what happens when this function is used,
and how it is intended to be used.

The two important things to always look for in a function are it's `parameters` and it's `return`.

### Interpreting our code

Everyone should behave a little bit like an interpreter when reading code. Going through your code in the right order and resolving
expressions and operations is not something that comes naturally, but with time and practice. So let's practice

Let's use this function, `multiplyNumberByTen` - and play around with it a little bit.

```javascript
let numberResult = multiplyNumberByTen(1) + multiplyNumberByTen(3) * multiplyNumberByTen(2);

function multiplyNumberByTen(aNumber){
  return aNumber * 10;
}
```
So the first thing to note here is that we are using this function more than once. That's good! A good function can be used
multiple times, and in fact that's one of the main reasons we try and aim for what we call 'pure functions' - because pure functions
are always more reusable.

Here we are using this multiplying function 3 times, and we are doing some math with them. Let's look at this differently,
we know that this function takes a number, multiplies it by 10 and returns it - so if we pass in `1` - the result is `1`, if we
pass in `3` the result is `30` and `2` would be `20`. So another way to view this, is like so

```javascript
let numberResult = 10 + 30 * 20;
```

At first glance you might think 'oh easy, this is equal to 800' - because 10 + 30 = 40, and 40 * 20 = 800. However, 
the rules of math that we know and love apply here - there is an order of operations that we need to consider, on -top- of how the interpreter
reads this code. So the answer instead is `10 + (30 * 20)`, which is `10 + 600`, ie, `610`.

At this point, we start to see how interesting it can get to work with functions, so let's kick it up a notch.


```javascript
let numberResult = multiplyNumberByTen(multiplyNumberByTen(2) + 2);

function multiplyNumberByTen(aNumber){
  return aNumber * 10;
}
```

Now this might start to look a bit intimidating, but let's break it down and demystify. We have an expression being passed into
a function call it looks like! Not only that, part of the expression is a function itself - how does this all work, what is the order?

Well, one thing to remember, is that before any variables or expressions are passed into a function as an argument, they need to be resolved
first, so it's a good idea to start there, specifically `multiplyNumberByTen(2) + 2` - this is the expression that we need to resolve first.

Looking at the previous explanation, we can figure out that the result if this is `20 + 2`, ie `22`. At this point, we have a nice number we can pass into
our function, which ends up returning `222`;

### Recursion!

Here is a very simple example of recursion.

```javascript
function subtractByNumUntilANegative(startingNumber, numberToSubtractBy){
  
  let newTotal = startingNumber - numberToSubtractBy;
  
  return newTotal < 0 ? newTotal : subtractByNumUntilANegative(newTotal, numberToSubtractBy);
  
}
```


