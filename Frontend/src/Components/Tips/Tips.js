import React from 'react'
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import './Tips.css'

export default function Tips(props){
    let index =null;
    const {CurrentState,closeTips} = props;



    const textTips=<div id="largeTextTips" >
                        <div id="firstLine">
                            <div id="toolName">
                                TIPS:) how to input Text onto the Map
                            </div>
                            <div id="closeIcon">
                                <IconButton onClick={closeTips}>
                                    <ClearIcon  fontSize="small" style={{marginTop:"auto"}}/>
                                </IconButton>
                            </div>
                        </div>
                        <div className="attributesLine">
                            1. Fist, input your text into the property Menu.

                        </div>
                        <div className="attributesLine">
                            2. Second, choose the color and other attributes in the Menu.
                        </div>
                        <div className="attributesLine">
                            3. third, click the location on the Map to set your Text!
                        </div>
                    </div>


     if(CurrentState==="inputtext"){
         index=textTips;
     }
    return(
        <div className={CurrentState==="inputtext" ? "cover" : ""}>
            {textTips}
        </div>
    );
}


