import React, { Component } from 'react';
import axios from 'axios'
import WheelDialog from './wheel-dialog'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  render() {
    // console.log(this.state.list)
    return (
      <div className="App">
        <WheelDialog data={this.state.list}></WheelDialog>
      </div>
    );
  }
  componentDidMount() {
    axios.get('api/cities.json').then(res => {
      if(res.data) {
        let data = res.data
        console.log(data)
        this.setState({
          list: data
        })
      }
    })
  }
}

export default App;
