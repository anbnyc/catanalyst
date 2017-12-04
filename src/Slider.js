import React from 'react';
import './App.css';

const Slider = props => (
  <div className="Slider">
  	<label htmlFor="slider-range">{}</label>
  	<input
  		onChange={event => props.onSliderChange(event.target.value)}
  		id="slider-range" 
  		type="range" 
  		step="1"
  		value={props.sliderValue}
  		min="0" 
  		max="5" />
  </div>
);

export default Slider;
