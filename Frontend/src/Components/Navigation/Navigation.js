import './Navigation.css'
import React, {useEffect, useState} from 'react';
import logo from "../../images/logo.svg"
import Button from '@mui/material/Button';
import {SvgIcon, TextField, Typography} from "@mui/material";
import Icon from '@mui/material/Icon';


import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import NMenu from "../NMenu/NMenu";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import AccountMenu from "../AccountMenu/AccountMenu";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Search from "./Search/Search";
import {Link, useNavigate} from "react-router-dom";
import {deleteAllText} from "../OriginMap/OriginMap"

import {user_email, user_name, user_password, user_photo, user_token} from "../Store/actionCreater";
import store from "../Store";
import {setAxiosToken} from "../Auth/Auth";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
//导入截图
import ScreenShot from "js-web-screen-shot";
import clearAllMarks from '../OriginMap/OriginMap';



const handleLogOut=(e)=>{
    //清除localStorage
    localStorage.clear();
    //清除redux中的用户信息
    store.dispatch(user_name(null));
    store.dispatch(user_email(null));
    store.dispatch(user_password(null));
    store.dispatch(user_token(null));
    store.dispatch(user_photo(null));

};

export default  function  Navigation(props){
    const logo ="./Logo1.png";
    const [email,setEmail]= useState(null);
    const navigate = useNavigate();
    const {IsFull,checkFull,openProviderMenu,openToolMenu,openProperty,getCoord} =props;


    const handleLogIn =(e)=>{
        navigate("/auth",{state: { }});
    };
    const handleScreenShot=(e)=>{
        new ScreenShot({enableWebRtc: true, completeCallback: callback,closeCallback: closeFn});
        // downloadImage(sessionStorage.getItem("screenShotImg"));
    }
    const closeFn=()=>{

    }
    const callback=(base64)=>{
        downloadImage(base64);
    }
    const downloadImage=(base64)=>{
            var byteCharacters = atob(
                base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
            );
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], {
                type: undefined,
            });
            var aLink = document.createElement("a");
            aLink.download = "ScreenShot.jpg"; //这里写保存时的图片名称
            aLink.href = URL.createObjectURL(blob);
            aLink.click();


    }




    useEffect(()=>{
        store.subscribe(() => {
            setEmail(store.getState().user_email);
            // console.log("导航条");
            // console.log(store.getState());
        })
    },[])

    // useEffect(()=>{
    //     email=store.getState().user_email;
    // })

    return (
            <div id="navigation">
                <div id="leftBar">
                    <Button  id="Nbutton1">FindCity -></Button>
                    <Search getCoord={getCoord}/>
                    {/*<TextField id="outlined-basic" label="CityName" variant="outlined"  size="small"/>*/}
                </div>


                <div id="rightBar">

                    <IconButton onClick={handleScreenShot}>
                        <AddAPhotoIcon />
                    </IconButton>
                    <IconButton >
                        <DeleteTwoToneIcon />
                    </IconButton>

                    <div id="fullScreenSwitchIcon">
                        Full Screen
                    </div>
                    <FormControlLabel control={<Switch checked={IsFull} onChange={checkFull} name="isFull"/>}  style={{marginLeft:'0.08vw',marginRight:'0.3vw'}} />
                    {/*<div id="fullScreenSwitchIcon">*/}
                    {/*    <OpenInFullIcon style={{fontSize:"x-large"}}/>*/}
                    {/*</div>*/}
                    {email===null? <div></div> :
                        <div id="AccountMenu">
                            <AccountMenu email={email}/>
                        </div>}

                    <div id="menu">
                        <NMenu openProviderMenu={openProviderMenu}
                               openToolMenu={openToolMenu}
                               openProperty={openProperty}/>

                    </div>
                    <div id="menu">
                        {email===null?  <Button variant="text" onClick={handleLogIn}>LOGIN</Button>:
                                        <Button variant="text" onClick={handleLogOut}>LOGOUT</Button>}

                    </div>

                    {/*{email===null? <Link to={"/auth"} id={"login"}>LOGIN</Link> : <div id={"login"}>LOGOUT</div>}*/}




                </div>
            </div>

    )

}

export {handleLogOut};


