import React from "react";
import "./Title.css"

export  default  class Title extends React.Component{

    render() {
        return(
            <div id="title">
                <h1 id="h1">Interactive Map<sup><span id="span1">PRO</span></sup></h1>
                <div id="h3">web-based map to create and mark your events on the map using our tools,
                    including regular points, lines, outlines, and text</div>
            </div>
        )
    }
}