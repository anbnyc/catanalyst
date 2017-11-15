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
        <div>
          <Slider 
            onSliderChange={this.onSliderChange} 
            sliderValue={+this.state.sliderValue} />
          <button onClick={() => { this.child.updateTiles() }}>Reset Board</button>
        </div>
        <Hex 
          ref={hex => { this.child = hex }}
          sliderValue={+this.state.sliderValue}
          hexPerSide={3}
          sideLen={40} />
      </div>
    );
  }
}

export default App;
