## Array Like Objects & Array.from() 
 
 So what is `Array.from()` and why do I use it? Well, let's talk about what Arrays really are first. 
 Here's the shocker: Arrays are objects. How, you might ask?
 Well first, lets take at what an object is - an object is a data structure that has key value pairs:
 
 ```js
 let myCar = {}; // lets make an empty object here
 
 myCar.steeringWheel = 'round'; // here we create a property called steeringWheel, setting it to 'round'
 myCar['steeringWheel'] = 'heart-shaped'; // here we overwrite that same property, the end result is the same as above
 console.log(myCar.steeringWheel); // heart-shaped - we know that we can access properties on objects with the . operator
 console.log(myCar['steeringWheel']); // heart-shaped - we also know that we can access properties using [ ] brackets and the string name
```

Now let's take a look at something similar with Arrays.

```js
let myNumberList = [];
myNumberList[0] = 20; //here we are setting the item at index 0 to the value of 20. Look familiar?
console.log(myNumberList[0]); // 20 - here we are accessing the item at index 0
```

You've probably had to access items at particular indexes before, and to do so you just pass in the index between `[]` brackets. The reality is, what you are doing
is accessing the property `0`, in the same way we can access the property `steeringWheel`. With objects, the properties have to be strings, in fact if you try to do something like this:
`myCar.10 = 'Cool'`, you'll get an error: `Uncaught SyntaxError: Unexpected number`. Does that mean you can't have numbers as object properties? It does not! It just means you can't use the `.` 
operator to do so. `myCar[10] = 'Cool'` is legitimate working javascript, `console.log(myCar[10]) // 'Cool'`.

So now you might be saying "oh that's nice... but what does this have to do with anything?" - I'm getting to that! So now we know that under the hood, there are a lot of similarities between
Arrays and Objects. If you think about it, Arrays have other similarities! You can access methods on arrays with the period operator, like `.map()`, `.filter()`, etc. We also can't forget about the 
ever important array property, `.length` - this will come up in a second.

Okay so you might be wondering, if you create an object, like this - is it an array?:

```js
let myArrayObj = {};

myArrayObj[0] = 'Hello';
myArrayObj[1] = 'World';
```

Hmm... we're getting close, but Arrays really need to know how long they are, all the cool looping you can do with arrays depend on them
internally being able to understand how long to loop for, ie, how long they are. Okay - we can fix that:

```js
let myArrayObj = {};

myArrayObj[0] = 'Hello';
myArrayObj[1] = 'World';

myArrayObj.length = 2;

console.log(myArrayObj); // {0: 'Hello', 1: 'World', length: 2}
```

Awesome! It's an array now, right?

...

... Almost. So javascript is clever, and it often tries to be too clever, but in this case it still just assumes you have an object, if you try to call `.map()` on
this object, it'll complain about map not being a function on this object. Okay, so how do we tell Javascript 'hey, this thing is basically an array, lets treat it like one'.
**Finally** this is where Array.from() comes in! Array.from() expects what is referred to as an `array-like` object. That's exactly what it sounds like,
something that looks almost like an array, but isn't quite one. Well great, we have one of those!

```js
let myArrayObj = {};

myArrayObj[0] = 'Hello';
myArrayObj[1] = 'World';

myArrayObj.length = 2;

const workingArray = Array.from(myArrayObj);

console.log(workingArray); // ['Hello', 'World'] !!!!

```

We did it! Something to emphasise here is that length is the -most- important property here. Without length, this would happen:

```js
let myArrayObj = {};

myArrayObj[0] = 'Hello';
myArrayObj[1] = 'World';

//myArrayObj.length = 2;

const workingArray = Array.from(myArrayObj);

console.log(workingArray); // [] !!?????

```

You'd get an empty Array. The mechanisms in Array.from() use the length of the array like object to inform it of the length of the array,
without it, you get what you have above. Now you might be asking, what kind of cool things can I do with all this newfound knowledge?!


### Make a new array of x length easy
Sometimes we need to make Arrays of a predefined length, lets say for example I want to make a function that will return me an array 
of numbers up until a number passed in - if I give this function `5`, I should get back `[1, 2, 3, 4, 5]`. Normally a for loop would do the trick, but what about
something taking a bit less code?

```js

function createListOfNumbersUpTo(listLength) {
  return Array.from({length: listLength}, (_, i) => i + 1); // you could also write it ++i if you want to be fancier
}
```
The above returns an array of numbers up to the passed in number. But how? Well we can see that in the `Array.from()`, the first
parameter passed in is an object with a length property set to the passed in number - so if we passed in 5, it would be `{length: 5}`.

Okay, so that means it's going to try and make an array of 5 items - if that was it by itself, what would happen?:

```js
Array.from({length: 3}) // [undefined, undefined, undefined]
```

What's with those `undefined`'s? Well... I guess we didn't actually tell Array from what should be in each of those indexes. If we did, it would figure it out,
for example:


```js
Array.from({length: 3, [0]: 'Hello', [2]: 'World'}) // ['Hello', undefined, 'World']
```
You can see that with a little help, `Array.from()` knows what to do, but if we don't give it any values, undefined actually makes the most sense. 
Conveniently though, `Array.from()` takes **two** arguments. The second, optional argument is a map callback function. Meaning - this function gets called for each item
in the new array, it has access to the value and the index like a regular map function does, and whatever it returns replaces the value at that index in the new array.

One more time:
```js

function createListOfNumbersUpTo(listLength) {
  return Array.from({length: listLength}, (_, i) => ++i); // my map function is ignoring the value, so I like to use _ to indicate that
}
```
What I'm returning above here is the index I am currently at (which starts at 0), plus 1. So that will give me a list of 1 to `listLength`. Useful!

### Array.from() and strings

So now this has us thinking, what ELSE has length? And does it play nice with Array.from()? Let's take a look at strings, actually. We know that strings and arrays have a lot in common:

```js
console.log('Strings are fun!'.length) // 16 - we have the ever important length property on strings!
console.log('Access properties!'[0]) // 'A' - letters are zero indexed in strings!
```

This seems like all we need to turn strings into Arrays!

```js
console.log(Array.from('Hello')) // ['H', 'e', 'l', 'l', 'o']
```

And it is. There are other ways to turn strings into Arrays, and there aren't any real benefits in doing it this way as opposed to, lets say `'Hello'.split('')`. That being said, it's a good thing to
remember that strings are 'array-like'.

### Array.from() and arguments

As a quick recap, there is another interesting object we know about that has always seemed like it SHOULD be an array, but it isn't.
That's `arguments`. Now what was that again?

```js
console.log(spitOutArguments(4, 5, 'hello', false)); // {0: 4, 1: 5, 2: 'hello', 3: false, length: 4} or [4, 5, 'hello', false], but still not an actual array

function spitOutArguments(){
  return arguments;
}
```
If you didn't remember, arguments is a special  **array-like** object available inside of any function, that resolves into key-value
pairs of the position in the parameter placement as a zero-indexed key, and the value being... well the value. So for the example above,
for `arguments[0]` the value is `4` because the first parameter being passed in resides in the 'zero' position. Arguments also conveniently provides
you the length property. Arguments is **so close** to being an array, but it isn't. It even looks kind of like an array when you console log it. So turning it into an array is really
easy with `Array.from()`:

```js
console.log(spitOutArguments(4, 5, 'hello', false)); // [4, 5, 'hello', false] and is now a real array!!!

spitOutArguments(2, 3, 4).map(num => num * 2); // resolves to [4, 6, 8]

function spitOutArguments(){
  return Array.from(arguments);
}
```

So cool! Now arguments doesn't feel so awkward.
