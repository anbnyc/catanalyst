import React, { Component } from 'react';

import { hexPath } from './utils'

import './Tile.css'

class Hex extends Component {
  
  render() {

  	const { hexPerSide, sideLen, d, starter } = this.props
  	const r3o2s = sideLen * Math.sqrt(3)/2

    return (
      <g 
      	className={"tile "+d.tile+(starter ? " starter" : "")}
      	transform={`translate(
      		${(sideLen + r3o2s*Math.abs(d.row - hexPerSide + 1) + (d.cell*2*r3o2s))},
      		${(d.row*1.5*sideLen)}
    		)`}>
      	<polygon points={hexPath(sideLen, r3o2s)} />
      	<text 
  				className="letter"
					y={sideLen-5}>
	      	<tspan>{d.odds.roll}</tspan>
	      	<tspan className="small" x={0} dy={15}>{"("+(d.odds.letter === "desert" ? "" : d.odds.letter)}</tspan>
	      	<tspan className="small" dx={d.odds.letter === "desert" ? 0 : 5} dy={0}>{d.odds.roll+"/36)"}</tspan>
    		</text>
      </g>
    );
  }

}


export default Hex;
