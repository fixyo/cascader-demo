import React, { Component } from 'react';
import axios from 'axios'
import WheelDialog from './wheel-dialog'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
    this.selectedAdd = this.selectedAdd.bind(this)
  }
  selectedAdd(pIndex, cIndex, dIndex) {
    let list = this.state.list
    let address = list[pIndex].name 
                   + ' ' 
                   + list[pIndex].city[cIndex].name 
                   + ' ' 
                   + list[pIndex].city[cIndex].area[dIndex]
    this.address = address
    console.log(this.address)
  }

  componentDidMount() {
    axios.get('api/cities.json').then(res => {
      if(res.data) {
        let data = res.data
        this.setState({
          list: data
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <WheelDialog selectedAdd={this.selectedAdd} data={this.state.list}></WheelDialog>
      </div>
    );
  }
}

export default App;
