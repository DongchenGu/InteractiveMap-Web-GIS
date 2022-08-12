import "./Property.css"
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';


export  default class Property extends React.Component{

    handleCloseToolMenu=()=>{
        this.props.closeProperty();
    }

    render() {
        let index=null;

        const {CurrentState} = this.props;
        if(CurrentState==="point"){
            index=<div id ="largeProperty">
                    <div id="firstLine">
                        <div id="toolName">
                            {CurrentState}
                        </div>
                        <div id="closeIcon">
                            <IconButton onClick={this.handleCloseToolMenu}>
                                <ClearIcon  fontSize="small" style={{marginTop:"auto"}}/>
                            </IconButton>
                        </div>
                    </div>
                    <div id="secondLine">
                        <div id="toolAttributes">
                            Longitude/latitude:
                        </div>

                    </div>
                </div>
        }
        if(CurrentState==="circle"){
            index=<div id ="largeProperty">
                        <div id="firstLine">
                            <div id="toolName">
                                {CurrentState}
                            </div>
                            <div id="closeIcon">
                                <IconButton onClick={this.handleCloseToolMenu}>
                                    <ClearIcon  fontSize="small" style={{marginTop:"auto"}}/>
                                </IconButton>
                            </div>
                        </div>
                        <div id="secondLine">
                            <div id="toolAttributes">
                                Radius:
                            </div>
                            <div id="inputText">
                                <TextField id="standard-basic"  variant="standard"  size="small" />
                            </div>

                        </div>
                 </div>
        }

        return (
            <div>
                {index}
            </div>

        );
    }

}