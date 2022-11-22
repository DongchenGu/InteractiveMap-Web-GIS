
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
import {instance} from "../axios/request";


let UploadPhoto_URL='http://localhost:8080/updateUserPhoto'


//阻止滚轮的滚动事件
var scrollFunction = function(e) {
    e = e || window.event;
    e.preventDefault && e.preventDefault(); //禁止浏览器默认事件
}

let UserPhotoBase64 = null;
let UserPhotoInfo ={
    email:"",
    userPhoto:""
};

export default function  PhotoProcessing(props){
    const [photoWidth, setPhotoWidth] = useState(0.26*window.innerWidth);
    const [photoHeight, setPhotoHeight] = useState(0.26*window.innerWidth);
    const [photoRadius, setPhotoRadius] = useState(0.13*window.innerWidth);
    const [photoRotation, setPhotoRotation] = useState(0);
    const [photoScale,setPhotoScale] = useState(1);
    const [success, setSuccess]= useState(false);
    const [ErrMsg, setErrMsg]=useState(null);
    // const [UserPhotoInfo,setUserPhotoInfo] = useState({
    //     email:"",
    //     userPhoto:""
    // })

    const navigate = useNavigate();

    const editor = createRef();
    const { hidePhotoProcessing} = props;
    const [mode, setMode]=useState("new");
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
        setImgSrc(store.getState().user_photo);
        axios.defaults.headers.token = store.getState().user_token ;
    },[])

    //撤销在根节点下创建的node
    useEffect(()=>{
        return () => {
            console.log("已经unmount photoProcessing")
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



    const UploadUserPhoto=async (e) => {
        try {

            await instance.post(
                UploadPhoto_URL,
                UserPhotoInfo,
                {headers: {'Content-Type': 'application/json'}}
            ).then(response => {
                console.log(response)
                if (response.data.hasOwnProperty("success")) {
                    console.log("接收到成功数据----------------")
                    console.log(response.data);
                    //说明上传成功
                    //setSuccess(true);
                } else if (response.data.hasOwnProperty('errMsg')) {
                        alert(response.data.errMsg);
                }
            });
            //console.log(JSON.stringify(response?.data));
        } catch (err) {
            // //关闭等待页面
            // store.dispatch(setWaitingFlag(false));
            if (!err?.response) {
                setErrMsg("no server response");
            } else if (err.response?.status === 400) {
                setErrMsg("error with user info");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Upload Failed");
            }
            alert("Upload Fail:"+ErrMsg);
        }
        //console.log(authInfo)
    }




    const handlePhotoUpload=(e)=>{
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
            // console.log("原始图像");
            // console.log(e.target.result);

            //压缩图片
            let img = new Image();
            img.src = e.target.result;
            let OriginCanvas = document.createElement("canvas");
            let OringinContext = OriginCanvas.getContext('2d');

            img.onload=function () {
                // 图片原始尺寸
                var originWidth = img.width;
                var originHeight = img.height;
                // 最大尺寸限制
                var maxWidth = 700, maxHeight = 700;
                // 目标尺寸
                var targetWidth = originWidth, targetHeight = originHeight;
                // 图片尺寸超过500 500的限制
                if (originWidth > maxWidth || originHeight > maxHeight) {
                    if (originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }
                    OriginCanvas.width=targetWidth;
                    OriginCanvas.height =targetHeight;

                    OringinContext.drawImage(img, 0, 0, targetWidth, targetHeight);
                    // console.log("压缩后的图像");
                    // console.log(OriginCanvas.toDataURL('image/jpg'))
                    //保存图片的base64编码
                    setImgSrc(OriginCanvas.toDataURL('image/jpg'));
                    //把图片传送到剪切图片的模块
                    setMode("crop");

            }
            //保存图片的base64编码
            //         setImgSrc(e.target.result);
            //         //把图片传送到剪切图片的模块
            //         setMode("crop");

            // console.log(document.getElementsByClassName('file-box'));
            // document.getElementsByClassName('file-box')[i].style.background = "url("+e.target.result+")no-repeat";//回显图片
            // document.getElementsByClassName('file-box')[i].style.backgroundSize = '200px 160px';

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
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >

                            {imgSrc=== null?
                                <FormControlLabel value="current"  disabled control={<Radio onClick={handleModeChoosing}/>} label="Use Current Photo" />:
                                <FormControlLabel value="current" control={<Radio onClick={handleModeChoosing}/>} label="Use Current Photo" />}

                            <FormControlLabel value="new"  control={<Radio onClick={handleModeChoosing}/>} label="Upload New Photo" />

                        </RadioGroup>
                    </FormControl>

                        {/*<RadioGroup*/}
                        {/*    row*/}
                        {/*    aria-labelledby="demo-form-control-label-placement"*/}
                        {/*    name="position"*/}
                        {/*    defaultValue="top"*/}
                        {/*>*/}
                        {/*    {imgSrc=== null?  null:*/}
                        {/*        <FormControlLabel value="current" control={<Radio onChange={handleModeChoosing}/>} label="Use Current Photo" />}*/}
                        {/*    <FormControlLabel value="new"   control={<Radio onChange={handleModeChoosing}/>} label="Upload New Photo" />*/}
                        {/*</RadioGroup>*/}

                    <IconButton  onClick={() => {
                        if (editor) {
                            const canvas = editor.current.getImage()

                            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
                            //const canvasScaled = editor.current.getImageScaledToCanvas()
                            //downloadImage(canvas.toDataURL('image/jpg'))
                            //最终结果
                            // console.log("裁剪之后的结果")
                            // console.log(canvas.toDataURL('image/jpg'));

                            //将图片保存到JSON里面
                            UserPhotoInfo={email: store.getState().user_email,userPhoto:canvas.toDataURL('image/jpg') };

                            store.dispatch(setWaitingFlag(false));
                            console.log("这里是需要上传的信息")
                            console.log(UserPhotoInfo);
                            //将图片保存在redux
                            store.dispatch(user_photo(canvas.toDataURL('image/jpg')));

                            //将图片信息上传到服务器
                            console.log("开始上传信息");
                            UploadUserPhoto();
                            console.log("上传结束")

                            //关闭窗口
                            hidePhotoProcessing();
                        }
                    }}>
                        <SaveIcon/>
                    </IconButton>

                </div>
                <div id="ModeProcessing">
                    {mode==="new"? UserPhotoUpload: mode==="crop"? ReactCrop:ReactCrop}


                </div>

            </div>
        </div>
        ,node
    );

}