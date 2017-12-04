import React, { Component } from 'react';
import './App.css';

import Viz from './Viz'
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
        <div>
          <Slider 
            onSliderChange={this.onSliderChange} 
            sliderValue={+this.state.sliderValue} />
          <button 
            className="reset-button"
            onClick={() => { this.child.updateTiles() }}>Reset Board</button>
        </div>
        <Viz 
          ref={hex => { this.child = hex }}
          sliderValue={+this.state.sliderValue} />
      </div>
    );
  }
}

export default App;
