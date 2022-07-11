import './Navigation.css'
import React from 'react';
import logo from "./logo.svg"
import Button from '@mui/material/Button';
import {SvgIcon, TextField} from "@mui/material";
import Icon from '@mui/material/Icon';
import ReactDOM from 'react-dom';

class Navigation extends React.Component{
    logo ="./Logo1.png";

    render() {
        return(
            <div id="navigation">

                <Icon>MapMarker</Icon>;


                <Button  id="Nbutton1">find your city!</Button>
                <TextField id="filled-basic" label="CityName" variant="filled" id="Ntext"/>

            </div>
        )
    }

}

export  default  Navigation;
