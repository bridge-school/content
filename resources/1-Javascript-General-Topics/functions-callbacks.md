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
