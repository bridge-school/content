## JavaScript Interpreted

Being able to read and write JavaScript is a valuable skill for a developer, but writing the code is only part of understanding how JavaScript works. What *actually* happens after you hit save and run your code?

Some programming languages (like Java and C#) are compiled, translated from *source code* written by developers into *machine code* the computer can read. But JavaScript isn't compiled - it is interpreted. So to understand how the code you write impacts the way your program works, it's important to know how your code is 'read', and what is doing the reading.


## Basics

Your JavaScript code is a set of instructions for the interpreter. We call these instructions 'statements', which we separate with a semicolon and the interpreter reads from left to right.

Unlike some other languages, JavaScript will still be interpreted with or without the semicolon. Despite this, Mozilla's developer docs recommend that semicolons are always used. You can read more about that here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types

To store values, JavaScript has seven data types, six of which are called primitives, and one called Object. Read on to learn how values are stored, and the differences between types!


## Variables

In JavaScript, data is stored in an identifier called a **variable**. A variable represents the name you will use through out your application to store some data. A variable can be declared a number of ways:

* `const`
  Used for decaring a read-only, block-scoped value. Variables declared with `const` are constants, meaning they cannot be reassigned
* `let`
  Used for declaring a local, block-scoped variable. Can be reassigned.
* `var`
  Used for declaring a variable. Can be reassinged.

  In addition to being able to reassign their values, both `let` and `var` declarations can be used *before* a value is assigned to them, but `const` must be given a value upon declaration or an error is thrown.

  ```
  var name; // works
  let nextValue; // works
  const studentName; // will throw error: `Uncaught SyntaxError: Missing initializer in const declaration`
  ```

  Variables can hold a variety of data, including primitives and Objects.


## What are primitives?

JavaScript's six primitive types are:

  * Boolean - can have value `true` or `false`
  * Null - value is `null`
  * Undefined - no value been assigned, and so has the value of  `undefined`
  * Number - value is a number**
  * String - accepts textual data enclosed in quotes.
  * Symbol - this is the newest data type, introduced in ECMAScript 6. It can be used as the key of an object property

** Number accepts more than just integers: it can also represent floating-point numbers, NaN and `+Infinity and -Inifinity`. You can read more about the Number type and other data structures here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures


## How are primitives interpreted?

When the JavaScript interpreter encounters a variable, it first reads at the left-hand side of the expression (the part before the equals sign), then it assigns the right-hand side of the expression to the value on the left. So in the intance below, the variable `song` is assinged the value `Twinkle, Twinkle Little Star`:

  ```
  const song = 'Twinkle, Twinkle Little Star'
  console.log(song) // will return 'Twinkle, Twinkle Little Star'
  ```

JavaScript's primitive types are **immutable**, meaning they store their values directly on the variable, like in this example:

``` let hero = "Leia"
    let hero2 = hero;
    hero = "General Organa"

    console.log(hero2) // Leia
    console.log(hero) // General Organa
```

When we write the line `hero = "General Organa"`, we want to make the value of `hero` a new string. But when we `console.log(hero2)`, we're given the value `Leia`. Why? Because when we wrote `let hero2 = hero`, we stored the actual, current value of `hero` into the `hero2` variable. Later, when the value of `hero` is changed, our `hero2` variable doesn't change along with it.


## Interpreting Objects

A JavaScript object is a collection of key-value pairs known as 'properties'. An object looks like this:

```
let heroObject = {
    name: 'Leia',
    age: 60,
    planet: 'Alderaan',
    affliations: ['Rebel Alliance',  'Galactic Republic', 'Alderaan Royal Family', 'The Resistance']
}
```
Unlike primitives, a JavaScript object is a complex data type and is **mutable**. This means if we make a change similiar to the primitive example above, we'll get different outputs in the console:

```
​var heroObject2 = heroObject;
heroObject.name = "General Organa";
​
console.log(heroObject2.name); // General Organa
console.log(heroObject.name); // General Organa
```

So why didn't our first call return `Leia` like above? Because an object's values are stored as references rather than actual values. You can think of references like URLs: they're a *pointer* to some information, rather than the information itself. If the information stored on the pointer changes, every instance (whether URL or variable name) will now point to this new information.

## Execution in the Browser

JavaScript engines evaluate code as follows:

1. Global function and variable declarations are defined and processed
2. Separate execution contexts are created for each function
3. Functions, variables and arguments inside each execution contexts are created (and new execution contexts are created for any function found inside another function)
4. Assignment statements are executed

If the interpreter encounters any errors during this process, it stops. Any lines evaluated before the errors occured will remain evaluated, and any code following the errors will not be read.
Comments that are written into your code will also be ignored by the interpreter.

(For an in-depth look at the above process, see: http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/)

## Hoisting

JavaScript interpreters move function and variable declarations to the top of their scope as the code is run - this is called 'hoisting". Because of hoisting, you are able to use a function or reference a variable *before* it is defined in code. For example:

```
favouriteFood("ice cream");

function favouriteFood(food) {
  console.log("My favourite food is " + food); // will return 'My favourite food is ice cream"
}

```

Hoisting can also lead to some tricky errors to debug. A **declaration**, like the function declaration above, will be hoisted. An **expression** behaves differently:

```
favouriteFood2("beans")

var favouriteFood2 = function(food) {
  console.log("My favourite food is " + food);
}

// returns favouriteFood2 is not a function

```

So what's happening here? The answer is that only *part* of the function expression is hoisted - the left side of the assignment is put into memory, but the interpreter recognizes the right side as an assignment statement and skips it (to come back later).
This results in a confusing error, since we *have* defined `favouriteFood2`...just not in the order we needed to.

Using the keyword `let` instead of `var` with this example returns a new error:


```
favouriteFood3("pineapple")

let favouriteFood3 = function(food) {
  console.log("My favourite food is " + food);
}

// returns favouriteFood3 is not defined

```

This error is more helpful, since it tells us there's a specific problem with our variable - it isn't defined by the time the interpreter is reading it.

Understanding hoisting can be tricky, but it will help you avoid many errors in your code. An excellent explanation (with pictures!) can be found here: https://scotch.io/tutorials/understanding-hoisting-in-javascript
