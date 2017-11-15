import React, { Component } from 'react';
import * as d3 from 'd3';
import * as HexDataGen from 'hex-data-gen';

import { odds, getAllTiles, flatCube } from './utils'
import { cubeCoordinates, cubeSpiral, Cube } from './utilsCube'
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
			.attr("height", 600)
			.attr("width", 1000)
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
  	return data.reduce((t,v) => 
  		({ 
				...t, 
				[v.tile]: [ 
					...(t[v.tile] ? t[v.tile] : []), 
					{ 
						...v.odds, 
						sum: (t[v.tile] ? t[v.tile].slice(-1)[0].sum + v.odds.probability : v.odds.probability)
					} 
				]
			}), 
		{})
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
				tile: allTiles.splice(0,1)[0],
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
