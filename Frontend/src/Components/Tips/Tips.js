import React from 'react';
import ReactDOM from 'react-dom';
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Draggable from 'react-draggable';
import './Tips.css';

export default function Tips(props) {
    const { CurrentState, closeTips } = props;
    const nodeRef = React.useRef(null);

    if (CurrentState !== "inputtext") return null;

    const panel = (
        <div id="largeTipsPanel" ref={nodeRef}>
            <div id="tipsTitleBar">
                <div id="tipsTitleText">Text Tool — Quick Guide</div>
                <IconButton onClick={closeTips} size="small">
                    <ClearIcon fontSize="small" sx={{ color: 'rgba(198,219,224,0.8)' }} />
                </IconButton>
            </div>
            <div className="tipsSection">
                <div className="tipsStep">
                    <div className="tipsStepNum">1</div>
                    <div className="tipsStepText">Type your text in the <strong>Properties</strong> panel on the right.</div>
                </div>
                <div className="tipsStep">
                    <div className="tipsStepNum">2</div>
                    <div className="tipsStepText">Choose <strong>font size</strong>, <strong>font family</strong>, and <strong>color</strong>.</div>
                </div>
                <div className="tipsStep">
                    <div className="tipsStepNum">3</div>
                    <div className="tipsStepText">Click anywhere on the map to <strong>place</strong> the text.</div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        <Draggable nodeRef={nodeRef} handle="#tipsTitleBar">
            {panel}
        </Draggable>,
        document.body
    );
}
