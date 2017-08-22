# Functions

### Scope and Closure
* When you first start writing a program in JS, you are in the `Global Scope`. If we define a variable, it will be defined globally.
```javascript
  const number = 1;
```
We generally want to avoid globally scoped variables as you can very quickly run into namespacing issues.

* A local scope refers to any scope defined inside the global scope. Each function defined has its own local scope.
```javascript
  // scope 1: Global scope out here
  const myFunction = () => {
    // scope 2: Local scope in here
  };
```
Locally scoped items are not available to the global scope.

* When we define a function inside a function, the inner function has access to the scope of the outer function. But not the other way around. This is Closure! Thats all it is!!
```javascript
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

```javascript
function myThing(someParam){
  return someParam * 10;
}
```
The naming of this function is no good - but even then, it becomes clear quickly what happens when this function is used,
and how it is intended to be used.

There are two big things we'll focus on here, the `parameters` and the `return` of a function.

#### Parameter
The parameters should inform you almost immediately what expected information this function needs to work. If these parameters are not 
passed in, odds are, this function is not going to behave as intended, or will most likely throw an error (you can make functions durable to prevent this, but that's neither here nor there).

In the above example, we have just one parameter, and it is named poorly. However, lets take a look at whats going on **in** the function.
we have this line

```javascript
return someParam * 10;
```

now, we can infer something from this line. That if someParam was anything but a number, it wouldn't work as intended - thus,
someParam is probably intended and expected to be a number. Let's try updating the function to be a bit clearer:

```javascript
function myThing(aNumber){
  return aNumber * 10;
}
```

Now this is a bit clearer. On first pass, it's clear now that the first parameter being passed in should be a number.


#### Return
So we figured out the conceptual 'beginning' of the function interpretation, and that is resolving the values of the parameters. This lets us know what to replace, algebraically, in the function definitions body.
So what's the next most important thing? Well really, what the 'result' of this function is going to be. That's what the return keyword is used for.

Before we go into it, let's talk about how the interpreter deals with functions. When a function is **called**, we know because of the `()` at the end.
For example:

```javascript
myThing(5);
```

We can see above that myThing is being called. The interpreter, will then take that `5` we passed in, and replace the `aNumber`
parameter with it. However, it's not done yet.

Let's take a new function as an example:
```javascript
function someNewFunction() {
  console.log('hello world');
}

someNewFunction(); // console logs 'hello world'
```

Now that function works great, but what happens when we do this?

```javascript
let x = someNewFunction();
````

What does `x` resolve to here? And does that console log still fire? Well the answer is that first,
if no explicit return statement is defined for a function, at the end it, it just returns `undefined`.
Second, it's important to remember that when you call a function, everything inside -still- gets called,
even if there is no return statement. So that `console.log` does fire.

So let's get back to our `myThing` function. Let's take a look at what it's returning:

```javascript
return aNumber * 10;
```

When the interpreter gets here, it first wants to handle the operation it sees. Let's assume that what we
passed into this function resolves aNumber as `5` - this becomes `5 * 10` which of course is `50`. So the final statement is
`return 50`. I know this seems pedantic or overly specific, but this thought process is foundational.

So, with this information, we know a bit more about what this function is doing. It's really simple, it takes a number and it returns
that same number times 10. Let's utilize this information to first better name the function

```javascript

/** as a side note, this is still a pure function, as a pure function is defined by a function that always
returns the same value no matter what, as long as the inputs are the same, and has no internal dependencies that may change,
 as well as having no hidden 'outputs' - eg, it doesn't access an external object and mutate its value(s)
 **/
function multiplyNumberByTen(aNumber){
  return aNumber * 10;
}

let numberResult = multiplyNumberByTen(5);
```
Now the first thing to note is that this is a lot more understandable. Reading just the implementation of the function
should give you a clear idea of the purpose. This is just a good practice, and something I'll be encouraging and noting in your own code.

Additionally, because our function is returning a value, our `numberResult` gets set to that returned value, which in this case is `50`.

### Interpreting our code
Everyone should behave a little bit like an interpreter when reading code. Going through your code in the right order and resolving
expressions and operations is not something that comes naturally, but with time and practice. So let's practice

Let's use this function we just made, `multiplyNumberByTen` - and play around with it a little bit.

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

### Functions as 'callbacks'

Something to always remember is that there is a difference between a function definition and a function being 'executed' or 'called'.
That seems pretty basic, but it can really get confusing when we get into the idea of passing around function definitions. Let's take a look
at an example:

```javascript
let helloWorld = function(name){
  console.log(`Hello ${name}!`);
}

console.log(helloWorld);
```
Above, the result of the console log is just going to be the definition of the function, try something like this in your browser console
window if you like, and you'll see that a function's definition can be passed around - and in fact this is something you've done
all the time in javascript, and if you're like me, you had no idea what exactly was happening. Let's explain with another example


```javascript

function hollerBackFunc(callBackFunction){
  return callBackFunction(10);
}

const doubler = (num) => num * 2;
const addFive = (num) => num + 5;
const squarer = (num) => num * num;

const result1 = hollerBackFunc(doubler); // 20
const result2 = hollerBackFunc(addFive); // 15
const result3 = hollerBackFunc(squarer); // 100

```

What is happening here!? Let's take it a step at a time. First, let's note that we have a bunch of functions defined here,
specifically `hollerBackFunc`,`doubler`, `addFive` and `squarer`. The last 3 are more or less self explanatory, but if the arrows are giving you trouble:
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
And feel free to ask for help if they still give you trouble!

Let's take a look at `hollerBackFunc`. This function looks mostly familiar, but the weirdest thing about it is that
it seems to be executing one of it's parameters as though it were a function - well that's because it is. Functions can expect almost anything
to get passed into them. That means arrays, numbers, strings, objects and yes - function definitions. Now unlike a function that has
already been called and is resolved before being passed in, an 'uncalled' function is passed in as is. So in the case of
`hollerBackFunc` - the first parameter it can expect is a function. Additionally, this function is then called **inside**
`hollerBackfunc`, and 10 is always passed into whatever it gets. The result if **that** is then returned. So let's take a look at
that with `doubler`.

`doubler` takes any number passed in, and doubles it, then returns the result - easy peasy. So with the line
 
 ```javascript
const result1 = hollerBackFunc(doubler); //20
```

`doubler` replaces the parameter `callBackFunction` inside of `hollerBackFunc`. So let's imagine that instead of `callBackFunction`,
we have `doubler`. It should look something like this in your head:

```javascript
function hollerBackFunc(/is now doubler*/){
  return (num => num * 2)(10);
}
```

I cheated a bit and just wrote the definition of doubler inline, wrapped it in parenthesis and passed 10 into it. The reality is,
that is more or less what is happening. If you try copying `(num => num * 2)(10)` and pasting it in the console, you'll see it works.

Now the result of that is 20, and that is returned out to the result of hollerBackFunc! We'll be approaching this idea
repeatedly throughout the course, so don't be perturbed if it doesn't immediately click, but still feel free to ask for more info.


### Recursion!

Here is a very simple example of recursion.

```javascript
function subtractByNumUntilANegative(startingNumber, numberToSubtractBy){
  
  let newTotal = startingNumber - numberToSubtractBy;
  
  return newTotal < 0 ? newTotal : subtractByNumUntilANegative(newTotal, numberToSubtractBy);
  
}
```


