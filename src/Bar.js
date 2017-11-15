import React, { Component } from 'react';
import * as d3 from 'd3';

import './Bar.css'

class Bar extends Component {

  render() {
    return (
      <g className="bar-container"></g>
    );
  }

  componentDidMount(){
  	d3.select(".bar-container").attr("transform", "translate(550,30)")
  }

	componentDidUpdate(){
		const { barData } = this.props

		let barKeys = [ ...Object.keys(barData)].sort((a,b) => d3.ascending(a,b))
		const margin = 10;
		const width = 350
		const xScale = d3.scaleLinear()
			.domain([0, 20])
			.range([0, 200])
		const yScale = d3.scaleBand()
			.domain(barKeys)
			.rangeRound([margin, width - margin], .2)

		let bars = d3.select(".bar-container")
			.selectAll("g.bar")
			.data(barKeys)
		bars = bars.enter().append("g")
			.merge(bars)
			.attr("class", d => "bar "+d)
			.attr("transform", d => "translate("+margin+","+yScale(d)+")")
		let bar = bars.selectAll("g.segment")
			.data(d => barData[d])
		bar.exit().remove()
		let barEnter = bar.enter().append("g")
		barEnter.append("rect")
		bar = barEnter.merge(bar)
			.attr("class","segment")
		bar.select("rect")
			.transition()
			.attr("x", d => xScale(d.sum - d.probability))
			.attr("height", 30)
			.attr("width", d => xScale(d.probability) )

	}

}

export default Bar;
