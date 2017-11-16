import React, { Component } from 'react';

import { flatCube } from './utilsCube'
import Tile from './Tile'

class Hex extends Component {
  
  render() {
    return (
      <g className="hex-container" transform={`translate(${.05*this.props.width},5)`}>
      	{(this.props.data || [])
      		.sort((a,b) => a.starter - b.starter)
      		.map(d =>
	      		<Tile 
	      			starter={d.starter}
	      			key={flatCube(d.cube)}
	      			d={d}
							{ ...this.props } />)}
      </g>
    );
  }

}

export default Hex;