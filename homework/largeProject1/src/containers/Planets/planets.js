import React, {Component} from 'react';
import * as $ from 'jquery';
import Planet from '../../components/planet';



export default class Planets extends Component {

  PLANET_LIST_URL = 'http://swapi.co/api/planets';

  state = {
    planetList: []
  };

  getAllPlanets = (pageUrl) => $.get(pageUrl ? pageUrl : this.PLANET_LIST_URL)
    .then(result => this.setState(
    {
      planetList: this.state.planetList.concat(result.results),
      count: result.count,
      nextUrl: result.next
    }
    ));


  componentDidMount(){
    this.getAllPlanets();
  }


  render = () =>
    (<div>
      <h3>List of Star Wars Planets</h3>
      {this.state.planetList.map(planet => <Planet key={planet.url} name={planet.name} climate={planet.climate} />)}
      {this.state.nextUrl ? <button onClick={() => this.getAllPlanets(this.state.nextUrl)}>Load More</button> : ''}
    </div>)
}