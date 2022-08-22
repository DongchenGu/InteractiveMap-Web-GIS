import "./Property.css"
import React, {useState, useEffect, useRef} from "react";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import PubSub from "pubsub-js";
import { HuePicker,SketchPicker} from 'react-color';
import Draggable from 'react-draggable';
import ColorPicker from "../ColorPicker/ColorPicker"; // The default

//redux
import store from "../Store";
import {changeColor} from "../Store/actionCreater";



let color="#000000";
function setColor(){

}

export  default function Property (props){
    //状态提升后提上来的
    const [displayColorPicker,setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
    },);


    const [LL, setLL]= useState("N/A");
    const [CC,setCC] = useState("N/A"); //center of circle
    const [CR, setCR] = useState("N/A");
    const nodeRef = React.useRef(null);


    const setPickedColor=(co)=>{
        setColor(co);
        // console.log("设置");
        // console.log(co);
        store.dispatch(changeColor(color));
    }

    const handleCloseToolMenu=()=>{
        props.closeProperty();
    }
    const handleSubscribeProperty=(msg,data)=>{
        if(msg==='pointProperty'){
            setLL(data.LL);
        }else if(msg==='circleProperty'){
            setCC(data.CC);
            setCR(data.CR);
           // console.log("此处一致性")
        }
    }


    useEffect(()=>{
        PubSub.subscribe('pointProperty',handleSubscribeProperty);
        PubSub.subscribe('circleProperty',handleSubscribeProperty);

    },[])
    useEffect(()=>{
        return () => {
            PubSub.unsubscribe('pointProperty');
            PubSub.unsubscribe('circleProperty');
        }
    },[])

    let index=null;
    let line1
    const {CurrentState} = props;



    const pointProperty =<div id ="largeProperty" ref={nodeRef}>
                            <div id="firstLine">
                                <div id="toolName">
                                    {CurrentState}
                                </div>
                                <div id="closeIcon">
                                    <IconButton onClick={handleCloseToolMenu}>
                                        <ClearIcon  fontSize="small" style={{marginTop:"auto"}}/>
                                    </IconButton>
                                </div>
                            </div>
                            <div id="secondLine">
                                <div id="toolAttributes">
                                    Longitude/latitude:
                                    { (LL ==="N/A" )?  "You have not chose a POINT": LL.lng.toFixed(5)+","+LL.lat.toFixed(5)
                                    }
                                </div>

                            </div>
                        </div>

    const circleProperty=<div id ="largeProperty" ref={nodeRef}>
                            <div id="firstLine">
                                <div id="toolName">
                                    {CurrentState}
                                </div>
                                <div id="closeIcon">
                                    <IconButton onClick={handleCloseToolMenu}>
                                        <ClearIcon  fontSize="small" style={{marginTop:"auto"}}/>
                                    </IconButton>
                                </div>
                            </div>
                            <div id="secondLine">
                                <div id="toolAttributes">
                                    Center of the choosen Circle:&nbsp;{CC==="N/A"? "Not choose": CC.lng.toFixed(3)+"/"+CC.lat.toFixed(3)}
                                </div>
                            </div>
                            <div id="secondLine">
                                <div id="toolAttributes">
                                    Radius of the choosen Circle:&nbsp;{CR==="N/A"? "Not choose" : CR.toFixed(3)}
                                </div>
                            </div>

                            <div  id="thirdLine">
                                Choose color that will use: &nbsp;
                                <ColorPicker setDisplayColorPicker={setDisplayColorPicker}
                                             setPickedColor={setPickedColor}
                                             displayColorPicker={displayColorPicker}
                                             color={color}
                                             />
                            </div>
                        </div>

    const polygonProperty=<div id ="largeProperty" ref={nodeRef}>
                            <div id="firstLine">
                                <div id="toolName">
                                    {CurrentState}
                                </div>
                                <div id="closeIcon">
                                    <IconButton onClick={handleCloseToolMenu}>
                                        <ClearIcon  fontSize="small" style={{marginTop:"auto"}}/>
                                    </IconButton>
                                </div>
                            </div>
                            <div id="secondLine">
                                <div id="toolAttributes">
                                     Property of a polygon: &nbsp;
                                </div>
                            </div>
                            {/*<div id="secondLine">*/}
                            {/*    <div id="toolAttributes">*/}
                            {/*        Radius of the choosen Circle:&nbsp;{CR==="N/A"? "Not choose" : CR.toFixed(3)}*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div  id="thirdLine">
                                Choose color that will use: &nbsp;
                                <ColorPicker setDisplayColorPicker={setDisplayColorPicker}
                                             setPickedColor={setPickedColor}
                                             displayColorPicker={displayColorPicker}
                                             color={color}
                                />
                            </div>
                        </div>


    const rectangleProperty=<div id ="largeProperty" ref={nodeRef}>
                                <div id="firstLine">
                                    <div id="toolName">
                                        {CurrentState}
                                    </div>
                                    <div id="closeIcon">
                                        <IconButton onClick={handleCloseToolMenu}>
                                            <ClearIcon  fontSize="small" style={{marginTop:"auto"}}/>
                                        </IconButton>
                                    </div>
                                </div>
                                <div id="secondLine">
                                    <div id="toolAttributes">
                                        Property of a rectangle: &nbsp;
                                    </div>
                                </div>
                                {/*<div id="secondLine">*/}
                                {/*    <div id="toolAttributes">*/}
                                {/*        Radius of the choosen Circle:&nbsp;{CR==="N/A"? "Not choose" : CR.toFixed(3)}*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div  id="thirdLine">
                                    Choose color that will use: &nbsp;
                                    <ColorPicker setDisplayColorPicker={setDisplayColorPicker}
                                                 setPickedColor={setPickedColor}
                                                 displayColorPicker={displayColorPicker}
                                                 color={color}
                                    />
                                </div>
                            </div>


    if(CurrentState==="circle"){
            index= <Draggable nodeRef={nodeRef} handle='#firstLine'>
                         {circleProperty}
                     </Draggable>

        }
    if(CurrentState==="point"){
        index=<Draggable nodeRef={nodeRef} handle='#firstLine'>
                    {pointProperty}
            </Draggable>
    }
    if(CurrentState==="polygon"){
        index=<Draggable nodeRef={nodeRef} handle='#firstLine'>
                {polygonProperty}
                </Draggable>
    }
    if(CurrentState==="rectangle"){
        index=<Draggable nodeRef={nodeRef} handle='#firstLine'>
            {rectangleProperty}
        </Draggable>
    }



        return (
            <div>
                {index}
            </div>
        );
}

