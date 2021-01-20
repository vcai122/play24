import React, { Component } from 'react'
import Numbers from './Numbers'
import Settings from './Settings'
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

    frequencyList = [0,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50]
    frequencyPrefixSum = [0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200]

    constructor(props) {
        super(props)
    
        this.state = {
             signPressed: 0,
             numPressed: 0,
             streak: 0,
             currState: 0,
             showAnswer: false,
             showSettings: false,
             easy: true,
             medium: true,
             hard: true
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

    toggleEasy = ()=>{
        this.setState((prevState)=>({
            easy: (prevState.hard || prevState.medium)? !prevState.easy : true
        }))
    }

    toggleMedium = ()=>{
        this.setState((prevState)=>({
            medium: (prevState.easy || prevState.large)? !prevState.medium : true
        }))
    }

    toggleHard = ()=>{
        this.setState((prevState)=>({
            hard: (prevState.easy || prevState.medium)? !prevState.hard : true
        }))
    }

    satisfiesDifficulty = ()=>{
        const{easy, medium, hard} = this.state
        if(easy){
            if (this.answers.length > 18) return true
        }
        if (medium){
            if (this.answers.length<=18 && this.answers.length>4) return true
        }
        if (hard){
            if (this.answers.length<=4 && this.answers.length>0) return true
        }
        return false
    }

    rng = ()=>{
        // return Math.floor(Math.random()*24)+1
        return this.binarySearch(Math.random())
    }

    generateNumbers = ()=>{
        this.answers = []
        var n1,n2,n3,n4
        
        while (!this.satisfiesDifficulty()){
            this.answers = []
            n1 = this.rng() 
            n2 = this.rng() 
            n3 = this.rng() 
            n4 = this.rng() 
            var nums = [n1,n2,n3,n4]
            var strings = [n1,n2,n3,n4]
            this.solve24(nums,strings)
            // console.log('length = ' + this.answers.length)
        }

        // console.log('Found with ' + this.answers.length + ' answers')

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
    
    closeSettings = ()=>{
        this.setState({showSettings: false})
        this.frequencyPrefixSum[0] = this.frequencyList[0]
        for (var i = 1; i<this.frequencyList.length; i++)
            this.frequencyPrefixSum[i] = this.frequencyPrefixSum[i-1] + this.frequencyList[i]
        this.restart()
    }

    openSettings = ()=>{
        this.setState({showSettings: true})
    }

    render() {
        const {numPressed,currState,signPressed,streak,showAnswer,showSettings,easy,medium,hard} = this.state
        return (
            <div>
                <Settings
                    showSettings = {showSettings}
                    frequencyList = {this.frequencyList}
                    closeSettings = {this.closeSettings}
                    toggleEasy = {this.toggleEasy}
                    toggleMedium = {this.toggleMedium}
                    toggleHard = {this.toggleHard}
                    easy = {easy}
                    medium = {medium}
                    hard = {hard}
                />
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
                    openSettings = {this.openSettings}
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
                            strings2.push('(' + strings[i] + '×' + strings[j] + ')')
                        }
                        if (k==2){
                            nums2.push(nums[i]-nums[j])
                            strings2.push('(' + strings[i] + '−' + strings[j] + ')')
                        }
                        if (k==3){
                            if (nums[j]!=0 && nums[i]%nums[j]==0){
                                nums2.push(nums[i]/nums[j])
                                strings2.push('(' + strings[i] + '÷' + strings[j] + ')')
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

    binarySearch = (num)=>{
        var low = 0
        var high = this.frequencyList.length-1
        const sum = this.frequencyPrefixSum[high]
        while (low!=high){
            var mid = Math.floor((low+high)/2)
            var midVal = this.frequencyPrefixSum[mid]/sum
            if (num<midVal) high = mid
            else low = mid+1
        }
        return low
    }
}

export default Game
