import React from 'react'
import WheelDialogItem from './wheel-dialog-item'

class WheelDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            provs: [],
            cities: [],
            dists: [],
            pIndex: 0,
            cIndex: 0,
            dIndex: 0
        }
        this.initData = this.initData.bind(this)
        this.onSelectPlace = this.onSelectPlace.bind(this)
    }
    initData(data) {
        let provs = []
        let cities = []
        let dists = []
        data.forEach((item) => {
            provs.push(item.name)
        })
        
        if (data[0].city) {
            data[0].city.forEach((item) => {
                cities.push(item.name)
            })
        }

        dists = data[0].city[0].area

        this.setState({
            provs: provs,
            cities: cities,
            dists: dists
        })
    }
    onSelectPlace(type, index) {
        switch(type) {
            case 'provs':
                this.setState({
                    cities: this.props.data[index].city.map(item => item.name),
                    dists: this.props.data[index].city[0].area,
                    pIndex: index,
                    cIndex: 0,
                    dIndex: 0
                })
                break;
            case 'cities':
                this.setState({
                    dists: this.props.data[this.state.pIndex].city[index].area,
                    cIndex: index,
                    dIndex: 0
                })
                break;
            case 'dists':
                this.setState({
                    dIndex: index
                })
                break;
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.initData(nextProps.data)
    }

    render() {
        return (
            <div className="wheel-dialog" style={{ position: 'relative', width: 450, height: 300}}>
                <div style={{position: 'absolute', top: 80, height: 40, width: 450, border: '1px dashed #00bcd4'}}></div>
                <WheelDialogItem 
                    type="provs" 
                    data={this.state.provs} 
                    onSelectPlace={this.onSelectPlace}
                    index={this.state.pIndex}>
                </WheelDialogItem>
                <WheelDialogItem 
                    type="cities" 
                    data={this.state.cities} 
                    onSelectPlace={this.onSelectPlace}
                    index={this.state.cIndex}>
                </WheelDialogItem>
                <WheelDialogItem 
                    type="dists" 
                    data={this.state.dists} 
                    onSelectPlace={this.onSelectPlace}
                    index={this.state.dIndex}>
                </WheelDialogItem>
            </div>
        )
    }
}

export default WheelDialog