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

class Settings extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <Dialog
                // fullWidth={fullWidth}
                // maxWidth={maxWidth}
                open={true}
                // onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    You can set my maximum width and whether to adapt or not.
                </DialogContentText>
                <Slider
                    defaultValue={0}
                    // valueLabelDisplay="on"
                />
                </DialogContent>
                <DialogActions>
                <Button 
                // onClick={handleClose}
                 color="primary">
                    Close
                </Button>
                </DialogActions>
             </Dialog>
        )
    }
}

export default Settings
