#### Return

If the conceptual 'beginning' of a function interpretation is resolving the values of the parameters, the return statement is the conceptual 'end', or the result of what a function is - this is what the return keyword is used for.

Before we get into it, let's talk about how the interpreter deals with functions. When a function is **called**, we know because of the `()` at the end.
For example:

```javascript

const myThing = function(aNumber) {
  return aNumber * 10;
}

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
function someNewFunction() {
  console.log('hello world');
}

someNewFunction(); // console logs 'hello world'

let x = someNewFunction();
````

What does `x` resolve to here? And does that console log still fire? Well the answer is that first,
if no explicit return statement is defined for a function, at the end it, it just returns `undefined`.
Second, it's important to remember that when you call a function, everything inside -still- gets called,
even if there is no return statement. So that `console.log` does fire.

So let's get back to our `myThing` function. Let's take a look at what it's returning, `return aNumber * 10;`

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

multiplyNumberByTen(5);
```
Now the first thing to note is that this is a lot more understandable. Reading just the implementation of the function
should give you a clear idea of the purpose. This is just a good practice, and something I'll be encouraging and noting in your own code.

Additionally, because our function is returning a value, our `numberResult` gets set to that returned value, which in this case is `50`.