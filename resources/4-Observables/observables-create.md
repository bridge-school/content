## A Practical Use of Observables

After one learns how to use observables, it's often difficult understanding the best way to implement them - so here is a quick guide in some really useful observable methods that will start to give you a good idea of how to use them in the real world.

### Different ways to create Observables

#### Observable from anything

- One of the simplest ways to make an observable is to to use `Observable.of()`, which will take any sort of object

```js

const numberObservable = Observable.of(5);

numberObservable.subscribe(result => console.log(result));

```
#### Event based

- We can use DOM events to create new observables

```js
const clickEvents = Observable.fromEvent(document, 'click');
clickEvents.subscribe(clickEvent => console.log(clickEvent));
```

- Almost any sort of event from third party libraries would work as well

### Iterable/Promise based

- We can make observable streams based off of arrays, useful when you want to iterate over each item in an array

```js
const listObservable = Observable.from([1,2,3,4,5]);
listObservable.subscribe(eachItem => console.log(eachItem))
```

- Important to note, that unlike `Observable.of()`, `Observable.from()` takes iterables and converts them to streams, so what that difference looks like: 

```js
const listObservable = Observable.from([1,2,3,4,5]);
listObservable.subscribe(eachItem => console.log('item: ', eachItem))

// vs

const listObservable2 = Observable.of([1,2,3,4,5]);
listObservable.subscribe(FullList => console.log('full list: ', fullList))
```

- `Observable.from()` also works with promises and array like objects!

- Take a look at more examples here: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html

