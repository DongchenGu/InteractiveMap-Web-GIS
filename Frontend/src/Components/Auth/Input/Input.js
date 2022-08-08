import React, {useRef} from 'react';
import "./input.css"
import {TextField} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { alpha, styled } from '@mui/material/styles';



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
               color="yellow"
               margin="normal"

           />
   );

}
//secondary
// sx={{'&.MuiInputBase-input':{color:"white !important"}}}

/*<TextField
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
                sx={{ color: "white" }}
            />
* */

/*
*  <OutlinedInput
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
                width="95%"
                sx={{ color: "white" }}
            />*/
export default Input;