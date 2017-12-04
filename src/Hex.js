import React from 'react';

import { flatCube } from './utilsCube'
import Tile from './Tile'

const Hex = props => (
  <g 
  	className="hex-container" 
  	transform={`translate(${.5*props.width - (props.vertical ? 130 : 400)},30)`}>
  	{(props.data || [])
  		.sort((a,b) => a.starter - b.starter)
  		.map(d =>
    		<Tile 
    			starter={d.starter}
    			key={flatCube(d.cube)}
    			d={d}
					{ ...props } />)}
  </g>
);


export default Hex;