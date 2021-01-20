import React, { Component } from 'react'

const unpressedButton = {
    padding: 0,
    borderRadius: '4vmin',
    // backgroundColor: '#b5f5ff',
    backgroundColor: '#004cb8',
    width: '20vmin',
    height: '20vmin',
    fontSize: '10vmin',
    fontFamily: 'AvenirNext-Heavy',
    color: '#ffffff',
    // borderColor: '#1100ff',
    borderColor: 'black',
    overflow: 'hidden',    
}

const pressedButton = {
    padding: 0,
    borderRadius: '4vmin',
    // backgroundColor: '#b5f5ff',
    backgroundColor: '#006aff',
    width: '20vmin',
    height: '20vmin',
    fontSize: '10vmin',
    fontFamily: 'AvenirNext-Heavy',
    color: '#ffffff',
    // borderColor: '#1100ff',
    borderColor: 'black',
    overflow: 'hidden',    
}

const emptyButton = {
    padding: 0,
    borderRadius: '4vmin',
    // backgroundColor: '#b5f5ff',
    backgroundColor: 'transparent',
    width: '20vmin',
    height: '20vmin',
    fontSize: '10vmin',
    fontFamily: 'AvenirNext-Heavy',
    color: 'transparent',
    // borderColor: '#1100ff',
    borderColor: 'transparent',
    overflow: 'hidden',    
}


export class NumberButton extends Component {

    handleClick = ()=>{
        const {pressed,setNumPressed,signPressed,resetNumAndSign,gotoNextState} = this.props
        if (signPressed==0 || pressed){
            setNumPressed()
        }
        else{
            gotoNextState()
            resetNumAndSign()
            setNumPressed()
        }
    }
    render() {
        const {pressed, number} = this.props
        const style = pressed? pressedButton: unpressedButton
        if (number == -9)
            return (
                <button style = {emptyButton}/>
            )
        return (
            <button onClick={this.handleClick} style = {style}> {number} </button>
        )
    }
}

export default NumberButton
