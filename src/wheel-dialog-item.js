import React from 'react'

class WheelDialogItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleScroll = this.handleScroll.bind(this)
        this.updatePosition = this.updatePosition.bind(this)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        // if (nextProps.index == this.index ) return 
        this.scroller.scrollTop = nextProps.index * 40
        // console.log(this.scroller.scrollTop)
    }
    componentDidMount() {
        const touchStartHandler = () => {
            this.isTouchStart = true
        }
        const touchEndHandler = () => {
            this.isTouchStart = false
            
            this.timer = setTimeout(this.updatePosition, 100) 
        }
        this.scroller.addEventListener('touchstart', touchStartHandler)
        this.scroller.addEventListener('touchend', touchEndHandler)
        // 鼠标点击拖拽视为touch事件
        this.scroller.addEventListener('mousedown', touchStartHandler)
        this.scroller.addEventListener('mouseup', touchEndHandler)
    }

    handleScroll() {
        console.log('scroll')
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(this.updatePosition, 100)
    }

    updatePosition() {
        if (this.isTouchStart) {
            return
        }
        let top = this.scroller.scrollTop
        let dis = top % 40
        var target
        if (dis >= 20) {
            target = top + (40 - dis)
        } else {
            target = top - dis
        }
        this.index = target / 40
        this.props.onSelectPlace(this.props.type, this.index)
    }
    render() {
        // console.log(this.props.data)
        return (
            <div 
                className="dialog-item" 
                style={{width: 150, height: 280, float: 'left', overflowY: 'scroll', marginTop: 10}}
                ref={(scroller) => {(this.scroller = scroller)}}
                onScroll={this.handleScroll}>
                <ul 
                    style={{listStyle: 'none', width: '100%', height: '100%', padding: 0, paddingTop: 70, textAlign: 'center', margin: 0}}>
                    { this.props.data.map((item, index) => {
                        return(
                            <li key={index} style={{height: 40, lineHeight: '40px'}}>{item}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default WheelDialogItem