## Promises

Promises are now officially in Javascript, as of ES2015! So we should probably try and figure out what promises are.

First, let's talk about the problem that Promises are solving. In javascript, asynchronous code (that's code that does not immediately fire)
has always been complicated and difficult to deal with. Today there are a lot of different methods to do so, there are Promises, Observables, Generators and often a combination of all of these and more.
So what are these systems, tools and libraries trying to do? Well, let's talk about just how javascript **runs**. 

In Javascript, code is run in a single threaded manner (let's not get into WebWorkers right now) - meaning, that all code is run by the 
same thread of thought, so to speak. That means everything needs to queue up and wait it's turn, and no skipping in the line.

This get's complicated when you have async code. Let's take a look at `setTimeout`.

```javascript
const someValue = 'Hello';
let theSecondHalf = '';
setTimeout(() => theSecondHalf = 'World', 0);
console.log(someValue + theSecondHalf);
```

Well, looking at this code, some might intuitively think "well, we have someValue equalling Hello, theSecondHalf being blank
at first but on the next line we give it a value, then right after that we give it a value of 'world' so then on the last line it should say 'HelloWorld' in the console.".

The reasoning above seems right, but this is where the complicated nature of async code comes in. SetTimeout, no matter what, is an asynchronous action. That means no matter what,
the function inside is **not** part of the immediate stack. It get's put in the queue and is called at the next available opportunity (when the current stack clears).

So that means that `console.log()` fires _before_ the function that sets `theSecondHalf` to 'World' does.

Now this can be annoying, especially if I don't have any control over when the async event is firing - like with a network request. So promises are a way to communicate better with these
async events. Now, what we do, is wait for our async events.

### Our first promise

```javascript
let myPromise = new Promise((res, rej) => setTimeout(()=> res('yay'), 3000));

myPromise.then(response => console.log(response));
```
So let's break this down a little bit. First, let's take a look at this `new` keyword. We seem to be calling it right in front of a function - and this tells us the function is a `constructor`.
I won't get into the details of what that entails, but just know that a constructor is a special kind of function that always returns an object. This object, in this case, is a `Promise`. So that means
that 'myPromise' ends up equalling a promise object, which comes with a few useful methods, one of which we'll get into later.

Now this promise is getting something passed into it - and that is a function, specifically:

```javascript
(res, rej) => setTimeout(()=> res('yay'), 3000)
```

This is passed into the Promise, and it is a callback function, which if you remember is a function definition passed into another function. Additionally,
any function you pass into a Promise constructor can expect two parameters to be passed in. This is where it gets tricky - the two parameters that you can expect are
**_also_** functions. You can see that in this example, we are even calling one of them, `res`. If you're not confused at this point, congratulations, you're a loooot smarter than me. This can get really dicey,
 and this is why we'll continue to go over the fundamentals of a function. Anyway, this res - what is it doing? Well we can see that inside of the callback function above,
 we are calling `setTimeout`, and waiting 3 seconds (3000ms) before firing the res function inside. So what that looks like is, 3 seconds after we create the function,
 `res` is fired, and additionally, it is provided the value `'yay'`. So that looks cool - but how does that practically change or do anything? Well this is where we get 
 back to that `myPromise` variable:
 
 ```javascript
myPromise.then(response => console.log(response));
```

Right here, we can see that myPromise, the promise object returned by the promise constructor, has a cool function that comes with it called `then`. We didn't define this, all
promises come with it. What `then` does can be a little confusing, because we can see that it **_also expects a callback_**. This callback function has one specific purpose though.

### What is 'then' doing?

So `then` takes a function as it's first (and second, but we'll get into it later), parameter. _This function get's called right after the resolve in the promise constructor get's called_. Meaning, in the 
example above, it get's called 3 seconds after myPromise get's defined! You can also see that this callback function expects something as well, and we are console logging that result.

Can you guess what that result is? It's 'yay'! That same string I passed in the constructor is available, three seconds later, in this function.

This may seem a bit useless, and in this example it really is, but when we get to RESTful calls, you'll see it's value. In the next less on promises, we'll talk about the `reject` that we conveniently avoided today!
