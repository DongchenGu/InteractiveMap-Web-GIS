import React, {useEffect, useRef, useState} from 'react';
import "./input.css"
import {TextField} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { alpha, styled } from '@mui/material/styles';



const Input = ({type, placeholder, authInfo, setAuthInfo}) => {

 let PWDnotes ="Password must have upper and lower case letters and numbers, between 6 to 23";
    const [note, setNote] = useState(false);


   return (
       <div>
           <TextField
               onChange={(e)=>{
                   setAuthInfo({...authInfo, [placeholder]:e.target.value} );
                   console.log(authInfo);

               }}
               onFocus={(e)=>{
                   if (placeholder==="password"){
                       setNote(true);
                   }
               }}
               type={(placeholder==="password"||placeholder==="confirm_password")? "password": ""}
               hiddenLabel
               value={authInfo[placeholder]}
               id="outlined-size-small"
               label={placeholder}
               variant="filled"
               className={"input"}

               margin="normal"
               inputProps={{ style: { color: "white" } }}

           />
           <div id="note">{note=== true? PWDnotes:""}</div>
       </div>

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