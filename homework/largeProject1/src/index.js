import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import {Router, Route, hashHistory} from 'react-router';
import Planets from "./containers/Planets/planets";

import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="swplanets" component={Planets}/>
  </Router>,
  document.getElementById('root')
);
