## Arrow functions

Every once in a while, javascript as a language gets 'updated' - new features and functionality get added that can really make your life as a developer easier.

One of them most valuable and significant updates has been the introduction of the arrow function. For a quick recap, traditional
functions look like this:


```js
function doublingFunction(num) {
  return num * 2;
}

// or

var otherDoubler = function(num) {
  return num  * 2;
}

```

Above are examples of traditional function declarations, they have parameters and return statements, and when we write really simple functions, there's a lot of bloat there.

Additionally, 'scope' and the 'this' keyword add more complications. Without delving too deep into either subject, `this` as a keyword references the current scope, and in a traditional function, that essentially means 'on whatever object invokes it'. Let's give an example:


```js

class MyClass {
  constructor() {
    
    // Here we give this class a number, 5 - and we set it to the class variable basenum. To access this in the class
    // We would say somewhere, this.baseNum and it would reference THIS particular property
    this.baseNum = 5;
    
    this.adder = function adder(num) {
      return this.baseNum + num;
    }
    
    console.log(this.adder(5)); // This resolves to 10, because here adder references 'this' as the classes this
    
    
    const myFunObject = {
      baseNum: 3,
      adder: this.adder // here I assign that adder function defined to this object's property
    }
    
    console.log(myFunObject.adder(5)); // This equals 8!! That's because the 'this' inside of adder references the object it was assigned to! 
  }
  
}

```

You can see above an example of how traditional functions can make scoped references complicated. This is where arrow 
functions can come to help as well! Let's look at how arrow functions can both simplify the syntax and also change the standard behaviour of functions in regards to scope.

```js
class MyClass {
  constructor() {
    
    // Here we give this class a number, 5 - and we set it to the class variable baseNum. To access this in the class
    // We would say somewhere, this.baseNum and it would reference THIS particular property
    this.baseNum = 5;
    
    this.adder = (num) => this.baseNum + num;
    
    console.log(this.adder(5)); // This resolves to 10, because here adder references 'this' as the classes this
    
    
    const myFunObject = {
      baseNum: 3,
      adder: this.adder
    }
    
    console.log(myFunObject.adder(5)); //this STILL resolves to 10, because the reference to 'this' is still the class version. 
  }
  
}
```

In the above example, scope is resolved and arrows make this function a lot smaller! Let's talk about the syntax of an arrow function.

First, you'll notice that arrow functions cannot be created the same way as a function `declaration`. What that means is you
cant just use the function keyword, this is not legal js for example: 

```js
function myArrowFunction() => 5 + 5;
```

That means functions need to always be assigned to a variable, ie they must always be function `expressions`.

```js
const myArrowFunction = () => 5 + 5;
```

Next, let's look at the parameters. Like regular functions, parameters are declared inside of the `()` parenthesis. 
There are some slightly confusing rules however about when the the `()` are even needed.

First - when you do not have any parameters, you NEED to have parenthesis.

```js
const myArrowFunction = () => 5 + 5; //good
const myArrowFunction2 =  => 5 + 5; //bad
```

Second - when you have only 1 parameter, you can OPTIONALLY have parenthesis.

```js
const myArrowFunction = (num) => num + 5; //good
const myArrowFunction2 = num => num + 5; //good
```

Third - when you have MORE than 1 parameter, you MUST have parenthesis.

```js
const myArrowFunction = (num1, num2) => num1 + num2; //good
const myArrowFunction2 = num1, num2 => num1 + num2; //bad
```

Now let's move on to the arrow itself! the `=>` is sort of equivalent to the opening brackets of a function `{`.
Except those brackets are optional with arrow functions, and whether or not you use them, you have different behaviour.

For example, if you do NOT use `{}` brackets in your arrow function, on the right side of the arrow, whatever evaluates 
is then assigned to the return statement, but you can only have 1 line of code. if you DO use `{}` brackets, you need to 
separately declare your return, but you can have multiple lines. In both instances, the `this` behaviour is the same.


```js
const myArrowFunction = () => 5 + 5; // auto return
const myArrowFunction2 = () => {
  console.log('I can do multiple lines');
  return 5 + 5; // but you need to declare your returns
} 
```
