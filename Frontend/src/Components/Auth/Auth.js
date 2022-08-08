import React, {useState, useRef} from 'react';
import "./auth.css"
import Input from "./Input/Input"
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6





const Auth = () => {


    const [login, setLogin] = useState(true);
    const [authInfo, setAuthInfo] = useState({
        email:"",
        username:"",
        password:"",
        confirm_password:""
    })

    const handleSubmit = ()=>{
        console.log(authInfo)
    }

    const handleClick = ()=>{
        setLogin(!login);
        setAuthInfo({
        email:"",
        username:"",
        password:"",
        confirm_password:""
    })


    }

   return (
       <div className={"ct"}>
           <div className={"authBorder anime"}>
               <h1 className="welcome">Welcome</h1>


                    <div style={{width: "95%"}} className={"slide-top"}>
                   <Input type={"text"} placeholder={"email"} authInfo={authInfo} setAuthInfo={setAuthInfo}/>
                   {login?(<Input type={"text"} placeholder={"username"} authInfo={authInfo} setAuthInfo={setAuthInfo}/>
                    ):<div/>}
                   <Input type={"password"} placeholder={"password"} authInfo={authInfo} setAuthInfo={setAuthInfo}/>
                   {login?(<Input type={"password"} placeholder={"confirm_password"} authInfo={authInfo} setAuthInfo={setAuthInfo}/>
                    ):<div/>}
                   <Typography align='center' >
                      <Button onClick={handleSubmit}
                        color='primary'
                        size='large'
                        type='submit'
                        variant='contained'
                       >
                          {login? "Sign Up":"Log in"}
                      </Button>
                    </Typography>

                </div>



               <Typography onClick={handleClick} sx={{textDecoration:"underline", cursor:"pointer", marginTop:"5px"}}>
                   {login?" Already have an account? Log in":"Don't have an account? Sign Up"}
               </Typography>
           </div>
       </div>
   );

}

export default Auth;