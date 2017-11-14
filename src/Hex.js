import React, { Component } from 'react';
import * as d3 from 'd3';
import * as HexDataGen from 'hex-data-gen';

import { hexPath, odds, getAllTiles, flatCube } from './utils'
import { cubeCoordinates, cubeSpiral, Cube, cubeScale, cubeEqual, cubeNeighbor } from './utilsCube'

import './Hex.css'

class Hex extends Component {
  
	constructor(props){
		super(props)
		this.state = {
			hexPerSide: 3,
			sideLen: 40,
		}
	}

	componentWillMount(){
		let allTiles = getAllTiles()
		let data = HexDataGen(this.state.hexPerSide, false)
			.map(r => 
				r.map(c => 
					({ ...c, tile: allTiles.pop(), cube: cubeCoordinates(c, this.state.hexPerSide) })
			))
		this.setState({
			data,
			r3o2s: this.state.sideLen * Math.sqrt(3)/2
		})
	}

	componentDidMount(){
		const { hexPerSide, sideLen, data, r3o2s } = this.state

		var spiral = cubeSpiral(new Cube(0, 0, 0), 3).map(flatCube)//.reverse()

		let svg = d3.select("svg")
			.attr("height", 600)
			.attr("width", 1000)
			.append("g")
			.attr("transform", "translate(100,100)")
		let rows = svg.selectAll("g.row")
			.data(data)
			.enter().append("g")
			.attr("class","row")
	    .attr("transform",(d,i)=>
				"translate("+
	      	(sideLen + r3o2s*Math.abs(i - hexPerSide + 1))+
	      	","+
	      	(i*1.5*sideLen)+")");

    let tiles = rows.selectAll("g.tile")
    	.data(d => d)
    	.enter().append("g")
    	.attr("class", d => "tile "+d.tile+
    		" "+(cubeEqual(new Cube((hexPerSide - 1),(1 - hexPerSide),0), d.cube) ? "starter" : ""))
    	.attr("transform", (d,i)=>"translate("+i*2*r3o2s+",0)");
console.log(Object.keys(odds), spiral)
    tiles.append("polygon")
    	.attr("points", hexPath(sideLen, r3o2s))
    let desertSeen = 0
  	tiles.append("text")
  		.attr("y", this.state.sideLen)
  		.attr("class", "letter")
  		.text(d => {
  			if(d.tile === 'desert'){
  				desertSeen = 1
  				return 'desert'
  			} else {
  				return Object.keys(odds)[ spiral.indexOf(flatCube(d.cube)) - desertSeen ] 
  			}
  		})

///CUBE COORDS
  	// tiles.append("text")
  	// 	.attr("x", 20)
  	// 	.attr("y", 30)
  	// 	.text(d => d.cube.x)
  	// tiles.append("text")
  	// 	.attr("x", -27)
  	// 	.attr("y", 30)
  	// 	.text(d => d.cube.y)
  	// tiles.append("text")
  	// 	.attr("x", 0)
  	// 	.attr("y", 70)
  	// 	.text(d => d.cube.z)
///AXIAL COORDS
		// tiles.append("text")
		// 	.attr("x", -8)
		// 	.attr("y", 44)
		// 	.text(d => (d.cell - Math.min(hexPerSide - 1, d.row))+","+(d.row + 1 - hexPerSide))

	}

	componentDidUpdate(){
		const corner = cubeScale(
			cubeNeighbor(new Cube(0,0,0), this.props.sliderValue),
			this.state.hexPerSide - 1)
		d3.selectAll("g.tile")
			.classed("starter", d => cubeEqual(d.cube, corner))
	}

  render() {
    return (
      <div className="Hex">
      	<svg></svg>
      </div>
    );
  }
}

export default Hex;
