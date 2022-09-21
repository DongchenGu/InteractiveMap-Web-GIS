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
import {Link} from "react-router-dom";
import {deleteAllText} from "../OriginMap/OriginMap"

import {user_email, user_password, user_token} from "../Store/actionCreater";
import store from "../Store";



export default  function  Navigation(props){
    const logo ="./Logo1.png";
    const [email,setEmail]= useState(null);

    const {IsFull,checkFull,openProviderMenu,openToolMenu,openProperty,getCoord} =props;

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
                    <IconButton >
                        <DeleteTwoToneIcon />
                    </IconButton>
                    <FormControlLabel control={<Switch checked={IsFull} onChange={checkFull} name="isFull"/>}   />
                    <div id="fullScreenSwitchIcon">
                        <OpenInFullIcon style={{fontSize:"x-large"}}/>
                    </div>
                    {email===null? <div></div> :
                        <div id="AccountMenu">
                            <AccountMenu email={email}/>
                        </div>}

                    <div id="menu">
                        <NMenu openProviderMenu={openProviderMenu}
                               openToolMenu={openToolMenu}
                               openProperty={openProperty}/>

                    </div>
                    {email===null? <Link to={"/auth"} id={"login"}>LOGIN</Link> : <div id={"login"}>LOGOUT</div>}




                </div>
            </div>

    )

}


