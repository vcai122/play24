import React, { Component } from 'react'

import NumberButton from './NumberButton'

const tableStyle = {
    // float: 'right',
    // marginRight: '27vw',
}

export class Numbers extends Component {

    getPressedNumber = (numPressed)=>{
        const {numbers} = this.props
        if (numPressed == 1){
            return numbers.n1
        }
        else if (numPressed == 2){
            return numbers.n2
        }
        else if (numPressed == 3){
            return numbers.n3
        }
        else if (numPressed == 4){
            return numbers.n4
        }
        return -10
    }

    updateNum = (newNum, newNumSpot)=>{
        const {numbers} = this.props
        if (newNumSpot == 1){
            numbers.n1 = newNum
        }
        else if (newNumSpot == 2){
            numbers.n2 = newNum
        }
        else if (newNumSpot == 3){
            numbers.n3 = newNum
        }
        else if (newNumSpot == 4){
            numbers.n4 = newNum
        }
    }

    gotoNextState = (press2)=>{
        const {numPressed,numbers,signPressed,updateState} = this.props
        let press2Num = eval('numbers.n' + press2)
        let press1Num = eval('numbers.n' + numPressed)
        let newNum = 0
        if (signPressed == 1){
            newNum = press1Num + press2Num
        } 
        else if (signPressed == 2){
            newNum = press1Num - press2Num
        } 
        else if (signPressed == 3){
            newNum = press1Num * press2Num
        } 
        else if (signPressed == 4){
            if (press1Num%press2Num != 0) return
            newNum = press1Num / press2Num
        }

        let n1 = numbers.n1
        let n2 = numbers.n2
        let n3 = numbers.n3
        let n4 = numbers.n4

        eval('n' + press2 + ' = ' + newNum)
        eval('n' + numPressed + ' = ' + -9)
        updateState(n1,n2,n3,n4)
        
    }

    render() {
        const {numPressed,numbers,setNumPressed,signPressed,resetNumAndSign} = this.props
        const pressedNum = this.getPressedNumber(numPressed)
        return (
            <table style = {tableStyle}><tr>
                        <th><NumberButton
                            pressed = {numPressed==1}
                            number = {numbers.n1}
                            setNumPressed = {()=>setNumPressed(1)}
                            signPressed = {signPressed}
                            pressedNum = {pressedNum}
                            resetNumAndSign = {resetNumAndSign}
                            gotoNextState = {()=>this.gotoNextState(1)}

                        /></th>
                        <th><NumberButton
                            pressed = {numPressed==2}
                            number = {numbers.n2}
                            setNumPressed = {()=>setNumPressed(2)}
                            signPressed = {signPressed}
                            pressedNum = {pressedNum}
                            resetNumAndSign = {resetNumAndSign}
                            gotoNextState = {()=>this.gotoNextState(2)}

                        /></th>
                    </tr>
                    <tr>
                        <th><NumberButton
                            pressed = {numPressed==3}
                            number = {numbers.n3}
                            setNumPressed = {()=>setNumPressed(3)}
                            signPressed = {signPressed}
                            pressedNum = {pressedNum}
                            resetNumAndSign = {resetNumAndSign}
                            gotoNextState = {()=>this.gotoNextState(3)}

                        /></th>
                         <th><NumberButton
                            pressed = {numPressed==4}
                            number = {numbers.n4}
                            setNumPressed = {()=>setNumPressed(4)}
                            signPressed = {signPressed}
                            pressedNum = {pressedNum}
                            resetNumAndSign = {resetNumAndSign}
                            gotoNextState = {()=>this.gotoNextState(4)}

                        /></th>
                    </tr>
            </table>
        )
    }
}

export default Numbers
