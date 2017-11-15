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
			allTiles: getAllTiles(),
			newTiles: false
		}
		this.updateLetters = this.updateLetters.bind(this)
		this.generateData = this.generateData.bind(this)
		this.updateTiles = this.updateTiles.bind(this)
	}

	componentDidMount(){
		d3.select("svg")
			.attr("height", 600)
			.attr("width", 1000)
			.append("g")
			.attr("class","container")
			.attr("transform", "translate(300,100)")
		let data = this.generateData()
		this.updateLetters(data)
		this.setState({ data })
	}

	componentDidUpdate(nextProps){
		if(this.props.sliderValue !== nextProps.sliderValue || this.state.newTiles){
			let data = this.generateData()
			this.updateLetters(data)
			this.setState({ data, newTiles: false })
		}
	}

  render() {
    return (
      <div className="Hex">
      	<svg></svg>
      </div>
    );
  }

  updateTiles(){
  	this.setState({
  		allTiles: getAllTiles(),
  		newTiles: true
  	})
  }

	updateLetters(data){
		const { hexPerSide, sideLen, sliderValue } = this.props
		const r3o2s = sideLen * Math.sqrt(3)/2
		let tiles = d3.select(".container").selectAll("g.tile")
	  	.data(data)
		tiles.exit().remove();
		let tilesEnter = tiles.enter().append("g")
		tilesEnter.append("polygon")
		tilesEnter.append("text")
	  tiles = tilesEnter.merge(tiles)
	  	.attr("class", d => "tile "+d.tile)
	  	.classed("starter", d => cubeEqual(cubeScale(cubeNeighbor(new Cube(0,0,0), sliderValue), hexPerSide - 1), d.cube) )
	  	.attr("transform", d =>
				"translate("+
	      	(sideLen + r3o2s*Math.abs(d.row - hexPerSide + 1) + (d.cell*2*r3o2s))+
	      	","+
	      	(d.row*1.5*sideLen)+")");
	  tiles.select("polygon")
	  	.attr("points", hexPath(sideLen, r3o2s))
		tiles.select("text")
			.attr("y", sideLen)
			.attr("class", "letter")
			.text(d => d.odds.letter)
	}

	generateData(){
		let allTiles = [ ...this.state.allTiles ]
		let rawData = HexDataGen(this.props.hexPerSide, false)
			.reduce((t,r) => [ ...t, ...r ])
		const spiral = cubeSpiral(new Cube(0, 0, 0), 3, (this.props.sliderValue + 1) % 6).map(flatCube).reverse()
		const desertLocation = spiral.indexOf(flatCube(cubeCoordinates(rawData[allTiles.indexOf('desert')], this.props.hexPerSide)))
		let oddsKeys = Object.keys(odds)
		let oddsSorted = [ ...oddsKeys.slice(0,desertLocation), ...oddsKeys.slice(-1), ...oddsKeys.slice(desertLocation, -1) ]
		return rawData.map(c => {
			let cube = cubeCoordinates(c, this.props.hexPerSide)
			let letter = oddsSorted[ spiral.indexOf(flatCube(cube)) ]
			return { 
				...c, 
				cube,
				tile: allTiles.splice(0,1),
				odds: {
					letter,
					roll: odds[letter][0],
					probability: odds[letter][1]
				}
			}
		})
	}

}


export default Hex;
