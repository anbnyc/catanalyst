import React, { Component } from 'react';
import * as d3 from 'd3';
import * as HexDataGen from 'hex-data-gen';

import { odds, getAllTiles } from './utils'
import { cubeScale, cubeEqual, cubeNeighbor, cubeCoordinates, cubeSpiral, Cube, flatCube } from './utilsCube'
import Hex from './Hex'
import Bar from './Bar'

class Viz extends Component {
  
	constructor(props){
		super(props)
		this.state = {
			allTiles: getAllTiles(),
			newTiles: false
		}
		this.generateData = this.generateData.bind(this)
		this.reshapeBarData = this.reshapeBarData.bind(this)
		this.updateTiles = this.updateTiles.bind(this)
	}

	componentDidMount(){
		d3.select("svg")
			.attr("height", 330)
			.attr("width", this.props.width)
		let data = this.generateData()
		this.setState({ data, barData: this.reshapeBarData(data) })
	}

	componentDidUpdate(nextProps){
		if(this.props.sliderValue !== nextProps.sliderValue || this.state.newTiles){
			let data = this.generateData()
			this.setState({ data, barData: this.reshapeBarData(data), newTiles: false })
		}
	}

  render() {
    return (
      <div className="Hex">
      	<svg>
      		<Hex
      			{ ...this.props }
      			data={this.state.data} />
    			<Bar
    				{ ...this.props }
    				barData={this.state.barData} />
      	</svg>
      </div>
    );
  }

  updateTiles(){
  	this.setState({
  		allTiles: getAllTiles(),
  		newTiles: true
  	})
  }

  reshapeBarData(data){
  	let barData = data.reduce((t,v) => 
  		({ 
				...t, 
				[v.tile]: [ 
					...(t[v.tile] ? t[v.tile] : []), 
					v.odds
				]
			}), 
		{})
		for(var k in barData){
			barData[k] = [ ...barData[k] ].sort((a,b) => b.probability - a.probability)
			for(var i = 0; i < barData[k].length; i++){
				barData[k][i].sum = (i === 0 ? 0 : barData[k][i - 1].sum) + barData[k][i].probability
			}
		}
		return barData
  }

	generateData(){
		const { sliderValue, hexPerSide } = this.props
		let allTiles = [ ...this.state.allTiles ]
		let rawData = HexDataGen(hexPerSide, false)
			.reduce((t,r) => [ ...t, ...r ])
		const spiral = cubeSpiral(new Cube(0, 0, 0), 3, (sliderValue + 1) % 6).map(flatCube).reverse()
		const desertLocation = spiral.indexOf(flatCube(cubeCoordinates(rawData[allTiles.indexOf('desert')], hexPerSide)))
		let oddsKeys = Object.keys(odds)
		let oddsSorted = [ ...oddsKeys.slice(0,desertLocation), ...oddsKeys.slice(-1), ...oddsKeys.slice(desertLocation, -1) ]
		let starter = cubeScale(cubeNeighbor(new Cube(0,0,0), sliderValue), hexPerSide - 1)
		return rawData.map(c => {
			let cube = cubeCoordinates(c, hexPerSide)
			let letter = oddsSorted[ spiral.indexOf(flatCube(cube)) ]
			return { 
				...c, 
				cube,
				tile: allTiles.splice(0,1)[0],
				starter: cubeEqual(starter, cube),
				odds: {
					letter,
					roll: odds[letter][0],
					probability: odds[letter][1]
				}
			}
		})
	}

}


export default Viz;
