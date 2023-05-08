import React, {useEffect, useRef, useState} from 'react';
import "./input.css"
import {TextField} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { alpha, styled } from '@mui/material/styles';
import CustomizedTextField from './CustomizedTextField'


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,24}$/;
function checkMail(emailAddress){
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    let bChk=reg.test(emailAddress);
    return bChk; }
function checkUserName(userName){
    return  USER_REGEX.test(userName);
}
function checkPassword(password){
    return password!=="" && PWD_REGEX.test(password);
}
function checkConfirmPassword( authInfo){
    return authInfo.confirm_password!== "" && authInfo.password === authInfo.confirm_password;
}

const Input = ({type, placeholder, authInfo, setAuthInfo,isValid}) => {

 let PWDnotes ="Password must have upper and lower case letters and numbers, between 6 to 23";
    const [note, setNote] = useState(false);
    //这里保存的是  邮箱密码等的内容 是否符合格式要求， 默认不符合，一上来用户还没输入内容，肯定是空的
    const [errorSatus, setErrorSatus] = useState(false);



    useEffect(()=>{
        if(placeholder==="email"){
            setErrorSatus(checkMail(authInfo.email));
            //console.log("xxxx-"+checkMail(authInfo.email))
        }else if(placeholder==="username"){
            setErrorSatus(checkUserName(authInfo.username));
        }else if(placeholder==="password"){
            setErrorSatus(checkPassword(authInfo.password));
        }else if(placeholder==="confirm_password"){
            setErrorSatus(checkConfirmPassword(authInfo));
        }
    })


   return (
       <div key={placeholder.value}>
           <CustomizedTextField
               onChange={(e)=>{
                   setAuthInfo({...authInfo, [placeholder]:e.target.value} );
                   //console.log(authInfo);

               }}
               onFocus={(e)=>{
                   if (placeholder==="password"){
                       setNote(true);
                   }
               }}
               type={(placeholder==="password"||placeholder==="confirm_password")? "password": ""}
               hiddenLabel
               value={authInfo[placeholder]}
               label={placeholder}
               //这是MUI的textfield的样式
               variant="outlined"
               className={"input"}
               error={!errorSatus}
               margin="normal"
               //这里设置用户 输入文字的颜色
               inputProps={{ style: { color: "#ffffff", borderColor:"green"} }}
               //这里设置 placeholder 的label的颜色
               InputLabelProps={{style:{color:'#ffffff66'}}}
           />
           <div id="note">{note=== true? PWDnotes:""}</div>
       </div>

   );

}

export default Input;