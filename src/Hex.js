import React, { Component } from 'react';
import * as d3 from 'd3';

import Tile from './Tile'
import { Cube, cubeScale, cubeEqual, cubeNeighbor } from './utilsCube'

class Hex extends Component {
  
  render() {
  	const { data, sliderValue, hexPerSide } = this.props
    return (
      <g className="hex-container" transform="translate(125,30)">
      	{(data || []).map(d => //sort by starter value
      		<Tile 
      			starter={cubeEqual(cubeScale(cubeNeighbor(new Cube(0,0,0), sliderValue), hexPerSide - 1), d.cube)}
      			d={d} 
						{ ...this.props } />)}
      </g>
    );
  }

}

export default Hex;
