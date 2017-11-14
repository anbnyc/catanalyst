import React, { Component } from 'react';
import './App.css';

class Slider extends Component {

  render() {
    return (
      <div className="Slider">
      	<label htmlFor="slider-range">{}</label>
      	<input
      		onChange={event => this.props.onSliderChange(event.target.value)}
      		id="slider-range" 
      		type="range" 
      		step="1"
      		value={this.props.sliderValue}
      		min="0" 
      		max="5" />
      </div>
    );
  }
}

export default Slider;
