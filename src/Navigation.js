import './Navigation.css'
import React from 'react';
import logo from "./logo.svg"
import Button from '@mui/material/Button';
import {SvgIcon, TextField} from "@mui/material";
import Icon from '@mui/material/Icon';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
class Navigation extends React.Component{
    logo ="./Logo1.png";



    render() {
        return(
            <div id="navigation">
                <div id="leftBar">
                    <Button  id="Nbutton1">find your city!</Button>
                    <TextField id="outlined-basic" label="CityName" variant="outlined"  size="small"/>
                </div>
                <div id="rightBar">
                    <IconButton>
                        <PersonIcon/>
                    </IconButton>
                    <IconButton >
                        <DeleteTwoToneIcon/>
                    </IconButton>
                    <FormControlLabel control={<Switch checked={this.props.isFull} onChange={this.props.checkFull} name="isFull"/>} label="Full Screen"   />
                </div>
            </div>
        )
    }

}

export  default  Navigation;
