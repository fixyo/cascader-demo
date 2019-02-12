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
        //获取省列表
        data.forEach((item) => {
            provs.push(item.name)
        })
        // 获取默认省的城市列表
        if (data[0].city) {
            data[0].city.forEach((item) => {
                cities.push(item.name)
            })
        }
        //默认城市的区域列表
        dists = data[0].city[0].area

        this.setState({
            provs: provs,
            cities: cities,
            dists: dists
        })
        this.props.selectedAdd(0, 0, 0)
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
        this.props.selectedAdd(this.state.pIndex, this.state.cIndex, this.state.dIndex) 
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