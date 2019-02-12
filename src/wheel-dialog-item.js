import React from 'react'

class WheelDialogItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleScroll = this.handleScroll.bind(this)
        this.transform = this.transform.bind(this)
        this.updatePosition = this.updatePosition.bind(this)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps.index)
        this.scroller.scrollTop = nextProps.index * 40
        // console.log(this.scroller.scrollTop)
    }
    componentDidMount() {
        const touchStartHandler = () => {
            this.isTouchStart = true
            console.log('click')
        }
        const touchMoveHandler = () => {
            if (this.isTouchStart) {
                // console.log(this.scroller)
            }
        }
        const touchEndtHandler = () => {
            this.isTouchStart = false
            this.timer = setTimeout(this.reSet, 100) 
        }
        this.scroller.addEventListener('touchstart', touchStartHandler)
        this.scroller.addEventListener('touchend', touchEndtHandler)
        this.scroller.addEventListener('mousedown', touchStartHandler)
        this.scroller.addEventListener('mouseup', touchEndtHandler)

    }
    handleScroll() {
        console.log(this.scroller.scrollTop)
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(this.updatePosition, 100)
        
    }
    transform(target) {
        let now = this.scroller.scrollTop
        let step = (target - now) / 20
        setTimeout(function() {
            now = now + step
            if (now !== target) {
                setTimeout(this, 10)
            }
        }, 10)
    }
    updatePosition() {
        if (this.isTouchStart) return 
        let top = this.scroller.scrollTop
        let dis = top % 40
        var target
        if (dis > 20) {
            target = top + (40 - dis)
        } else {
            target = top - dis
        }
        this.index = target / 40
        console.log(target)
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