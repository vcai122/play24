import React, { Component } from 'react'

const tableStyle = {
    // marginLeft: '20vw',
    // marginRight: '0vw',
    float: 'left',
    // width: 'auto'
}

const numStyle = {
    fontSize: '7.3vmin',
    fontFamily: '',
    color: 'black',
    fontWeight: 'bold',
    marginLeft: '6.25vmin'
}

const textStyle = {
    fontSize: '3vmin',
    fontFamily: '',
    color: 'black',
    marginLeft: '5vmin',
}

export class Sidebar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             hoveredIcon: 0
        }
    }

    getButtonStyle = (isHovered, fontSize, marginBottom, marginTop, marginLeft)=>{
        return {
            padding: 0,
            borderRadius: '5vmin',
            backgroundColor: 'transparent',
            width: '7vmin',
            height: '7vmin',
            fontSize: fontSize,
            fontFamily: 'AvenirNext-Heavy',
            color: 'black',
            // display: 'inline-flex' ,
            // alignItems: 'center',
            borderColor: 'transparent',
            lineHeight: 0,
            overflow: 'visible',
            opacity: isHovered? 0.7: 1,
            marginBottom: marginBottom,
            marginTop: marginTop,
            marginLeft: marginLeft
        }
    }
 
    render() {
        const {hoveredIcon} = this.state
        const {gotoPreviousState,streak,showAnswer,openSettings} = this.props
        return (
            <table style = {tableStyle}>
                <tr>
                    <th>
                        <button 
                            style = {this.getButtonStyle(hoveredIcon==1, '10vmin', '5vmin', '1vmin', '-3vmin')}
                            onMouseOver = {()=>{this.setState({hoveredIcon: 1})}}
                            onMouseLeave = {()=>{this.setState({hoveredIcon: 0})}}
                            onClick = {openSettings}
                        > ⚙ </button>
                    </th>
                    <th>
                        <button 
                            style = {this.getButtonStyle(hoveredIcon==2, '10vmin','5vmin','1vmin','-3vmin')}
                            onMouseOver = {()=>{this.setState({hoveredIcon: 2})}}
                            onMouseLeave = {()=>{this.setState({hoveredIcon: 0})}}
                            onClick = {showAnswer}
                        > ⚐ </button>
                    </th>
                </tr>
                <tr>
                    <text style = {textStyle}> Streak </text>
                </tr>
                <tr>
                    <text style = {numStyle}> {streak} </text>
                </tr>
                <tr>
                    <button 
                        style = {this.getButtonStyle(hoveredIcon==3, '7vmin',0,'4vmin','5vmin')}
                        onMouseOver = {()=>{this.setState({hoveredIcon: 3})}}
                        onMouseLeave = {()=>{this.setState({hoveredIcon: 0})}}
                        onClick = {gotoPreviousState}
                    > ⟲ </button>    
                </tr>
            </table>
        )
    }
}

export default Sidebar
