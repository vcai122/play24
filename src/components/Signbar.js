import React, { Component } from 'react'

const pressedButton = {
    padding: 0,
    borderRadius: '5vmin',
    // backgroundColor: '#b5f5ff',
    backgroundColor: '#006aff',
    width: '10vmin',
    height: '10vmin',
    fontSize: '5vmin',
    fontFamily: 'AvenirNext-Heavy',
    color: '#ffffff',
    // borderColor: '#1100ff',
    borderColor: 'black',
    overflow: 'hidden',
    marginRight: '0.2vmin',
    marginLeft: '0.2vmin',
    marginTop: '0.2vmin'
}

const unpressedButton = {
    padding: 0,
    borderRadius: '5vmin',
    // backgroundColor: '#b5f5ff',
    backgroundColor: '#004cb8',
    width: '10vmin',
    height: '10vmin',
    fontSize: '5vmin',
    fontFamily: 'AvenirNext-Heavy',
    color: '#ffffff',
    // borderColor: '#1100ff',
    borderColor: 'black',
    overflow: 'hidden',
    marginRight: '0.2vmin',
    marginLeft: '0.2vmin',
    marginTop: '0.2vmin'
}

export class Signbar extends Component {
    render() {
        const {setSignPressed,signPressed} = this.props
        return (
            <div>
                <button onClick = {()=>setSignPressed(1)} style = {signPressed == 1? pressedButton : unpressedButton} > + </button>
                <button onClick = {()=>setSignPressed(2)} style = {signPressed == 2? pressedButton : unpressedButton} > − </button>
                <button onClick = {()=>setSignPressed(3)} style = {signPressed == 3? pressedButton : unpressedButton} > × </button>
                <button onClick = {()=>setSignPressed(4)} style = {signPressed == 4? pressedButton : unpressedButton} > ÷ </button>
            </div>
        )
    }
}

export default Signbar
