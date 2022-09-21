
import './App.css';
import Navigation from "../Navigation/Navigation";
import OriginMap from "../OriginMap/OriginMap"
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import Footer from '../Footer/Footer'
import MapProviderMenu from '../MapProviderMenu/MapProviderMenu'
import ToolMenu from "../ToolMenu/ToolMenu";
import CurrentStateDialog from '../CurrentStateDialog/CurrentStateDialog'
import Property from '../Property/Property'
//import { FullScreen, useFullScreenHandle } from "react-full-screen"
import Tips from "../Tips/Tips";
import Canvas from "../Canvas/Canvas.js"
import {setAxiosToken} from '../Auth/Auth'



import Title from "../Title/Title"
import NMenu from "../NMenu/NMenu";
import store from "../Store";
import {changeColor, user_email, user_password, user_token} from "../Store/actionCreater";
import {Provider} from "react-redux";
//import Draggable from 'react-draggable'; // The default

let currentUser = null;
let token = null;


export  default function App(){

    const manageFull=React.createRef();
    let timer = true;
    const [IsFull, setIsFull] = useState(false);
    const [OSMUrl, setOSMUrl] = useState("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}");
    const [MapProviderMenuOpen, setMapProviderMenuOpen] = useState(false);
    const [ToolMenuOpen, setToolMenuOpen] = useState(false);
    const [CurrentStateDialogOpen, setCurrentStateDialogOpen] = useState(false);
    const [CurrentState, setCurrentState] = useState("outFullScreen");
    const [PropertyOpen, setPropertyOpen] = useState(true);
    const [TipsOpen, setTipsOpen] = useState(false);


    const getCoord = (coord) => {
        // console.log(coord)
        this.setState({...this.state, coord:coord})
    }

    // let state={
    //     isFull: false,
    //     OSMUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    //     MapMenu: false,
    //     ToolMenu: false,
    //     StateDialog: false,
    //     CurrentState: null,
    //     Property:true,
    // }
    //计时器的flag
   let stateTimer = null;
   const  fullScreenSwitch= ()=>{
        //console.log("切换全屏")
        var temp = IsFull;

       setIsFull(!temp);
        if(temp===false){
            // eslint-disable-next-line no-unused-expressions
            setCurrentStateDialogOpen(!temp);
            setCurrentState("intoFullScreen");


        }
        if(temp ===true){
            setCurrentStateDialogOpen(!temp);
            setCurrentState("outFullScreen");
        }

    }
    const changeProvider=(OSMUrlValue)=>{
       // this.setState({OSMUrl : OSMUrlValue});
        setOSMUrl(OSMUrlValue)
            console.log(OSMUrlValue);
    }
    const openProviderMenu=()=>{
        setMapProviderMenuOpen(true)
    }
    const closeProviderMenu=()=>{
        setMapProviderMenuOpen(false);
    }

   const openProperty=()=>{
       setPropertyOpen(true);
    }
    const closeProperty=()=>{
        setPropertyOpen(false);
    }
   const openToolMenu=()=>{
       setToolMenuOpen(true);
    }
    const closeToolMenu=()=>{
        setToolMenuOpen(false);
    }
    const changeCurrentState=(stateValue)=>{
       if(stateValue==="inputtext"){
           setCurrentState(stateValue);
           setCurrentStateDialogOpen(true);
           setTipsOpen(true);
       }else{
           setCurrentState(stateValue);
           setCurrentStateDialogOpen(true);
       }


    };
    const closeStateDialog=()=>{
        setCurrentStateDialogOpen(false);
    }

    const openTips=()=>{
        setTipsOpen(true);
    }
    const closeTips=()=>{
        setTipsOpen(false);
    }


    //设置计时器来关掉stateDialog
    const setTimerToCloseDialog=()=>{
        stateTimer = setTimeout(()=>{ stateTimer=null; closeStateDialog();console.log("Dialog timeOut")},"8000");
        //setTimeout(this.timeToCloseDialog,"200");

    }
    //在改变currentState前关掉stateTimer并且关闭dialog
    const clearTimerAboutStateDialog=()=>{
            if(stateTimer!==null){
                clearTimeout(stateTimer);
                closeStateDialog();
                stateTimer=null;
                console.log("timer has been removed")
            }
    }


        let Index=null;
        let MapProvider =null;
        let Tool= null;
        let CurrentStateDialogComponent = null;
        let PropertyDialog=null;
        let TipsDialog = null;
        let CanvasDialog=null;
        if(MapProviderMenuOpen===true){
            MapProvider=<MapProviderMenu changeProvider={changeProvider} closeProviderMenu={closeProviderMenu}/>
        }
        if(ToolMenuOpen===true){
            Tool=<ToolMenu  closeToolMenu={closeToolMenu}
                            changeCurrentState={changeCurrentState}
                            CurrentState={CurrentState}
                            setTimerToCloseDialog={setTimerToCloseDialog}
                            clearTimerAboutStateDialog={clearTimerAboutStateDialog}
                            openTips={openTips}/>
        }
        if(CurrentStateDialogOpen===true){
            CurrentStateDialogComponent=<CurrentStateDialog
                                    CurrentState={CurrentState}
                                />
            //setTimeout(function(){alert("Hello")},5000);
        }
        if(PropertyOpen===true){
            PropertyDialog= <Property CurrentState={CurrentState}
                                          closeProperty={closeProperty}/>
        }
        if(TipsOpen ===true){
            TipsDialog =<Tips CurrentState={CurrentState}
                              closeTips={closeTips}/>
        }
        if(CurrentState==="paint"){
            CanvasDialog=<Canvas/>
        }


        //让导航条根据用户是否登录来显示不同按钮
        //通过检测redux中是否用用户信息来检测用户是否已经登录
        Index = <div>
            {Tool}
            {MapProvider}
            {PropertyDialog}
            {TipsDialog}
            {CanvasDialog}

                <Navigation  checkFull={fullScreenSwitch}
                             IsFull={IsFull}
                             openProviderMenu={openProviderMenu}
                             openToolMenu={openToolMenu}
                             openProperty={openProperty}
                             getCoord={getCoord}
                />


            {IsFull===false? <div id="Describe">
                                <Title/>
                            </div> : null}
            {IsFull===false?  <div id="stateDialog">
                                    {CurrentStateDialogComponent}
                              </div> : null}

                    <div   id={IsFull===false? "canvas":"fullScreenMap"}ref={ manageFull }>
                                     <OriginMap OSMUrl={OSMUrl}  CurrentState={CurrentState} IsFull={IsFull}/>

            </div>
            {/*{IsFull===false? null:*/}
            {/*    manageFull.current.style.width='100%'*/}
            {/*    manageFull.current.style.height}*/}


        </div>

        useEffect(()=>{
            if(localStorage.getItem("user")){
                console.log("User exist, already login")
                currentUser=JSON.parse(localStorage.getItem("user"));
                token = localStorage.getItem("user_token");

                console.log(JSON.parse(localStorage.getItem("user")));
                store.dispatch(user_email(currentUser.email));
                store.dispatch(user_password(currentUser.password));
                store.dispatch(user_token(token));
                //设置axios的header
                setAxiosToken(token);
                //localStorage.clear();
            }else{
                console.log("not login");
            }
        },[]);




        // if(IsFull===false){
        //     Index = <div>
        //                     {Tool}
        //                     {MapProvider}
        //                     {PropertyDialog}
        //                     <div id="Describe">
        //                         <Navigation  checkFull={fullScreenSwitch}
        //                                      IsFull={IsFull}
        //                                      openProviderMenu={openProviderMenu}
        //                                      openToolMenu={openToolMenu}
        //                                      openProperty={openProperty}
        //                         />
        //                         <Title/>
        //                     </div>
        //                     <div id="canvas">
        //                         <div id="indexMap">
        //                              <OriginMap OSMUrl={OSMUrl}  CurrentState={CurrentState}/>
        //                         </div>
        //                     </div>
        //             </div>
        // }else{
        //     Index= <div>
        //                 {Tool}
        //                 {MapProvider}
        //                 {PropertyDialog}
        //                 <Navigation  checkFull={fullScreenSwitch}
        //                              IsFull={IsFull}
        //                              openProviderMenu={openProviderMenu}
        //                              openToolMenu={openToolMenu}
        //                              openProperty={openProperty}
        //                 />
        //                 <div id="fullScreenMap">
        //                     <div id="stateDialog">
        //                         {CurrentStateDialogComponent}
        //                     </div>
        //
        //                     <OriginMap OSMUrl={OSMUrl} CurrentState={CurrentState} />
        //                 </div>
        //             </div>
        // }

        return(
            <div id="App">
                {Index}
                {/* <Footer/>*/}
            </div>
        );



}


