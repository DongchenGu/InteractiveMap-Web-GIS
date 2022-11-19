
import React, {Component, createRef, useEffect, useState} from 'react';
import { createPortal } from 'react-dom'
import "./PhotoProcessing.css"
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AvatarEditor from 'react-avatar-editor'
import SaveIcon from '@mui/icons-material/Save';
import store from "../Store";
import {setWaitingFlag, user_photo} from "../Store/actionCreater";
import {useNavigate} from "react-router-dom";
import axios from "axios";


//阻止滚轮的滚动事件
var scrollFunction = function(e) {
    e = e || window.event;
    e.preventDefault && e.preventDefault(); //禁止浏览器默认事件
}

let UserPhotoBase64 = null;
export default function  PhotoProcessing(props){
    const [photoWidth, setPhotoWidth] = useState(0.26*window.innerWidth);
    const [photoHeight, setPhotoHeight] = useState(0.26*window.innerWidth);
    const [photoRadius, setPhotoRadius] = useState(0.13*window.innerWidth);
    const [photoRotation, setPhotoRotation] = useState(0);
    const [photoScale,setPhotoScale] = useState(1);
    const [success, setSuccess]= useState(false);
    const [ErrMsg, setErrMsg]=useState(null);
    const [UserPhotoInfo,setUserPhotoInfo] = useState({
        email:"",
        userPhoto:""
    })

    const navigate = useNavigate();

    const editor = createRef();
    const { hidePhotoProcessing} = props;
    const [mode, setMode]=useState(null);
    //设置标志，时候进入图片剪切模块
    //const [cropFlag,setCropflag] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);
    const dom = window.document;
    const node = dom.createElement("div")
    node.setAttribute("id", "PhotoDialogPoint") //this.node.id = "account"
    dom.body.appendChild(node);


    // //给页面绑定滑轮滚动事件
    // if (document.addEventListener) { //firefox
    //     document.addEventListener('DOMMouseScroll', scrollFunction, false);
    // }
    //滚动滑轮触发scrollFunction方法  //ie 谷歌
    window.addEventListener('mousewheel', scrollFunction, { passive: false });



    //刚挂载
    useEffect(()=>{

    },[])

    //撤销在根节点下创建的node
    useEffect(()=>{
        return () => {
            console.log("这里已经执行")
            //document.removeEventListener('DOMMouseScroll',scrollFunction,false);
            window.removeEventListener('mousewheel',scrollFunction,{ passive: false });
            dom.body.removeChild(node);
            navigate("/mainProfile",{ state:{ }});
        }
    },[])




    //判断选择的模式
    const handleModeChoosing=(e)=>{
        if(e.target.value==="current"){
            setMode("current");
        }else{
            setMode("new");
        }
    };



    // const UploadUserPhoto=async (e) => {
    //     try {
    //         await axios.post(
    //             Login_URL,
    //             authInfo,
    //             {headers: {'Content-Type': 'application/json'}}
    //         ).then(response => {
    //             if (response.data.hasOwnProperty("token")) {
    //                 console.log("-----------------")
    //                 console.log(response.data);
    //                 localStorage.setItem("user", JSON.stringify(response.data.user));
    //                 localStorage.setItem("user_token", response.data.token);
    //                 //给axios设置token
    //                 //setAxiosToken(response.data.token);
    //                 setSuccess(true);
    //             } else if (response.data.hasOwnProperty('errMsg')) {
    //                 if (response.data.errMsg === 'wrong-password') {
    //                     alert("Sorry Wrong Password!");
    //                 } else if (response.data.errMsg === 'user-not-exist') {
    //                     alert("User not exist! Please Sign Up!");
    //                 }
    //             }
    //             //console.log(response);
    //             // console.log(res.data);
    //         });
    //         //console.log(JSON.stringify(response?.data));
    //     } catch (err) {
    //         //关闭等待页面
    //         store.dispatch(setWaitingFlag(false));
    //         if (!err?.response) {
    //             setErrMsg("no server response");
    //         } else if (err.response?.status === 400) {
    //             setErrMsg("missing username or password");
    //         } else if (err.response?.status === 401) {
    //             setErrMsg("Unauthorized");
    //         } else {
    //             setErrMsg("login Failed");
    //         }
    //     }
    //     //console.log(authInfo)
    // }


    const handlePhotoUpload=(e)=>{
        console.log("click");
        //判断是否支持FileReader
        if(window.FileReader) {
            var reader = new FileReader();
        } else {
            alert("your browser may not support this function, please use Google Chrome");
        }
        //获取文件
            var file = e.target.files[0];
            var imageType = /^image\//;
            //是否是图片
            if(!imageType.test(file.type)) {
                alert("Please choose an image file!");
                return;
            }

        //读取完成
        reader.onload = function(e) {
            //图片路径设置为读取的图片
            // img.src = e.target.result;
            //console.log(e.target.result);

            //保存图片的base64编码
            setImgSrc(e.target.result);
            // console.log(document.getElementsByClassName('file-box'));
            // document.getElementsByClassName('file-box')[i].style.background = "url("+e.target.result+")no-repeat";//回显图片
            // document.getElementsByClassName('file-box')[i].style.backgroundSize = '200px 160px';
            //把图片传送到剪切图片的模块
            setMode("crop");
            // console.log('reader',reader);
            // console.log(imgSrc);
        };
            reader.readAsDataURL(file);


    }
    //用来上传新图片
    const UserPhotoUpload=<div id="uploadModel">
        <div id="uploadBackground">
            {/*<div style={{display:"inline"}}>*/}
            {/*    Upload Image*/}
            {/*</div>*/}
            <input  type='file' id="RealUpload" value="" name="file"
                    accept='image/jpeg,image/jpg,image/png,image/svg' onChange={handlePhotoUpload}/>
        </div>
    </div>













    function dataURLToBlob(fileDataURL) {
        let arr = fileDataURL.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while(n --) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], {type: mime})
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
    //用来剪切图片
    {/*{setPhotoWidth(0.2*window.innerWidth)}*/}
    {/*{setPhotoHeight(0.2*window.innerWidth)}*/}

    const handlePhotoRadius =(e)=>{
        setPhotoRadius(Number(e.target.value));
    }
    const handlePhotoRotation =(e)=>{
        setPhotoRotation(Number(e.target.value));
    }
    const handlePhotoScale=(e)=>{
        //注意这里获得到的是string，要转换成number
        //console.log(typeof(e.target.value))
        // console.log(e);
        setPhotoScale(Number(e.target.value));
    }

    const ReactCrop=<div id="ReactCropFrame">

        <div style={{margin:"1vw"}}>
            <AvatarEditor
                ref={editor}
                // image="http://example.com/initialimage.jpg"
                image={imgSrc}
                width={photoWidth}
                height={photoHeight}
                border={25}
                scale={photoScale}
                rotate={photoRotation}
                borderRadius={photoRadius}
                color={[128, 128, 128, 0.8]}
            />
        </div>

        <div id="ReactCropProps">
            <table style={{paddingTop:"50%",paddingBottom:"50%"}}>
                <tbody>
                    <tr className="RCline">
                        <td className="RCfirstLine">
                            Zoom:
                        </td>
                        <td className="RCsecondLine">
                            <input name="scale" type="range" min={1} max={2} step={0.1}
                                   defaultValue={photoScale} className="RCinputSlide" onChange={handlePhotoScale}/>
                            {/*<input name="scale" type="range" min={1} max={2} step={0.01}*/}
                            {/*       value={photoScale} className="RCinputSlide" onChange={handlePhotoScale}/>*/}
                        </td>
                    </tr>
                    <tr className="RCline">
                        <td className="RCfirstLine">
                            BorderRadius:
                        </td>
                        <td className="RCsecondLine">
                            <input name="radius" type="range" min={0} max={0.13*window.innerWidth} step={1}
                                   value={photoRadius} className="RCinputSlide" onChange={handlePhotoRadius}/>
                        </td>
                    </tr>
                    <tr className="RCline">
                        <td className="RCfirstLine">
                            Rotation:
                        </td>
                        <td className="RCsecondLine">
                            <input name="rotation" type="range" min={0} max={180} step={1}
                                   value={photoRotation} className="RCinputSlide" onChange={handlePhotoRotation}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="savePhotoButton">

            </div>

        </div>

    </div>

    return createPortal(
        <div>
                <div id="PhotoDialogCover">
                </div>
                <div id="PhotoDialogFrame">
                <div id="PhotoDialogHeader">
                    <div id="PhotoDialogTitle">
                        <div style={{display:"inline"}}>
                            SetUp Your Photo
                        </div>

                    </div>
                    <div id="PhotoDialogClose">
                            <IconButton onClick={hidePhotoProcessing}>
                                <ClearIcon style={{fontSize: "3vh"}}/>
                            </IconButton>
                    </div>
                </div>

                <div id="ModeChoosing">
                    <FormControl>
                        {/*<FormLabel id="demo-form-control-label-placement">Label placement</FormLabel>*/}
                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                        >
                            <FormControlLabel value="current" control={<Radio onChange={handleModeChoosing}/>} label="Use Current Photo" />
                            <FormControlLabel value="new" control={<Radio onChange={handleModeChoosing}/>} label="Upload New Photo" />
                        </RadioGroup>
                    </FormControl>
                    <IconButton  onClick={() => {
                        if (editor) {
                            const canvas = editor.current.getImage()
                            //压缩图片
                            let canvas2 =document.createElement('canvas');
                            let context = canvas2.getContext('2d');
                            canvas2.width = 400;
                            canvas2.height = 400;
                            context.drawImage(canvas,0,0);
                            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
                            //const canvasScaled = editor.current.getImageScaledToCanvas()
                            //console.log(canvas)
                            //downloadImage(canvas.toDataURL('image/jpg'))
                            // console.log(canvas.toDataURL('image/jpg'))
                            console.log(canvas2.toDataURL('image/jpg'));

                            //将压缩后的图片保存在redux
                            store.dispatch(user_photo(canvas2.toDataURL('image/jpg')));

                            //将图片保存到JSON里面
                            setUserPhotoInfo({email: store.getState().email,userPhoto:canvas2.toDataURL('image/jpg') })
                            //将图片信息上传到服务器

                            //关闭窗口
                            hidePhotoProcessing();
                        }
                    }}>
                        <SaveIcon/>
                    </IconButton>

                </div>
                <div id="ModeProcessing">
                    {mode==="new"? UserPhotoUpload: mode==="crop"? ReactCrop:null}


                </div>

            </div>
        </div>
        ,node
    );

}