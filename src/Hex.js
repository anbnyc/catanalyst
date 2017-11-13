import React, { Component } from 'react';
import * as d3 from 'd3';
import * as HexDataGen from 'hex-data-gen';

class Hex extends Component {
  
	constructor(props){
		super(props)
		this.state = {
			hexPerSide: 3,
			sideLen: 10,
		}
	}

	componentDidUpdate(){

		const { hexPerSide, sideLen } = this.state
		const r3o2S = sideLen * Math.sqrt(3)/2

		let data = HexDataGen.default(hexPerSide)

		let svg = d3.select("svg").append("g")
		let rows = svg.selectAll("g.row")
			.data(data)
			.enter().append("g")
			.attr("class","row")
	    .attr("transform",(d,i)=>{
	      const special = Math.max(0,i - hexPerSide + 1);
	      const rowShiftY = (-r3o2S*special) + (i*2*r3o2S);
	      const rowShiftX = (1.5*sideLen*special) + sideLen;
	      return "translate("+rowShiftX+","+rowShiftY+")";
	    });

    let tiles = rows.selectAll("g.row")

	}

  render() {
    return (
      <div className="Hex">
      	<svg></svg>
      </div>
    );
  }
}

function hexPath(s,r3o2S){
  const halfS = .5*s;
  return "M0,0"+
    " L"+(-1*halfS)+","+(-1*r3o2S)+
    " L"+(-1*s+halfS)+","+r3o2S+
    " L"+(-2*s)+",0"+
    " L"+(-1*s+halfS)+","+r3o2S+
    " L"+(-1*halfS)+","+r3o2S;
}

const odds = l => ({
	A: [5,4],
	B: [2,1],
	C: [6,5],
	D: [3,2],
	E: [8,5],
	F: [10,3],
	G: [9,4],
	H: [12,1],
	I: [11,2],
	J: [4,3],
	K: [8,5],
	L: [10,3],
	M: [9,4],
	N: [4,3],
	O: [5,4],
	P: [6,5],
	Q: [3,2],
	R: [11,2]
})[l];



const colors = {
	sheep: ["#76B712",4],
	wood: ["#0E5A20",4],
	wheat: ["#F9BC00",4],
	ore: ["#524D30",3],
	brick: ["#B66E28",3],
	desert: ["#E9D168",1],
};


export default Hex;
