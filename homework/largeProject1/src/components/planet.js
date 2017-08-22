import React, {PropTypes} from 'react';


const Planet = (props) => (

  <div>
    <h4>{props.name}</h4>
    <p>Climate: {props.climate}</p>
  </div>
);


Planet.propTypes = {
  name: PropTypes.string,
  climate: PropTypes.string
};

export default Planet;