import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router';

export default class App extends Component {



  APP_ROUTES = [{label: 'Planets', path: '/swplanets'}];



  render() {
    return (
      <div className="App">
        <h2>Your Star wars app!</h2>

        {this.APP_ROUTES.map(route => <Link key={route.label} to={route.path}> {route.label} </Link>)}

      </div>
    );
  }
}