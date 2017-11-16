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
    const sideLen = window.innerWidth - 15 < 768 ? window.innerWidth / 20 : 40
    return (
      <div className="App">
        <div>
          <Slider 
            onSliderChange={this.onSliderChange} 
            sliderValue={+this.state.sliderValue} />
          <button onClick={() => { this.child.updateTiles() }}>Reset Board</button>
        </div>
        <Viz 
          ref={hex => { this.child = hex }}
          sliderValue={+this.state.sliderValue}
          hexPerSide={3}
          sideLen={sideLen}
          width={window.innerWidth - 15} />
      </div>
    );
  }
}

export default App;
