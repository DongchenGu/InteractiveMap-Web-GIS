import React, {useState, useRef, useEffect} from 'react';
import "./auth.css"
import Input from "./Input/Input"
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Qs from 'qs';



const Register_URL='http://localhost:8080/register';
const Login_URL = 'http://localhost:8080/login';
let isQualified = false;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,24}$/;

function CheckMail(emailAddress){

    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    var bChk=reg.test(emailAddress);
    return bChk; }


const Auth = () => {
    const navigate = useNavigate();
    const [ErrMsg, setErrMsg] = useState("null");
    const [success,setSuccess]= useState(false);
    //true:login status, false: sign up status
    const [islogging, setLogging] = useState(true);
    const [login, setLogin] = useState(false);
    const [authInfo, setAuthInfo] = useState({
        email:"",
        username:"",
        password:"",
        confirm_password:""
    })




    const handleSubmit = async (e)=>{
        if(islogging===false){
            const nameResult = USER_REGEX.test(authInfo.username);
            const passwordResult = PWD_REGEX.test(authInfo.password);
            const emailResult = CheckMail(authInfo.email);
            if(!emailResult){
             alert("Please input the valid emial Address!");
            }else if(authInfo.password!== authInfo.confirm_password){
                alert("The password does not match, please re-enter!");
                return;
            }else if(nameResult===false || passwordResult===false){
                alert("Your usename or password is not qualified!");
                return;
            }else{
                isQualified = true;
            }

            isQualified = true;
            if(isQualified=== true){
                try {
                    const response = await axios.post(Register_URL,
                        authInfo,
                        {headers:{'Content-Type':'application/json'}},
                        );
                    console.log(response.data);
                    console.log(response.accessToken);
                    setLogging(true);
                    //clear input fields

                }catch (err){
                    if (!err?.response){
                        setErrMsg("no Server Response");
                    }else if(err.response?.status===409){
                        setErrMsg("UserName Taken");
                    }else{
                        setErrMsg("Registration failed");
                    }
                }
            }

        }else{
            //从这里开始是登录
            const emailResult = CheckMail(authInfo.email);
            if(emailResult===false){
                alert("Please input the valid Email Address!");
                return;
            }
            try {
                 await axios.post(
                    Login_URL,
                    authInfo,
                     {headers:{'Content-Type':'application/json'}}

                    ).then(response => {
                        if(response.data==='success'){
                            setSuccess(true);
                        }else if(response.data ==='wrong-password'){
                            alert("Sorry Wrong Password!");
                        }else if (response.data ==='user-not-exist'){
                            alert("User not exist! Please Sign Up!");
                        }
                    //console.log(response);
                   // console.log(res.data);
                });
                //console.log(JSON.stringify(response?.data));
            }catch (err){
                if(!err?.response){
                    setErrMsg("no server response");
                }else if(err.response?.status ===400){
                    setErrMsg("missing username or password");
                }else if(err.response?.status ===401){
                    setErrMsg("Unauthorized");
                }else{
                    setErrMsg("login Failed");
                }
            }
            console.log(authInfo)
        }
    }

    const handleClick = ()=>{
        setLogging(!islogging);
        //setLogin(!login);
        setAuthInfo({
        email:"",
        username:"",
        password:"",
        confirm_password:""
    })

    }

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
    },[])

    const BackToHome=()=>{
        navigate("/home", { state: {  }});
    }
    useEffect(()=>{
        if(success ===true){
            // eslint-disable-next-line react-hooks/rules-of-hooks
            navigate("/home", { state: {  }});
        }
    })


   return (
       <div className={"ct"}>
           <div className={"authBorder anime"}>
               <h1 className="welcome">Welcome</h1>


                    <div style={{width: "95%"}} className={"slide-top"}>
                   <Input type={"text"} placeholder={"email"} authInfo={authInfo} setAuthInfo={setAuthInfo}/>
                   {islogging? <div/>:(<Input type={"text"} placeholder={"username"} authInfo={authInfo} setAuthInfo={setAuthInfo}/>)}
                   <Input type={"password"} placeholder={"password"} authInfo={authInfo} setAuthInfo={setAuthInfo}/>
                   {islogging? <div/>:(<Input type={"password"} placeholder={"confirm_password"} authInfo={authInfo} setAuthInfo={setAuthInfo}/>)}
                   <Typography align='center' >
                      <Button onClick={handleSubmit}
                        color='primary'
                        size='large'
                        type='submit'
                        variant='contained'
                       >
                          {islogging? "Log in":"Sign Up"}
                      </Button>
                    </Typography>

                </div>



               <Typography onClick={handleClick} sx={{textDecoration:"underline", cursor:"pointer", marginTop:"5px"}}>
                   {islogging?" Don't have an account? Sign Up":"Already have an account? Log in"}
               </Typography>
           </div>
       </div>
   );

}

export default Auth;