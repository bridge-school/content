# SwitchMap vs MergeMap

SwitchMap and MergeMap are smiliar operators, they're your go-to when you need to combine streams. Knowing the who, what, and why between these two operators will help you pick the right one for the job. Let's start with their similarites:

#### SwitchMap
SwitchMap is an operator that maps the values emitted from an observable to a different observable.

#### MergeMap
MergeMap is an operator that maps the values emitted from an observable to a different observable.

___
Pretty ~~similar~~ identical so far, right? There _are_ differences, but I'll save those for later.  Let's first pick apart this definition and then move to the differences. 

#### SwitchMap & MergeMap
SwitchMap _and_ MergeMap are operators that map the values emitted from an observable to a different observable.

To start, let's break apart SwitchMap and MergeMap into the individual **verbs** that make them up: 


| Verb     | What it does  |
| -------- |:-------------:| 
| Map      | ? | |
| Merge    | ?      | 
| Switch   | ?      | 

#### Map
When you see **map** you can read it as: 
>Use the value of something to change it to something else.

To expand on this, consider this tragic hypothetical. Imagine a world where there are no dogs. Only cats. At one point there _were_ dogs, but somewhere in time CatConverter was created.  CatConverter is a machine that takes a group of dogs and converts them to cats! 

```javascript
const dogs$ = Rx.Observable.from([
  { name: 'sam', animal: 'dog', fur: 'brown' },
  { name: 'fluffy', animal: 'dog', fur: 'orange' },
  { name: 'jen' , animal: 'dog', fur: 'black' },
]).concatMap(dog => Rx.Observable.of(dog).delay(500))

const CatConverter = (dogs) => Rx.Observable.from(dogs)
    .map((dog) => `Plain old cat`);

CatConverter(dogs$)

```
<a target="_blank" href="https://rxviz.com/v/2ORwP2Jd">Run this code</a>

This CatConverter takes a list of dogs and converts them to cats.  But it's not making use of the "_**value of something**_" from our map definition above:
>Use the _**value of something**_ to change it to something else.  

Instead it's recieving a dog and returning a plain old cat. 

Let's update CatConverter so that instead of converting dogs to plain old cats, it creates cats with different colour fur. It will use the fur from the dog to create the cat.  (That sounds dark) 

```diff
const dogs$ = Rx.Observable.from([
  { name: 'sam', animal: 'dog', fur: 'brown' },
  { name: 'fluffy', animal: 'dog', fur: 'orange' },
  { name: 'jen' , animal: 'dog', fur: 'black' },
]).concatMap(dog => Rx.Observable.of(dog).delay(500))

const CatConverter = (dogs) => Rx.Observable.from(dogs)
+    .map((dog) => `${dog.fur} cat`);

CatConverter(dogs$)

```
<a target="_blank" href="https://rxviz.com/v/L8k6Y2J7">Run this code</a>.

Notice the update to CatConverter? Now it uses the fur of the dog to determine the cat's colour.

Now our definition for map makes sense:
>Use the _**value of something**_ to change it to _**something else**_. 

A.K.A

>Use the _**colour of the dog's fur**_ to change the dog to a _**cat with the dog's fur colour**_. 

It helps to keep this definition in mind because there are numourouse Rx operators that have the word **map** tacked on to the end. And it's always for the same reason: "To use the _**value of something**_ to change it to _**something else**_."

##### Operators with map
- map
- concatMap
- exhaustMap
- mergeMap
- switchMap

Update the verbs with our map definition:

| Verb     | What it does  |
| -------- |-------------| 
| Map      | Use the _**value of something**_ to change it to _**something else**_.  | |
| Merge    | ?      | 
| Switch   | ?      | 

### Merge
Next verb in the list is merge.

>Merge takes two or more observable streams and combines them together.

With that, come back to our world where there are cats _and_ dogs.

```javascript
const dogs$ = Rx.Observable.from([
  '🐶 Rover',
  '🐶 Mr Muffin',
  '🐶 Huck',
]).concatMap(dog => Rx.Observable.of(dog).delay(1000))

const cats$ = Rx.Observable.from([
  '🐱 Precious',
  '🐱 Mittens',
  '🐱 Garfield',
]).concatMap(cat => Rx.Observable.of(cat).delay(400))

Rx.Observable.merge(
  dogs$,
  cats$
);
```
<a target="_blank" href="https://rxviz.com/v/RoQB01OM">Run this code</a>.

Looking at these two streams individually can be represented by these two marble diagrams:

**dogs$:**`|-----d-----d-----d-------->`

**cats$:** `|-c--c--c------------------>`

Each letter represents an emission _over time_.  

Time? Yes, notice in the code snippit that the `dogs$` stream emits one dog every 1 second. And the `cats$` stream emits one cat every 0.4 of a second. Apparently cats are faster than dogs.

Using `merge()` at the end of the snippit, we flatten these two streams into one stream. If you line everything up, that's visually easy to see:

**dogs$:**`|-----d-----d-----d-------->`

**cats$:** `|-c--c--c------------------>`

`merge()`

**both$:** `|-c--cd-c--d-----d--------->`

See how the dogs on the `$dogs` stream line up with the dogs on the `both$` stream and the cats on the `cats$` stream line up with the cats on the `both$` stream? That's a merge.


Update the verbs with our merge definition:

| Verb     | What it does  |
| -------- |---------------| 
| Map      | Use the _**value of something**_ to change it to _**something else**_.  | |
| Merge    | Merge takes two or more observable streams and _**combines**_ them together.      | 
| Switch   | ?      | 

### Switch
Last verb on the list is switch.
>Switch operates on a stream where each emission is another stream.  Switch will   stop listening to the orignal stream at each emission and changes to the new emitted stream.  At every subsequent emission from the root stream, it will stop listening to the previouse child stream. 

This is the tougher one of the bunch to understand based off the description, so let's jump to the cats and the dogs. 

Remember CatConverter? It's causing a pretty big imbalance in the universe.  Let's hack that thing. We're going to change it to an AnimalCloner! This way, any animal that wanders into the machine will get cloned every 100th of a second until the next animal wanders in. What could go wrong? Balance will be restored. 

```javascript
const dogClones$ = Rx.Observable.interval(100).mapTo('🐶');
const catClones$ = Rx.Observable.interval(100).mapTo('🐱');

const catsAndDogs$ = Rx.Observable.from([
  dogClones$,
  dogClones$,
  catClones$,
  dogClones$,
  catClones$,
]).concatMap(animals$ => Rx.Observable.of(animals$).delay(1000));

const AnimalCloner = (animals$) => animals$;

AnimalCloner(catsAndDogs$);
```

<a target="_blank" href="https://rxviz.com/v/6Jrz26JG">Run this code</a>

First thing to note here is that it does NOT use the switch operator.  And has caused chaos:

```javascript
|------d$------d$------c$------d$------c$--------->
       |
       |-🐶-🐶-🐶-🐶-🐶-🐶-🐶-🐶-🐶-🐶-🐶-🐶-🐶>
       		    |
       		    |-🐶-🐶-🐶-🐶-🐶-🐶-🐶-🐶-🐶-🐶->
       		          |
       		          |-🐱-🐱-🐱-🐱-🐱-🐱-🐱-🐱->
       		                  |
       		                  |-🐶-🐶-🐶-🐶-🐶-🐶>
       		                         |
       		                         |-🐱-🐱-🐱-🐱>
       
```
AnimalCloner is out of control. What we want is _one_ stream of animals for each time an animal enters the cloner. Instead we end up with _multiple_ streams. `Switch` to the rescue, but first we need to make sure we understand why there are multiple streams here.

`dogClones$`: This is a stream of dogs that emit every 100th of a second

`catClones$`: This is a stream of cats that emit every 100th of a second

`catsAndDogs$`: This is a stream that emits a mix of **dogClones$** and **catClones$** every second. The important take-away here is that this is a **stream of streams**.  That's why when we pass `catsAndDogs$` into `AnimalCloner()` we get that nasty barage of streams. What we want is one stream.  And this is exactly what's missing from the **switch** description:

>Switch operates on a stream where each emission is another stream.  Switch will   stop listening to the original stream at each emission and change to the new emitted stream.  At _**every subsequent emission from the root stream, it will stop listening to the previous child stream**_.  

Let's add `switch()`.

```javascript
const dogClones$ = Rx.Observable.interval(100).mapTo('🐶');
const catClones$ = Rx.Observable.interval(100).mapTo('🐱');

const catsAndDogs$ = Rx.Observable.from([
  dogClones$,
  dogClones$,
  catClones$,
  dogClones$,
  catClones$,
]).concatMap(animals$ => Rx.Observable.of(animals$).delay(1000));

const AnimalCloner = (animals$) => animals$;

AnimalCloner(catsAndDogs$).switch();
```

<a target="_blank" href="https://rxviz.com/v/38MYm38v">Run this code</a>

Fixed. Now it's just one nice stream that _switches_ to the latest dog or cat stream over time. 

```javascript
|------d$------d$------c$------d$------c$--------->
       |
       |-🐶-🐶-🐶-🐶-🐱-🐱-🐱-🐶-🐶-🐶--🐱-🐱-🐱>
```
Update the verbs with our switch definition:

| Verb     | What it does  |
| -------- |-------------| 
| Map      | Use the _**value of something**_ to change it to _**something else**_.  | |
| Merge    | Merge takes two or more observable streams and _**combines**_ them together.      | 
| Switch   | Switch operates on a stream where each emission is another stream.  Switch will   stop listening to the original stream at each emission and changes to the new emitted stream.  At every subsequent emission from the root stream, it will stop listening to the previous child stream.       | 

### MergeMap & SwitchMap
Now that we have all the verbs defined, we can combine the definitions together to understand these two operators. 

##### MergeMap
>MergeMap changes (maps) the values emitted from one stream to a new stream.  It combines (merges) all the new streams into one stream. 

##### SwitchMap
>SwitchMap changes (maps) the values emitted from one stream to a new stream.  It stops listening to the previous stream and changes (switches) to the next stream. 

Let's see these in action, but this time I'll go with a more real-world example.

Consider a chat app. The app has a list of users that you can click on to begin listening to their messages. At any point, you can click a different user to begin seeing their messages instead. In Observable land, this could look like:

```javascript
const kim = document.createElement('input');
const bob = document.createElement('input');
output.prepend(kim)
output.prepend(bob)

kim.setAttribute('type', 'button');
kim.setAttribute('value', 'kim');

bob.setAttribute('type', 'button');
bob.setAttribute('value', 'bob');

const chatStream$ = Rx.Observable.merge(
   Rx.Observable.fromEvent(kim, 'click'),
   Rx.Observable.fromEvent(bob, 'click'),
).mergeMap((clickEvent) => Rx.Observable
   .interval(800)
   .mapTo(`Hi from ${clickEvent.target.value}`)
);

chatStream$.map((message) => message);
```
<a target="_blank" href="https://rxviz.com/v/jOLw0Boy">Run this code</a>

This example attempts to accomplish the chat requirements with **mergeMap**. Stepping through the code, we can understand what's going on.

```javascript
const kim = document.createElement('input');
const bob = document.createElement('input');
output.prepend(kim)
output.prepend(bob)

kim.setAttribute('type', 'button');
kim.setAttribute('value', 'kim');

bob.setAttribute('type', 'button');
bob.setAttribute('value', 'bob');
```
This creates the html buttons and gives them a value of either 'kim' or 'bob'.

```javascript

const chatStream$ = Rx.Observable.merge(
   Rx.Observable.fromEvent(kim, 'click'),
   Rx.Observable.fromEvent(bob, 'click'),
)
```
This creates two streams and combines them. The streams are (1) clicks from 'bob' and (2) clicks from 'kim'.

```javascript
const chatStream$ = Rx.Observable.merge(
   Rx.Observable.fromEvent(kim, 'click'),
   Rx.Observable.fromEvent(bob, 'click'),
).mergeMap((clickEvent) => Rx.Observable
   .interval(800)
   .mapTo(`Hi from ${clickEvent.target.value}`)
);
```
This **mergeMap()'s** off the stream of clicks. Our definition of mergeMap tells us that it will **change** the value from the first stream of clicks into a **new Observable**.  The new Observable emits a message from the clicked user every 800th of a second. 

Unlike **switchMap**, as clicks are emitted from the first stream, the previous child message stream never actually stops.  They just keep collecting over time! That gets pretty noisy. 

Run the example and switch between bob and kim. You'll see each time you switch to a different user, the messages pile up. Clearly, we're not switching - we're merging!

We need to switch. Let's update:


```javascript
const kim = document.createElement('input');
const bob = document.createElement('input');
output.prepend(kim)
output.prepend(bob)

kim.setAttribute('type', 'button');
kim.setAttribute('value', 'kim');

bob.setAttribute('type', 'button');
bob.setAttribute('value', 'bob');

const chatStream$ = Rx.Observable.merge(
   Rx.Observable.fromEvent(kim, 'click'),
   Rx.Observable.fromEvent(bob, 'click'),
).switchMap((clickEvent) => Rx.Observable
   .interval(800)
   .mapTo(`Hi from ${clickEvent.target.value}`)
);

chatStream$.map((message) => message);

```

<a target="_blank" href="https://rxviz.com/v/RoQBxAOM">Run this code</a>


Switched! Run the example again and observe the new behaviour. It actually switches now. As you change from bob to kim, the stream stops listening to bob and _**switches**_ to kim.