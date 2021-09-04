import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MySlider from './MySlider';
import { spacing } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';

const toggled = {backgroundColor: '#7affd3',marginLeft: 5, marginRight: 5}
const untoggled = {marginLeft: 5, marginRight: 5}

class Settings extends Component {
    constructor(props) {
        super(props)
        this.bottomRef = React.createRef();
    }
    
    inputRefs = []

    addNumber = ()=>{
        const {frequencyList} = this.props
        frequencyList.push(50)
        this.setState({})
        this.bottomRef.current.scrollIntoView()
    }
    
    render() {
        const{showSettings,frequencyList,closeSettings,easy,medium,hard,toggleEasy,toggleMedium,toggleHard} = this.props
        return (
            <Dialog
                fullWidth={true}
                maxWidth='xs'
                open={showSettings}
                onClose={closeSettings}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle align = 'center' id="settings" disableTypography = {true}><h1>Settings</h1>
                </DialogTitle>
                
                <DialogContent>
                    <Box mt={-1} mb={2}>
                <Grid container justify='center'>
                <Button onClick = {toggleEasy} style = {easy? toggled:untoggled}> <Typography color = 'textSecondary' style={{whiteSpace: 'pre-line'}}><Box fontFamily = "Avenir Next" lineHeight={1} fontWeight="fontWeightBold" mx={1} mt={-0.5}>{'Easy \n ✰'}</Box></Typography> </Button>
                <Button onClick = {toggleMedium} style = {medium? toggled:untoggled}> <Typography color = 'textSecondary' style={{whiteSpace: 'pre-line'}}><Box fontFamily = "Avenir Next" lineHeight={1} fontWeight="fontWeightBold" mx={1} mt={-0.5}>{'Medium \n ✰✰'}</Box></Typography> </Button>
                <Button onClick = {toggleHard} style = {hard? toggled:untoggled}> <Typography color = 'textSecondary' style={{whiteSpace: 'pre-line'}}><Box fontFamily = "Avenir Next" lineHeight={1} fontWeight="fontWeightBold" mx={1} mt={-0.5}>{'Hard \n ✰✰✰'}</Box></Typography> </Button>
                </Grid></Box>
                
                <DialogContentText>
                    
                <Box align = 'center' color = 'black'><h3>Frequency</h3></Box>
                <Box align = 'center'><Button>click me</Button></Box>
                {frequencyList.map( (frequency,index)=>
                    <MySlider
                        frequencyList = {frequencyList}
                        num = {index}
                        inputRefs = {this.inputRefs}
                        key = {index}
                    />
                ) }
                <Box align = 'center'><Button onClick={this.addNumber} color = "primary"><Box fontFamily = "Avenir Next" lineHeight={1} fontSize = {15} fontWeight="fontWeightBold" mt={2} mx={2}>Add Number</Box></Button></Box>
                <div style={{color: 'white'}} ref = {this.bottomRef}>.</div>
                </DialogContentText>
                </DialogContent>
                <DialogActions style={{justifyContent: 'center'}}>
                <Button 
                onClick={closeSettings}
                 color="secondary">
                    Close
                </Button>
                </DialogActions>
             </Dialog>
        )
    }
}

export default Settings
