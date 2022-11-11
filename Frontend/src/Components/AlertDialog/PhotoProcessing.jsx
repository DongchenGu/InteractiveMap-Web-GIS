
import React, { Component } from 'react';
import { createPortal } from 'react-dom'
import "./PhotoProcessing.css"
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';



export default function  PhotoProcessing(props){
    const { hidePhotoProcessing} = props;
    const dom = window.document;
    const node = dom.createElement("div")
    node.setAttribute("id", "PhotoDialogPoint") //this.node.id = "account"
    dom.body.appendChild(node);

    //阻止滚轮的滚动事件
    var scrollFunction = function(e) {
        e = e || window.event;
        e.preventDefault && e.preventDefault(); //禁止浏览器默认事件
    }
    //给页面绑定滑轮滚动事件
    if (document.addEventListener) { //firefox
        document.addEventListener('DOMMouseScroll', scrollFunction, false);
    }
    //滚动滑轮触发scrollFunction方法  //ie 谷歌
    window.addEventListener('mousewheel', scrollFunction, {
        passive: false
    });



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
            </div>
        </div>
        ,node
    );

}