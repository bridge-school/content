## Object Immutability

- First, lets remember that we can have multiple variables all `pointing` to the same object
- When this happens changing something in the copy seemingly changes something in the original too

```js
var originalMsMarvel = {
    firstName: 'Carol',
    lastName: 'Danvers',
    superPower: 'Flying and other stuff'
}

// Here they are both the same
var newMsMarvel = originalMsMarvel;

newMsMarvel.firstName = 'Kamala';
newMsMarvel.lastName = 'Khan';

console.log('the new ms Marvel', newMsMarvel);
console.log('the original ms Marvel', originalMsMarvel);
```

- In the above example, the original object has been mutated!
- This is because Javascript likes to have objects sharing references
- There are ways around this

## Sometimes you need to turn an array of numbers into just one big number

```js
var originalMsMarvel = {
    firstName: 'Carol',
    lastName: 'Danvers',
    superPower: 'Strong and stuff'
}

// Here they are both the same, however we use Object assign to create a new reference
var newMsMarvel = Object.assign({}, originalMsMarvel);

//This will not work!
//var newMsMarvel = Object.assign(originalMsMarvel);

newMsMarvel.firstName = 'Kamala';
newMsMarvel.lastName = 'Khan';

console.log('the new ms Marvel', newMsMarvel);
console.log('the original ms Marvel', originalMsMarvel);
```

- Here we can use Object.assign to force a new reference in memory, it shallow merges all arguments (which are objects)
- When using object assign, the FIRST object is the final reference in memory, use a new object literal `{}` for a new reference

## Primitive Immutability

- All Primitives are immutable! They cannot be changed like an object can be
- [Primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
    - string, number, boolean, null, undefined, symbol (new in es2015)

```js
var originalMsMarvel = 'Carol Danvers is strong and stuff!';
var newMsMarvel = originalMsMarvel;

newMsMarvel = newMsMarvel.replace('Carol Danvers', 'Kamala Khan');

console.log(originalMsMarvel, newMsMarvel);
```

- Above, you can see the original string has not een changed, even when we update `newMsMarvel`


### Const

- Introduced in es2015 to help keep code immutable

```js
var animal = 'horse';
animal = 'unicorn';

console.log('var change', animal);

let animal2 = 'horse';
animal2 = 'unicorn';

console.log('let change', animal2);

const animal3 = 'horse';
animal3 = 'unicorn'; // Will give you an error
```

- const prevents you from overriding variables, but does not protect against object mutation

## Array immutability

- Keeping Arrays immutable can be done with the right methods!
- [List of Mutating vs non mutating methods available in Array instance/methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
