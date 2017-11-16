import React, { Component } from 'react'
import * as d3 from 'd3';

class Transition extends Component{
	
	constructor(props){
		super(props)
		this.state = this.props.attr.reduce((t,v) => ({ ...t, [v]: { start: 0 } }), {})
		this.initiateTransition = this.initiateTransition.bind(this)
	}

	componentDidMount(){
		for(var k in this.state){
			const end = this.props.children.props[k]
			this.setState({
				[k]: {
					...this.state[k],
					start: end
				}
			})
			this.initiateTransition(this.state[k].start, end, k)
		}
	}

	initiateTransition(start,end,attr){
		const interpolator = d3.interpolate(start, end)
		let timer = d3.timer(elapsed => {
			if(elapsed > this.props.time){
				timer.stop() 
				this.setState({
					[attr]: { 
						...this.state[attr],
						current: interpolator(1) 
					}
				})
			} else {			
				this.setState({
					[attr]: {
						...this.state[attr],
						current: interpolator(elapsed/this.props.time)
					}
				})
			}
		})			
	}

	componentWillUpdate(nextProps){
		for(var k in this.state){
			const end = nextProps.children.props[k]
			if(end !== this.state[k].start){
				this.setState({
					[k]: { 
						...this.state[k],
						start: end 
					}
				})
				this.initiateTransition(this.state[k].start, end, k)
			}
		}
	}

	render(){
		return {
			...this.props.children,
			props: {
				...this.props.children.props,
				...(this.props.attr.reduce((t,v) => ({ ...t, [v]: this.state[v].current }), {}))
			}
		}
	}

}

export default Transition