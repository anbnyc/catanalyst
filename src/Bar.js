import React, { Component } from 'react';
import * as d3 from 'd3';

import Transition from './Transition'
import './Bar.css'

class Bar extends Component {

  render() {
		const { barData } = this.props
		let barKeys = [ ...Object.keys(barData || {})].sort((a,b) => d3.ascending(a,b))
		const margin = 10;
		const width = 350
		const xScale = d3.scaleLinear()
			.domain([0, 20])
			.range([0, 200])
		const yScale = d3.scaleBand()
			.domain(barKeys)
			.rangeRound([margin, width - margin], .2)
    return (
      <g className="bar-container" transform="translate(515,30)">
      	{barKeys.map(k => 
      		<g className={"bar "+k}
      			key={k}
      			transform={`translate(${margin},${yScale(k)})`}>
      			{barData[k].map((d,i) => {
      				return <g className="segment" key={k+i}>
      					<Transition 
      						attr={["width","x"]} 
      						time={500}>
	      					<rect 
	      						x={xScale(d.sum - d.probability)}
	      						width={xScale(d.probability)}
	      						height="30">
	    						</rect>
    						</Transition>
      				</g>
      			}
      				)}
      		</g>)}
      </g>
    );
  }

}

export default Bar;
