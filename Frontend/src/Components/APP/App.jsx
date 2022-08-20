
import './App.css';
import Navigation from "../Navigation/Navigation";
import OriginMap from "../OriginMap/OriginMap"
import React, {useState} from "react";
import ReactDOM from 'react-dom';
import Footer from '../Footer/Footer'
import MapProviderMenu from '../MapProviderMenu/MapProviderMenu'
import ToolMenu from "../ToolMenu/ToolMenu";
import CurrentStateDialog from '../CurrentStateDialog/CurrentStateDialog'
import Property from '../Property/Property'
import { FullScreen, useFullScreenHandle } from "react-full-screen"


import Title from "../Title/Title"
import NMenu from "../NMenu/NMenu";
import Draggable from 'react-draggable'; // The default


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
       setCurrentState(stateValue);
       setCurrentStateDialogOpen(true);
    };
    const closeStateDialog=()=>{
        setCurrentStateDialogOpen(false);
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
        if(MapProviderMenuOpen===true){
            MapProvider=<MapProviderMenu changeProvider={changeProvider} closeProviderMenu={closeProviderMenu}/>
        }
        if(ToolMenuOpen===true){
            Tool=<ToolMenu  closeToolMenu={closeToolMenu}
                            changeCurrentState={changeCurrentState}
                            CurrentState={CurrentState}
                            setTimerToCloseDialog={setTimerToCloseDialog}
                            clearTimerAboutStateDialog={clearTimerAboutStateDialog}/>
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



        Index = <div>
            {Tool}
            {MapProvider}
            {PropertyDialog}
            <Navigation  checkFull={fullScreenSwitch}
                         IsFull={IsFull}
                         openProviderMenu={openProviderMenu}
                         openToolMenu={openToolMenu}
                         openProperty={openProperty}
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


