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
import Typography from '@material-ui/core/Typography';

export class Solutions extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             open: true
        }
    }
    
    generateAnswerList = ()=>{
        const {answers} = this.props
        var listString = ''
        if  (answers.length<10){
            for (var i = 0; i<answers.length; i++){
                listString += answers[i] + "\n"
            }
        }
        else{
            for (var i = 0; i<10; i++){
                listString += answers[i] + "\n"
            }
        }
        return listString
    }

    render() {
        const {showAnswer,restart} = this.props
        return (
            <Dialog
                fullWidth={true}
                maxWidth='xs'
                open={showAnswer}
                onClose={restart}
                aria-labelledby="solutions"
            >
                <DialogTitle align = 'center' id="solutions" disableTypography = {true}><h1>Solutions</h1></DialogTitle>
                <DialogContent>
                <DialogContentText>
                    <Typography
                    align = 'center'
                    variant= 'h4'   
                    style={{whiteSpace: 'pre-line'}}
                    >
                        {this.generateAnswerList()}
                    </Typography>
                </DialogContentText>
                </DialogContent>
                <DialogActions style={{justifyContent: 'center'}}>
                <Button 
                onClick={restart}
                 color="secondary">
                    Restart
                </Button>
                </DialogActions>
             </Dialog>
        )
    }
}

export default Solutions
