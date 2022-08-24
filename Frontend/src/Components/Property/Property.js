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
import {changeColor, changeText} from "../Store/actionCreater";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
const ariaLabel = { 'aria-label': 'description' };

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
    const [text,setText]= useState("N/A")

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

                                <div  id="thirdLine">
                                    Choose color that will use: &nbsp;
                                    <ColorPicker setDisplayColorPicker={setDisplayColorPicker}
                                                 setPickedColor={setPickedColor}
                                                 displayColorPicker={displayColorPicker}
                                                 color={color}
                                    />
                                </div>
                            </div>

    //----------------------------------------------------------------used for text input
    const textRef = React.createRef();

    const handleTextChange = ()=>{
        setText(textRef.current.children[0].value);
        store.dispatch(changeText(text));
    };

    const [size, setSize] = React.useState(5);
    const [fontFamily, setFontFamily] = React.useState("Arial");
    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };
    const handleFontFamilyChange = (event) => {
        setFontFamily(event.target.value);
    };
    const inputtextProperty=<div id ="largeProperty" ref={nodeRef}>
                                <div id="firstLine">
                                    <div id="toolName">
                                        TEXT
                                    </div>
                                    <div id="closeIcon">
                                        <IconButton onClick={handleCloseToolMenu}>
                                            <ClearIcon  fontSize="small" style={{marginTop:"auto"}}/>
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="inputAttributes">
                                    intput the Text and the attributes: &nbsp;
                                </div>

                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="inputAttributes">
                                                    input your text: &nbsp;
                                                </div>
                                            </td>
                                            <td>
                                                <div className="inputAttributes">
                                                <Input placeholder="Your Text" inputProps={ariaLabel}
                                                       ref={textRef}
                                                       onChange={handleTextChange}
                                                        id="text"/>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="inputAttributes">
                                                    <div>choose your Font Size: &nbsp;</div>
                                                </div>
                                            </td>
                                            <td>
                                                     <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                    <InputLabel id="demo-select-small">size</InputLabel>
                                                    <Select
                                                        labelId="demo-select-small"
                                                        id="demo-select-small"
                                                        value={size}
                                                        label="size"
                                                        onChange={handleSizeChange}
                                                    >
                                                        {/*<MenuItem value="">*/}
                                                        {/*    <em>None</em>*/}
                                                        {/*</MenuItem>*/}
                                                        <MenuItem value={4}>4</MenuItem>
                                                        <MenuItem value={5}>5</MenuItem>
                                                        <MenuItem value={6}>6</MenuItem>
                                                        <MenuItem value={7}>7</MenuItem>
                                                        <MenuItem value={8}>8</MenuItem>
                                                        <MenuItem value={9}>9</MenuItem>
                                                        <MenuItem value={10}>10</MenuItem>
                                                        <MenuItem value={11}>11</MenuItem>
                                                        <MenuItem value={12}>12</MenuItem>
                                                        <MenuItem value={13}>13</MenuItem>
                                                        <MenuItem value={14}>14</MenuItem>
                                                        <MenuItem value={15}>15</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="inputAttributes">
                                                    choose your Font Family: &nbsp;
                                                </div>
                                            </td>
                                            <td>
                                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                    <InputLabel id="demo-select-small">FontFamily</InputLabel>
                                                    <Select
                                                        labelId="demo-select-small"
                                                        id="demo-select-small"
                                                        value={fontFamily}
                                                        label="fontFamily"
                                                        onChange={handleFontFamilyChange}
                                                    >
                                                        {/*<MenuItem value="">*/}
                                                        {/*    <em>None</em>*/}
                                                        {/*</MenuItem>*/}
                                                        <MenuItem value={"Arial"}>Arial</MenuItem>
                                                        <MenuItem value={"Verdana"}>Verdana</MenuItem>
                                                        <MenuItem value={"Arial Black"}>Arial Black</MenuItem>
                                                        <MenuItem value={"Trebuchet MS "}>Trebuchet MS </MenuItem>
                                                        <MenuItem value={"Impact"}>Impact</MenuItem>
                                                        <MenuItem value={"Times New Roman"}>Times New Roman</MenuItem>
                                                        <MenuItem value={"Georgia"}>Georgia</MenuItem>
                                                        <MenuItem value={"American Typewriter"}>American Typewriter</MenuItem>
                                                        <MenuItem value={"Monaco"}>Monaco</MenuItem>
                                                        <MenuItem value={"Bradley Hand"}>Bradley Hand</MenuItem>
                                                        <MenuItem value={"Luminari "}>Luminari </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="inputAttributes">
                                                    Choose the Font Color you use: &nbsp;
                                                </div>
                                            </td>
                                            <td>
                                                <ColorPicker setDisplayColorPicker={setDisplayColorPicker}
                                                             setPickedColor={setPickedColor}
                                                             displayColorPicker={displayColorPicker}
                                                             color={color}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>




                                <div  id="thirdLine">


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
    if(CurrentState==="inputtext"){
        index=<Draggable nodeRef={nodeRef} handle='#firstLine'>
            {inputtextProperty}
        </Draggable>
    }




        return (
            <div>
                {index}
            </div>
        );
}

