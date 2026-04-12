import "./Property.css"
import React, {useState, useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import PubSub from "pubsub-js";
import Draggable from 'react-draggable';
import ColorPicker from "../ColorPicker/ColorPicker";

//redux
import store from "../Store";
import {changeColor, changeFamily, changeFontSize, changeLineWidth, changeText} from "../Store/actionCreater";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import {canvasUndo, canvasRedo, resetCanvas} from "../Canvas/Canvas"
import SpellcheckIcon from "@mui/icons-material/Spellcheck";

import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ariaLabel = { 'aria-label': 'description' };

/* ── reusable sub-components ─────────────────────────────── */

function PropHeader({ title, onClose, nodeRef }) {
    return (
        <div id="firstLine">
            <div id="toolName">{title}</div>
            <div id="closeIcon">
                <IconButton onClick={onClose} size="small">
                    <ClearIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
    );
}

function PropRow({ label, hint, children }) {
    return (
        <div className="prop_row">
            <div className="prop_row_label">
                <span>{label}</span>
                {hint && <span className="prop_row_hint">{hint}</span>}
            </div>
            <div className="prop_row_control">{children}</div>
        </div>
    );
}

/* ── main component ──────────────────────────────────────── */

export default function Property(props) {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
    const [text, setText] = useState("N/A");
    const [size, setSize] = useState(10);
    const [fontFamily, setFontFamily] = useState("Arial");
    const [LL, setLL] = useState("N/A");
    const [CC, setCC] = useState("N/A");
    const [CR, setCR] = useState("N/A");
    const [lineWidth, setLineWidth] = useState(5);
    const nodeRef = React.useRef(null);
    const textRef = React.createRef();

    const { CurrentState, closeProperty: closeProperty } = props;

    const handleCloseToolMenu = () => props.closeProperty();

    const setPickedColor = (co) => {
        setColor(co);
        store.dispatch(changeColor(co));
    };

    const handleSubscribeProperty = (msg, data) => {
        if (msg === 'pointProperty') setLL(data.LL);
        else if (msg === 'circleProperty') { setCC(data.CC); setCR(data.CR); }
    };

    useEffect(() => {
        PubSub.subscribe('pointProperty', handleSubscribeProperty);
        PubSub.subscribe('circleProperty', handleSubscribeProperty);
        return () => {
            PubSub.unsubscribe('pointProperty');
            PubSub.unsubscribe('circleProperty');
        };
    }, []);

    const handleTextChange = () => {
        setText(textRef.current.children[0].value);
        store.dispatch(changeText(textRef.current.children[0].value));
    };

    const handleSizeChange = (event) => {
        const val = event.target.value === 200 ? 400 : event.target.value;
        setSize(val);
        store.dispatch(changeFontSize(val));
    };

    const handleFontFamilyChange = (event) => {
        store.dispatch(changeFamily(event.target.value));
        setFontFamily(event.target.value);
    };

    const handleLineWidthChange = (event) => {
        store.dispatch(changeLineWidth(event.target.value));
        setLineWidth(event.target.value);
    };

    const fontFamilyOptions = [
        "Arial", "Verdana", "Arial Black", "Trebuchet MS", "Impact",
        "Times New Roman", "Georgia", "American Typewriter", "Monaco",
        "Bradley Hand", "Luminari",
    ];

    /* ── simple panels (point / circle / polygon / rectangle / lines) ── */

    const colorRow = (
        <PropRow label="Color">
            <ColorPicker
                setDisplayColorPicker={setDisplayColorPicker}
                setPickedColor={setPickedColor}
                displayColorPicker={displayColorPicker}
                color={color}
            />
        </PropRow>
    );

    const pointPanel = (
        <div id="largeProperty" ref={nodeRef}>
            <PropHeader title="Point" onClose={handleCloseToolMenu} />
            <PropRow label="Coordinates">
                <span className="prop_value">
                    {LL === "N/A" ? "Click the map to place a point" : `${LL.lng.toFixed(5)}, ${LL.lat.toFixed(5)}`}
                </span>
            </PropRow>
        </div>
    );

    const circlePanel = (
        <div id="largeProperty" ref={nodeRef}>
            <PropHeader title="Circle" onClose={handleCloseToolMenu} />
            <PropRow label="Center">
                <span className="prop_value">
                    {CC === "N/A" ? "Not chosen" : `${CC.lng.toFixed(3)} / ${CC.lat.toFixed(3)}`}
                </span>
            </PropRow>
            <PropRow label="Radius">
                <span className="prop_value">{CR === "N/A" ? "Not chosen" : CR.toFixed(3)}</span>
            </PropRow>
            {colorRow}
        </div>
    );

    const polygonPanel = (
        <div id="largeProperty" ref={nodeRef}>
            <PropHeader title="Polygon" onClose={handleCloseToolMenu} />
            <PropRow label="Info"><span className="prop_value">Click map to draw vertices</span></PropRow>
            {colorRow}
        </div>
    );

    const rectanglePanel = (
        <div id="largeProperty" ref={nodeRef}>
            <PropHeader title="Rectangle" onClose={handleCloseToolMenu} />
            <PropRow label="Info"><span className="prop_value">Click and drag to draw</span></PropRow>
            {colorRow}
        </div>
    );

    const linesPanel = (
        <div id="largeProperty" ref={nodeRef}>
            <PropHeader title="Lines" onClose={handleCloseToolMenu} />
            <PropRow label="Info"><span className="prop_value">Click map to draw line segments</span></PropRow>
            {colorRow}
        </div>
    );

    /* ── text panel ─────────────────────────────────────────── */

    const textPanel = (
        <div id="largeProperty" ref={nodeRef}>
            <PropHeader title="Text" onClose={handleCloseToolMenu} />

            <PropRow label="Text">
                <Input
                    placeholder="Your text here"
                    inputProps={ariaLabel}
                    ref={textRef}
                    onChange={handleTextChange}
                    id="text"
                    sx={{ width: '140px' }}
                />
            </PropRow>

            <PropRow
                label="Font Size"
                hint="Higher zoom level → larger value"
            >
                <Slider
                    value={size}
                    onChange={handleSizeChange}
                    size="small"
                    defaultValue={10}
                    aria-label="Font size"
                    valueLabelDisplay="auto"
                    min={0.5}
                    max={200}
                    sx={{ width: '120px', color: '#3e7f9f' }}
                />
            </PropRow>

            <PropRow label="Font Family">
                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel id="ff-label">Family</InputLabel>
                    <Select
                        labelId="ff-label"
                        value={fontFamily}
                        label="Family"
                        onChange={handleFontFamilyChange}
                    >
                        {fontFamilyOptions.map(f => (
                            <MenuItem key={f} value={f}>{f}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </PropRow>

            <PropRow label="Color">
                <ColorPicker
                    setDisplayColorPicker={setDisplayColorPicker}
                    setPickedColor={setPickedColor}
                    displayColorPicker={displayColorPicker}
                    color={color}
                />
            </PropRow>
        </div>
    );

    /* ── paint panel ────────────────────────────────────────── */

    const paintPanel = (
        <div id="largeProperty" ref={nodeRef}>
            <PropHeader title="Paint" onClose={handleCloseToolMenu} />

            <PropRow
                label="Pen Size"
                hint="Higher zoom level → larger value"
            >
                <Slider
                    value={lineWidth}
                    onChange={handleLineWidthChange}
                    size="small"
                    defaultValue={5}
                    aria-label="Pen size"
                    valueLabelDisplay="auto"
                    min={1}
                    max={20}
                    sx={{ width: '120px', color: '#3e7f9f' }}
                />
            </PropRow>

            <PropRow label="Color">
                <ColorPicker
                    setDisplayColorPicker={setDisplayColorPicker}
                    setPickedColor={setPickedColor}
                    displayColorPicker={displayColorPicker}
                    color={color}
                />
            </PropRow>

            <div className="prop_action_row">
                <IconButton onClick={canvasUndo} title="Undo" size="small">
                    <UndoIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={canvasRedo} title="Redo" size="small">
                    <RedoIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={resetCanvas} title="Clear canvas" size="small">
                    <DeleteOutlineIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
    );

    /* ── switch ──────────────────────────────────────────────── */

    const panelMap = {
        point:     pointPanel,
        circle:    circlePanel,
        polygon:   polygonPanel,
        rectangle: rectanglePanel,
        lines:     linesPanel,
        inputtext: textPanel,
        paint:     paintPanel,
    };

    const panel = panelMap[CurrentState];
    if (!panel) return ReactDOM.createPortal(<div />, document.body);

    return ReactDOM.createPortal(
        <Draggable nodeRef={nodeRef} handle="#firstLine">
            {panel}
        </Draggable>,
        document.body
    );
}
