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
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';



const PrettoSlider = withStyles({
    root: {
      color: '#00b2ff',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

export class MySlider extends Component {
    constructor(props) { 
        super(props)   
        this.inputRef = React.createRef();
    }

    componentDidMount(){
        const {inputRefs} = this.props
        inputRefs.push(this.inputRef)
    }

    handleKeyPress = (e)=>{
        const {inputRefs,num} = this.props
        if (e.code==='Enter'){
            inputRefs[(num+1)%inputRefs.length].current.focus()
        }
    }
    handleSliderChange = (event, newValue) => {
        const {num,frequencyList} = this.props
        frequencyList[num] = newValue
        this.setState({})
    }
    handleInputChange = (event) => {
        const {num,frequencyList} = this.props
        frequencyList[num] = event.target.value === '' ? '' : Number(event.target.value)
        this.setState({})
    }

    handleBlur = () => {
        const {num,frequencyList} = this.props
        const value = frequencyList[num]
        if (value < 0 || typeof value != 'number' || value==='') {
            frequencyList[num] = 0
        } else if (value > 100) {
            frequencyList[num] = 100
        }
        this.setState({})
      }
    
    render() {
        const {num,frequencyList} = this.props
        const value = frequencyList[num]
        return (
            <>
                <Grid container spacing={2} alignItems="center">
                    <Grid><Box mt={-1.7} ml={2} mr={1} fontSize={20} fontWeight='bold' fontFamily= 'AvenirNext-Regular'>
                        {num}:
                    </Box></Grid>
                    <Grid item xs>
                    <PrettoSlider
                        value={value}
                        onChange={this.handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                    </Grid>
                    <Grid item>
                    <Box mt={-2.7} mr={-2} width={1}>
                    <Input
                        inputRef={this.inputRef}
                        value={value}
                        margin="dense"
                        onChange={this.handleInputChange}
                        onBlur={this.handleBlur}
                        onKeyPress={this.handleKeyPress}
                        inputProps={{
                        min: 0,
                        max: 100,
                        style: {fontSize: 20, fontWeight:'bold', fontFamily: 'AvenirNext-Regular'},
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                        }}
                    />
                    </Box>
                    </Grid>
                </Grid>
                    
            </>
        )
    }
}

export default MySlider
