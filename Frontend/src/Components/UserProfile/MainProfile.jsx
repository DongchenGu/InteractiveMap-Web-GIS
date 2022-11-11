import * as React from 'react';
import "./MainProfile.css"
import Button from "@mui/material/Button";
import Search from "../Navigation/Search/Search";
import IconButton from "@mui/material/IconButton";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import AccountMenu from "../AccountMenu/AccountMenu";
import NMenu from "../NMenu/NMenu";
import {Link, useNavigate} from "react-router-dom";
import Input from '@mui/material/Input';
import {useEffect, useState} from "react";
import userPhoto from '../../images/2-26 PM.jpg';
import store from "../Store";
import {setWaitingFlag, user_email, user_name, user_password, user_token} from "../Store/actionCreater";
import axios from "axios";
import {setAxiosToken} from "../Auth/Auth";
import {instance} from "../axios/request";
import { createTheme, ThemeProvider } from '@mui/material/styles';


import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
//导入截图
import ScreenShot from "js-web-screen-shot";
import EditIcon from '@mui/icons-material/Edit';
import PhotoProcessing from "../AlertDialog/PhotoProcessing";
import {getTableSortLabelUtilityClass} from "@mui/material";




const UpdateProfile_URL = 'http://localhost:8080/updateProfile';
const ariaLabel = { 'aria-label': 'description' };
//用来标记修改的名字邮箱是否有效
let EditTag=false;
//用来检测邮箱地址是否符合要求
function CheckMail(emailAddress){

    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    var bChk=reg.test(emailAddress);
    return bChk; }
//用来检测用户名是否符合要求
function CheckUserName(username){
    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    var nameResult = USER_REGEX.test(username);
    return nameResult;
}

// axios.interceptors.request.use(config=>{
//     console.log(config);
//     config.headers.Authorization = store.getState().token;
//     return config;
// })


export default function MainProfile(props){
    const theme = createTheme({
        status: {
            danger: '#e53e3e',
        },
        palette: {
            white: {
                main: '#ffffff',
                darker: '#b7b7b7',
            },
            neutral: {
                main: '#64748B',
                contrastText: '#fff',
            },
        },
    });
    const navigate = useNavigate();
    const [ErrMsg, setErrMsg] = useState("null");
    const [userInfo, setUserInfo] = useState({
        email:"",
        username:"",
        password:"",
        confirm_password:""
    })
    const [profileState, setProfileState] = useState("show");
    const handlePhotoClick=(e)=>{
        console.log("图片已经被点击");
    }
    //退出登录
    const handleLogOut=(e)=>{
        //清除localStorage
        localStorage.clear();
        //清除redux中的用户信息
        store.dispatch(user_email(null));
        store.dispatch(user_name(null));
        store.dispatch(user_password(null));
        store.dispatch(user_token(null));
        //跳转回到home页面
        navigate("/home",{ state:{ }});

    };
    const backHome=(e)=>{
        //跳转回到home页面
        navigate("/home",{ state:{ }});
    }
    //将页面切换到userProfile的修改页面
    const handleEditProfile=(e)=>{
        setProfileState("edit");
    }
    //将页面切换回到显示
    const handleCancel=(e)=>{
        setProfileState("show");
    }

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
        //拿到base64后下载图片
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

    const [PhotoProcessingVisible, setPhotoProcessingVisible] =useState(false);
    const hidePhotoProcessing = ()=>{
        setPhotoProcessingVisible(false);
    }
    const handlePhotoProcessing=()=>{
        console.log('编辑图片')
        setPhotoProcessingVisible(true);
    }


    //向服务器提交修改
    const handleSubmitEditting=async (e) => {
        //console.log(userInfo);
        const emailResult = CheckMail(userInfo.email);
        const usernameResult = CheckUserName(userInfo.username);
        if (!emailResult) {
            alert("Please input the valid Emial Address!");
        } else if (!usernameResult) {
            alert("Please input the valid userName!");
        } else {
            EditTag = true;
        }

        if (EditTag === true) {
            //设置进入等待页面
            store.dispatch(setWaitingFlag(true));
            try {
                await instance.post(
                    UpdateProfile_URL,
                    userInfo,
                    {headers: {'Content-Type': 'application/json'}}
                ).then(response => {
                    if (response.data.hasOwnProperty("success")) {
                        console.log("已经收到服务器回复-----------------")
                        console.log(response.data);
                        //分情况讨论，看用户有没有更改密码，如果用户更改了密码，需要重新登录
                        if(response.data.user.relogin==="true"){
                            //退出当前登录用户，清除localStorage,跳转至登录页面
                            handleLogOut();
                            navigate("/auth", { state: {  }});
                        }else{
                            //用户没改密码，不需要重新登录，
                            localStorage.setItem("user", JSON.stringify(response.data.user));
                            //store.dispatch(user_email(response.data.user.email));
                            store.dispatch(user_name(response.data.user.username))
                            store.dispatch(user_password(null));
                            //不需要再存储token因为已经有了
                            //store.dispatch(user_token(null));
                            //将页面切换回到用户信息显示的页面上
                            setProfileState("show");
                            //关闭等待页面
                            store.dispatch(setWaitingFlag(false));
                        }

                    } else if (response.data.hasOwnProperty('errMsg')) {
                        if (response.data.errMsg === 'user-not-exist') {
                            alert("Sorry user-not-exist! Update Fail");
                        }else if(response.data.errMsg === '未携带token信息'){
                            alert("token is not set correctly");
                        }
                    }
                });
                //console.log(JSON.stringify(response?.data));
            } catch (err) {
                //关闭等待页面
                store.dispatch(setWaitingFlag(false));
                if (!err?.response) {
                    setErrMsg("no server response");
                } else if (err.response?.status === 400) {
                    setErrMsg("missing username or password");
                } else if (err.response?.status === 401) {
                    setErrMsg("Unauthorized");
                } else {
                    setErrMsg("login Failed");
                }
            }
        }
    }
    //修改用户名和邮箱时，同步更新到userinfo里面
    const handleEditText=(e)=>{
        let target = e.target.attributes.id.value;
        setUserInfo({...userInfo,[target]:e.target.value});
        //console.log(e);
    }
    //组件第一次加载时候需要做
    useEffect(()=>{
        let tempOB = store.getState();
        if(tempOB.user_email===null){
            navigate("/home", {state : { }})
        }
        // let user_email =tempOB.user_name;
        // if(user_email===null){
        //     user_email = "set your name!";
        // }
        setUserInfo({email:tempOB.user_email,username: tempOB.user_name, password: null})
        //axios.defaults.headers.common['token'] = tempOB.token ;

    },[])

    //分两种情况，显示profile和修改profile
    const showProfile= <div >
                            <table id="profileTable">
                                <tbody>
                                <tr>
                                    <td id="UserName"><div >{userInfo.username}</div></td>
                                </tr>
                                <tr>
                                    <td id="Email"><div >{userInfo.email}</div></td>
                                </tr>
                                </tbody>
                            </table>
                            <div style={{width:"100%"}}>
                                <Button variant="outlined" color="inherit" onClick={handleEditProfile}>Edit Profile</Button>
                            </div>


                        </div>

    const editProfile=<div >
                            {/*<div id="userPhoto">*/}
                            {/*    <img src={userPhoto} id="round_icon" alt="" onClick={handlePhotoClick}/>*/}
                            {/*</div>*/}
                            <table id="profileTable">
                                <tbody>
                                <tr>
                                    <td id="FontEdit"><div>Email:</div></td>
                                    <td id="Email"><div >{userInfo.email}</div></td>

                                </tr>
                                <tr>
                                    <td id="FontEdit"><div>UserName:</div></td>
                                    <td id="FontEdit">
                                        <Input type={"text"} id="username" placeholder={userInfo.username} inputProps={ariaLabel}
                                               onChange={handleEditText}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="FontEdit"><div>Password:</div></td>
                                    <td id="FontEdit">
                                        <Input type={"text"} id="password" placeholder="click to change password" inputProps={ariaLabel}
                                               onChange={handleEditText}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                             <div style={{display:"flex",flexDirection:"column"}}>
                                <Button variant="outlined" color="inherit" onClick={handleSubmitEditting} >Submit</Button>
                                <Button variant="outlined" color="inherit" onClick={handleCancel}
                                    style={{marginTop:"1vh"}}>Cancel</Button>
                             </div>
                      </div>

    return(
        <div>

            <div id="mainProfile">
                <div id="navigationProfile">

                    <div id="leftBar">

                    </div>


                    <div id="rightBar">
                        <ThemeProvider theme={theme}>

                            <IconButton onClick={handleScreenShot}>
                                <AddAPhotoIcon />
                            </IconButton>
                            <IconButton  style={{marginRight:'1vw'}}>
                                <DeleteTwoToneIcon />
                            </IconButton>

                            <div id="AccountMenu">
                                <AccountMenu email={userInfo.email}/>
                            </div>
                            <div id="menu">
                                <Button variant="text"  color="white" onClick={backHome}>HOME</Button>
                            </div>
                            <div id="menu">
                                <Button variant="text"  color="white" onClick={handleLogOut}>LOGOUT</Button>
                            </div>
                        </ThemeProvider>
                    </div>
                </div>
                <div id="profile">
                    <div id="outSideUserPhoto">
                        <div id="userPhotoFrame">
                            {/*<div id="userPhoto">*/}

                            {/*</div>*/}
                            {/*<img src={userPhoto} id="image" alt="" onClick={handlePhotoClick}/>*/}
                        </div>
                        <div id="editUserPhoto">
                            <IconButton onClick={handlePhotoProcessing}>
                                <EditIcon />
                            </IconButton>
                        </div>
                    </div>

                    {PhotoProcessingVisible===true? <PhotoProcessing hidePhotoProcessing={hidePhotoProcessing}/>: null}
                    {profileState === "show"? showProfile : editProfile}
                </div>

                <div id="content">

                </div>

            </div>
        </div>

    )

}