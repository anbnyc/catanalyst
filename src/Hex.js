import React, { Component } from 'react';
import * as d3 from 'd3';

import { hexPath } from './utils'
import { Cube, cubeScale, cubeEqual, cubeNeighbor } from './utilsCube'

import './Hex.css'

class Hex extends Component {
  
  render() {
    return (
      <g className="hex-container"></g>
    );
  }

  componentDidMount(){
  	d3.select(".hex-container").attr("transform", "translate(125,30)")
  }

	componentDidUpdate(){
		const { hexPerSide, sideLen, sliderValue, data } = this.props
		const r3o2s = sideLen * Math.sqrt(3)/2
		let tiles = d3.select(".hex-container").selectAll("g.tile")
	  	.data(data)
		tiles.exit().remove();
		let tilesEnter = tiles.enter().append("g")
		tilesEnter.append("polygon")
		tilesEnter.append("text")
	  tiles = tilesEnter.merge(tiles)
	  	.attr("class", d => "tile "+d.tile)
	  	.attr("transform", d =>
				"translate("+
	      	(sideLen + r3o2s*Math.abs(d.row - hexPerSide + 1) + (d.cell*2*r3o2s))+
	      	","+
	      	(d.row*1.5*sideLen)+")")
	  	.each(function(d){
	  		const starter = cubeEqual(cubeScale(cubeNeighbor(new Cube(0,0,0), sliderValue), hexPerSide - 1), d.cube)
  			d3.select(this).classed("starter", starter)
	  		if(starter){ this.parentNode.appendChild(this) }
	  	})
	  tiles.select("polygon")
	  	.attr("points", hexPath(sideLen, r3o2s))
		tiles.select("text")
			.attr("y", sideLen+3)
			.attr("class", "letter")
			.classed("highlight", d => d.odds.roll === 6 || d.odds.roll === 8)
			.text(d => d.odds.letter === 'desert' ? '' : d.odds.roll + " ("+d.odds.letter+")")
	}

}


export default Hex;
