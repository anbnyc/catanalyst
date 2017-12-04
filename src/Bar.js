import React from 'react';
import * as d3 from 'd3';

import Transition from './Transition'
import './Bar.css'

const Bar = props => {

	const { barData, width, vertical } = props
	let barKeys = [ ...Object.keys(barData || {})].sort((a,b) => d3.ascending(a,b))
	const margin = 10;
	const xScale = d3.scaleLinear()
		.domain([0, 20])
		.range([0, 200])
	const yScale = d3.scaleBand()
		.domain(barKeys)
		.rangeRound([margin, 250], .1)

  return (
    <g 
    	className="bar-container" 
    	transform={`translate(${vertical ? .35*width : .55*width}, ${vertical ? 300 : 30})`}>
    	{barKeys.map(k => 
    		<g className={"bar "+k}
    			key={k}
    			transform={`translate(${margin},${yScale(k)})`}>
    			<text 
    				className="material" 
    				x={-5} 
    				y={15 + .5*yScale(barKeys[0])}>{k}</text>
    			{barData[k].map((d,i) => 
    				<g className="segment" key={k+i}>
    					<Transition 
    						attr={["width","x"]} 
    						time={500}>
      					<rect 
      						x={xScale(d.sum - d.probability)}
      						width={xScale(d.probability)}
      						height={30} />
  						</Transition>
    				</g>
  				)}
    		</g>)}
    </g>
  );

}

export default Bar;
