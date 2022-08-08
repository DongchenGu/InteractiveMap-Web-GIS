import React, {useRef} from 'react';
import "./input.css"
import {TextField} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const Input = ({type, placeholder, authInfo, setAuthInfo}) => {



   return (
        <TextField
            onChange={(e)=>{
                setAuthInfo({...authInfo, [placeholder]:e.target.value} );
                console.log(authInfo);
            }}

            hiddenLabel
            value={authInfo[placeholder]}
            id="outlined-size-small"
            label={placeholder}
            variant="filled"
            className={"input"}
            color="secondary"
            margin="normal"
            sx={{'&.MuiInputBase-input':{color:"white !important"}}}
        />


   );

}

export default Input;