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
import {changeColor, changeFamily, changeFontSize, changeText} from "../Store/actionCreater";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import {CHANGE_FAMILY} from "../Store/constant";

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
    const [size, setSize] = React.useState(10);
   // let size =4;
    const [fontFamily, setFontFamily] = React.useState("Arial");

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
        //console.log(textRef.current.children[0].value)
        setText(textRef.current.children[0].value);
       // console.log(text)这里changeText里面不能直接用text，因为setText是异步的
        store.dispatch(changeText(textRef.current.children[0].value));
    };


    const handleSizeChange = (event) => {
        console.log("size "+event.target.value);
        setSize(event.target.value);
        //转换一下大小，数越大，结果越小，换成scale，用户更直观一些
        store.dispatch(changeFontSize(1/size));
    };


    const handleFontFamilyChange = (event) => {
        console.log(event.target.value);
        store.dispatch(changeFamily(event.target.value));
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
                                                    <div>choose your Font Size(zoom level): &nbsp;</div>
                                                </div>
                                                <div id="FontSizeExplain">if you zoom the map in high level, you need to choose the large number: &nbsp;</div>
                                            </td>
                                            <td>
                                                <div id="FontSizeExplain">
                                                    <Slider
                                                        value={size}
                                                        onChange={handleSizeChange}
                                                        size="small"
                                                        defaultValue={10}
                                                        aria-label="Small"
                                                        valueLabelDisplay="auto"
                                                        min={0.5}
                                                        max={100}
                                                    />
                                                </div>
                                                {/*     <FormControl sx={{ m: 1, minWidth: 120 }} size="small">*/}
                                                {/*    <InputLabel id="demo-select-small">size</InputLabel>*/}
                                                {/*    <Select*/}
                                                {/*        labelId="demo-select-small"*/}
                                                {/*        id="demo-select-small"*/}
                                                {/*        value={size}*/}
                                                {/*        label="size"*/}
                                                {/*        onChange={handleSizeChange}*/}
                                                {/*    >*/}
                                                {/*        /!*<MenuItem value="">*!/*/}
                                                {/*        /!*    <em>None</em>*!/*/}
                                                {/*        /!*</MenuItem>*!/*/}
                                                {/*        <MenuItem value={0.5}>0.5</MenuItem>*/}
                                                {/*        <MenuItem value={1}>1</MenuItem>*/}
                                                {/*        <MenuItem value={2}>2</MenuItem>*/}


                                                {/*    </Select>*/}
                                                {/*</FormControl>*/}
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
                                            <td id="FontSizeExplain">
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

