import "./Property.css"
import React, {useState,useEffect} from "react";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import PubSub from "pubsub-js";



export  default function Property (props){
    const [LL, setLL]= useState("N/A");

    const handleCloseToolMenu=()=>{
        props.closeProperty();
    }
    const handleSubscribeProperty=(msg,data)=>{
        if(msg==='property'){
            setLL(data.LL);
        }
    }


    PubSub.subscribe('property',handleSubscribeProperty);
    useEffect(()=>{
        return () => {
            PubSub.unsubscribe('property');
        }
    },[])

    let index=null;
    let line1
    const {CurrentState} = props;


    if(CurrentState==="point"){
            index=<div id ="largeProperty">
                    <div id="firstLine">
                        <div id="toolName">
                            {CurrentState}
                        </div>
                        <div id="closeIcon">
                            <IconButton onClick={handleCloseToolMenu}>
                                <ClearIcon  fontSize="small" style={{marginTop:"auto"}}/>
                            </IconButton>
                        </div>
                    </div>
                    <div id="secondLine">
                        <div id="toolAttributes">
                            Longitude/latitude:
                            { (LL ==="N/A" )?  "You have not chose a POINT": LL.lng.toFixed(5)+","+LL.lat.toFixed(5)
                            }
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
                                <IconButton onClick={handleCloseToolMenu}>
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

