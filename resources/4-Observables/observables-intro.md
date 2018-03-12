# Observables: introduction

Since JavaScript is single-threaded, we often run into situations that involve asynchronous data flows.

## What are asynchronous data flows again? 

Data from functions that are processed in their own time, where the results will arrive outside the regular flow of the app. 

For example, we often see this in the context of API calls when we request data from another server or backend service. We make a request for the data on the side and, once the data arrives, we put it in a queue to be processed. We don't actually stop and hold up all activity in the app until the data comes back. Instead, we put it to the side and process it when it arrives (and when we're ready) - [read more about event loop](https://github.com/bridge-school/content/blob/e635234b330df2b7fb6bd425efa10391027ae620/resources/1-Javascript-General-Topics/js-eventloop.md).

We also encounter this with DOM events, timer intervals, web workers and web sockets.

**Don't we already have a few ways to handle asynchronous data?** 
Yes, we can use callback functions and promises for example. But Observables are slightly different as they allow us to process **streams of data**.

## Why should I care?

Observables play a key part in something called **reactive programming**. This is the concept of programming with asynchronous data streams (a sequence of values in time). You can choose to listen to these streams and, as data comes through them, react accordingly. 

Data streams are functional - so you can use streams as inputs into other streams, combine them, filter them, etc using a variety of helpful functions. 

Angular has Observables baked into core parts of its library, such as its event system and HTTP client service, using a third-party library called RxJS (Reactive Extensions). In addition, we're starting to see more React projects use RxJS to take advantage of Observables to manage streams.

## What is an Observable?

Observables originate from something called the **observer design pattern**. 

> The observer pattern is a software design pattern in which an object, called the **subject**, maintains a list of its dependents, called **observers**, and notifies them automatically of any state changes, usually by calling one of their methods. ([source](https://en.wikipedia.org/wiki/Observer_pattern)) 

Ok, so that definition is pretty wordy and technical. 

In simple terms, the pattern involves an object (called an observable) that will share (or emit) data as it arrives over time. Throughout your code, many different objects (called observers) can sign up to be notified when that data arrives (called subscribing). So, whenever our observable recieves its data, it will broadcast that information out and the observers will be listening for it.  

Some key points to note about the pattern:

- You can have one observable and many observers (a one-to-many dependancy). That is, one broadcaster and an unlimited number of recipients.
- When that observable changes, all observers should be updated/notified immediately and automatically
- It is the observer's responsibility to register and unregister themselves from the observable (to be notified of changes) and to update their own state when notified.

## So... an Observable?

Think of an observable as a box that you create to hold data from a service or function whose data or items will arrive over time. 

As the data arrives, the box notifies anyone that has requested they be updated and it does so in the way they've asked.

## Basic structure

In its simpliest form, an Observable is a function that accepts an object (an observer) with next, error and complete methods on it. 

When you create an observable, you call its constructor and pass in a function. That function takes in an observer as a parameter and its body contains instructions for when to call each of the observer's methods. 

For example:

```javascript
const data = Observable.create(observer => {
  setTimeout(() => observer.next('first'), 1000);
  setTimeout(() => observer.complete(), 3000);
});
```

The newly created observable doesn't actually do anything until: 
- a) someone subscribes and passes in an observer and 
- b) data is emitted.

When you subscribe to an observable, this is the equivilant to calling the observable like a function and passing in an observer. This tells the observerable that you'd like to be notified when data arrives, and tells it which functions to run (via the observer object) to do that.

```javascript
this.data
    .subscribe({
        next: console.log,
        error: console.error,
        complete: () => console.info('complete')
    });
```

Our observer contains 1 to 3 functions to be executed by the observable:
 - next: function that will be executed each time a value is emitted (mandatory) 
 - error: function that will be executed when an error is emitted (optional)
 - complete: function that will be executed when a 'completed' is emitted (optional)

 ```javascript
const myObserver = {
    next: console.log,
    error: console.error,
    complete: () => console.info('complete')
}
const subscription = this.data
    .subscribe(myObserver);
    
setTimeout(() => subscription.unsubscribe(), 5000);
```

Those functions you pass in as part of the observer object will stay active and listen for those events until you manually decide to unsubscribe from and stop listening to the observable.

Note: `error` and `complete` are optional. But when these functions are called, they will trigger the unsubscription logic and the observer will stop listening to the observable. So if there is an error, the complete won't fire and vice versa.

When you subscribe, the observable sets up your observer with the functions you pass in and, when it emits, it'll call those functions.

## Basic example

[Open in JSbin](https://jsbin.com/penicovixi/edit?js,console)

*(example by Philip Da Silva)*

## How do Observables compare?

Callbacks:
- Not as scalable and they often can become overly nested (pyramid of doom)

Promises:
- Good for one piece of data but they aren't as helpful for managing collections of data over time. For example, when you expect one value from a server and then for that promise to be fulfilled. 
- They also aren't cancellable - they are always listening.

Observables:
- Allow us to work with complex data over time (streams)
- Are cancellable
- Are compositional (you can build on them) and they are lazy (they do not start emitting data until an observer has subscribed)
- Allows us to chain together array-like operators and pass observable streams through to parse, modify and maintain the data within them. We'll look at these next.

## Resources

- [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
- [RxBook](https://xgrommx.github.io/rx-book/why_rx.html)
- [Learning Observable By Building Observable](https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87)
- [An Introduction to Observables for Angular Developers](https://developer.telerik.com/topics/web-development/introduction-observables-angular-developers/)
- [Angular 2 Training: Observables](https://angular-2-training-book.rangle.io/handout/observables/)
- [Hot vs Cold Observables](https://medium.com/@benlesh/hot-vs-cold-observables-f8094ed53339)
- [Observables and Reactive Programming in Angular 2](http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/)
- [Learn RxJS](https://www.learnrxjs.io/)
- [RxJS](http://reactivex.io/rxjs/)
