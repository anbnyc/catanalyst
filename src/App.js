import React, { Component } from 'react';
import './App.css';

import Hex from './Hex'
import Slider from './Slider'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      sliderValue: 0
    }
    this.onSliderChange = this.onSliderChange.bind(this)
  }

  onSliderChange(sliderValue){
    this.setState({ sliderValue })
  }

  render() {
    return (
      <div className="App">
        <Slider 
          onSliderChange={this.onSliderChange} 
          sliderValue={this.state.sliderValue} />
        <Hex 
          sliderValue={this.state.sliderValue}/>
      </div>
    );
  }
}

export default App;
