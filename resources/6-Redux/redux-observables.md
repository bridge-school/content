# Redux Observables


## What problem does this solve?

- Redux is great at managing state, but natively has trouble dealing with multiple async actions elegantly
- `Redux-thunk` can be the breeding ground for [Callback hell](http://callbackhell.com/)
- If you want to keep all of your components stateless, it can be challenging to do so:
```jsx harmony
import React from 'react';
import { connect } from 'redux';
import { myAsyncInitAction } from './actions';

class MyAlmostStatelessComponent extends React.Component {
  
  componentDidMount(){
    
    // I want this to happen when my app loads
    this.props.myAsyncInitAction();
  }
  
  render(){
    return <div>
    <h1>I could have been stateless...</h1>
</div>
  }
}

export default connect({}, { myAsyncInitAction })(MyAlmostStatelessComponent)
```

## How does it solve it?

- Utilizing Redux's middleware system, Redux-Observable is an rxjs based side-effect management library

### Epics
- Epics are set in place to listen to actions, in a similar way a reducer is
- Epics emit actions that happen at the end of your asynchronous chain (Actions in Actions out)
- Epics are functions that return Observables
- The returned observable should be wrapping an action object
- The action object is then heard by all reducers AND epics

```js
export const myInitializationEpic = action$ =>

  // the action$ object here is special, and hears ALL actions tha go through, like a reducer
  // ofType waits for a very specific action, and when it does, it allows everything after to fire
 // thing of ofType like an if statement - if the action is ofType [x] - then do!
  action$.ofType('MySpecialAction')
    // mergeMap is what's used to handle nested async calls - in this case a fetch, which returns a promise
    .mergeMap(action =>
    
      //make a request somewhere based off the data provided in the action payload
      fetch(`www.myAPI.com/${action.payload}`)
        // finally, map to another action
        .map(response => ({
          type: 'API_SUCCESS',
          payload: response
        }))
    );
```


### Setup
- Similar setup to reducers, where you have a root epic that that combines all epics into one
- Hooks into the middleware portion of your redux application

```js
import { combineEpics, createEpicMiddleware } from 'redux-observable';

// these are all epic actions, like written in the above example
import { epic1, epic2, epic3 } from './epics';

//this combineEpics function simple takes each epic as an argument and creates a single root 'epic' 
const rootEpic = combineEpics(
  epic1,
  epic2,
  epic3,
);

// createEpicMiddleware wraps your combined epic, and creates the hooks for it listen to redux's middlware system
export const epicMiddleware = createEpicMiddleware(rootEpic);
```

```js

import { createStore, applyMiddleware } from 'redux';
import { epicMiddleware } from './epicRoot';
import { rootReducer } from './reducerRoot';


export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  );


  return store;
}

```