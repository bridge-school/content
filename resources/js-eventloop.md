# The JavaScript Event Loop
## What is it?
Modern browsers have JavaScript engines that handle executing JavaScript using a model called the event loop. The event loop runs on a single thread - it only works on one thing at a time. It consist of three parts: stack, heap, and queue.

[![async----event_loop.jpg](https://s1.postimg.org/3k7w5fnq8v/async----event_loop.jpg)](https://postimg.org/image/1759o89x23/)

### Heap
The heap is just a mostly unstructured region where memory for objects is allocated. 

### Stack
The stack manages function calls at runtime. You can think of it as stacked *frames*, where each frame is a reference to a spot in some function scope. A frame is created when a function is called, and is removed when that function has completed. 

Below is a great example taken from [Exploring JS](http://exploringjs.com/es6/ch_async.html#sec_javascript-call-stack) to demonstrate the stack.

Let's look at this code:
```
function h(z) {
    // Print stack trace
    console.log(new Error().stack); // (A)
}
function g(y) {
    h(y + 1); // (B)
}
function f(x) {
    g(x + 1); // (C)
}
f(3); // (D)
return; // (E)
```
Initially, when the program above is started, the call stack is empty. After the function call f(3) in line D, the stack has one entry:
```
|----------|
| Location |
| in global|
| scope    |
|----------|
```
After the function call g(x + 1) in line C, the stack has two entries:
```
|----------|
| Location |
|  in f    |
|          |
|----------|
| Location |
| in global|
| scope    |
|----------|
```
After the function call h(y + 1) in line B, the stack has three entries:
```
|----------|
| Location |
|  in g    |
|          |
|----------|
| Location |
|  in f    |
|          |
|----------|
| Location |
| in global|
| scope    |
|----------|
```
The stack trace printed in line A shows you what the call stack looks like:
```
Error
    at h (stack_trace.js:2:17)
    at g (stack_trace.js:6:5)
    at f (stack_trace.js:9:5)
    at <global> (stack_trace.js:11:1)
```
Next, each of the functions terminates and each time the top entry is removed from the stack. After function f is done, we are back in global scope and the call stack is empty. In line E we return and the stack is empty, which means that the program terminates.

### Queue
The queue is a place where messages line up to be processed during runtime. Think of a message as a task item (sidenote: they are often called tasks). Every message has an associated function. A message is processed when:
1. It is at the front of the queue (first in line) 
2. The previous message is completely done being processed

Only one message is processed at a time. The processing consists of calling the associated function, which creates the initial stack frame. That function will do its business and eventually complete aka be terminated and removed from the stack. The processing is completed when the stack is empty again.

## When are messages added to the queue?
// this section is not complete
There are various things that are added to the queue as messages (for example, reaction to user input such as click). Asynchronous tasks with an associated callback function will put a message in the queue after they have completed (ex- when an asynchronous network request returns a result). 

## An example
Let's look at an example. When you run this JS code, what do you expect to see in your console (in what order will the statements print)?

```javascript
console.log('script start');

setTimeout(function() {
  console.log('hello!');
}, 0);

console.log('script end');
```

[Try it out yourself](https://repl.it/OBrd/0)

It turns out they print in this order:
```
script start
script end
hello!
```

Why doesn't `hello!` print before `script end` if the `setTimeout` comes before the last `console.log` and has a delay of 0 milliseconds?








