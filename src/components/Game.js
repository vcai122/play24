import React, { Component } from 'react'
import Numbers from './Numbers'
import Sidebar from './Sidebar'
import Signbar from './Signbar'
import Solutions from './Solutions'

const tableStyle = {
    marginLeft: '-17.5vmin',
    marginRight: '1vmax'
    // marginRight: '10vh+10vmin'
}

export class Game extends Component {
    gameState = [
        {n1: -1,n2: -1,n3: -1,n4: -1},
        {n1: -1,n2: -1,n3: -1,n4: -1},
        {n1: -1,n2: -1,n3: -1,n4: -1},
        {n1: -1,n2: -1,n3: -1,n4: -1}
    ]

    answers = []

    constructor(props) {
        super(props)
    
        this.state = {
             signPressed: 0,
             numPressed: 0,
             streak: 0,
             currState: 0,
             showAnswer: false
        }
    }

    componentDidMount(){
        this.generateNumbers()
    }

    setNumPressed = (num)=>{
        this.setState({numPressed: num})
    }

    setSignPressed = (sign)=>{
        const {numPressed} = this.state
        if (numPressed != 0)
            this.setState({signPressed: sign})
    }

    resetNumAndSign = ()=>{
        this.setState({
            numPressed: 0,
            signPressed: 0
        })
    }

    updateState = (n1,n2,n3,n4)=>{
        this.gameState[this.state.currState+1] = {
            n1: n1,
            n2: n2,
            n3: n3,
            n4: n4
        }
        this.setState((prevState)=>({
            currState: prevState.currState + 1
        }))
        if ( (n1==24 && n2==-9 && n3==-9 && n4==-9) || (n1==-9 && n2==24 && n3==-9 && n4==-9) || (n1==-9 && n2==-9 && n3==24 && n4==-9) || (n1==-9 && n2==-9 && n3==-9 && n4==24) ){
            setTimeout(
                ()=>{
                    this.setState((prevState)=>({
                        streak: prevState.streak + 1
                    }))
                    this.resetNumAndSign()
                    this.generateNumbers()
                },
                250
            )
        }
    }

    gotoPreviousState = ()=>{
        this.setState((prevState)=>({
            currState: prevState.currState > 0? prevState.currState - 1: 0
        }))
    }

    rng = ()=>{
        return Math.floor(Math.random()*24)+1
    }

    generateNumbers = ()=>{
        this.answers = []
        var n1,n2,n3,n4
        
        while (this.answers.length == 0){
            n1 = this.rng() 
            n2 = this.rng() 
            n3 = this.rng() 
            n4 = this.rng() 
            var nums = [n1,n2,n3,n4]
            var strings = [n1,n2,n3,n4]
            this.solve24(nums,strings)
        }

        this.gameState[0] = {
            n1: n1,
            n2: n2,
            n3: n3,
            n4: n4
        }
        this.setState({currState: 0})
    }

    showAnswer = ()=>{
        this.setState({
            showAnswer: true
        })
    }

    restart = ()=>{
        this.setState({
            signPressed: 0,
            numPressed: 0,
            streak: 0,
            currState: 0,
            showAnswer: false
        })
        this.generateNumbers()
    }
    
    render() {
        const {numPressed,currState,signPressed,streak,showAnswer} = this.state
        return (
            <div>
                <Solutions
                    answers = {this.answers}
                    showAnswer = {showAnswer}
                    restart = {this.restart}
                />
                <h1>Play 24</h1>
                <center>
                <table style = {tableStyle}><tr><td>
                <Sidebar
                    gotoPreviousState = {this.gotoPreviousState}
                    streak = {streak}
                    showAnswer = {this.showAnswer}
                />
                </td><td>
                <Numbers
                    numPressed = {numPressed}
                    numbers = {this.gameState[currState]}
                    setNumPressed = {this.setNumPressed}
                    signPressed = {signPressed}
                    resetNumAndSign = {this.resetNumAndSign}
                    updateState = {this.updateState}
                />
                </td></tr></table>        
                </center>
                <Signbar
                    signPressed = {signPressed}
                    setSignPressed = {this.setSignPressed}
                />
            </div>
        )
    }

    solve24 = (nums,strings)=>{
        if (nums.length == 0) return
        if (nums.length == 1){
            if (nums[0] == 24){
                this.answers.push(strings[0])
            }
            return
        }
        for (var i = 0; i<nums.length; i++){
            for (var j = 0; j<nums.length; j++){
                if (i!=j){
                    var nums2 = []
                    var strings2 = []
                    for (var k = 0; k<nums.length; k++){
                        if (k!=i && k!=j){
                            nums2.push(nums[k])
                            strings2.push(strings[k])
                        }
                    }
                    for (var k = 0; k<4; k++){
                        if (k<2 && j>i) continue
                        if (k==0){
                            nums2.push(nums[i]+nums[j])
                            strings2.push('(' + strings[i] + '+' + strings[j] + ')')
                        }
                        if (k==1){
                            nums2.push(nums[i]*nums[j])
                            strings2.push('(' + strings[i] + '*' + strings[j] + ')')
                        }
                        if (k==2){
                            nums2.push(nums[i]-nums[j])
                            strings2.push('(' + strings[i] + '-' + strings[j] + ')')
                        }
                        if (k==3){
                            if (nums[j]!=0 && nums[i]%nums[j]==0){
                                nums2.push(nums[i]/nums[j])
                                strings2.push('(' + strings[i] + '+' + strings[j] + ')')
                            } else {continue}
                        }
                        this.solve24(nums2,strings2)
                        nums2.pop()
                        strings2.pop()
                    }
                }
            }
        }
    }
}

export default Game
