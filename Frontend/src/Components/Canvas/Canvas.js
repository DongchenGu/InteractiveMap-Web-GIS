import "./Canvas.css"
import React, {useEffect, useState} from "react";
import * as PIXI from 'pixi.js';
import store from "../Store";




let im;
let canvas
let context
let eraser
let brush
let reSetCanvas
let save
let activeColor;
let changeFlag = false;

let eraserEnabled = false;
let activeBgColor = '#fff';
let ifPop = false;
let lWidth = 2;
let opacity = 1;
let strokeColor = 'rgba(0,0,0,1)';
let radius = 5;


//translate color from rgba to hex
const toHex = (n: number) => `${n > 15 ? '' : 0}${n.toString(16)}`;
function  getHexColor(colorObj) {
    const { r, g, b, a = 1 } = colorObj;
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${a === 1 ? '' : toHex(Math.floor(a * 255))}`;
}


// undo and redo
let canvasHistory = [];
let step = -1;


// reset canvas bgColor
function setCanvasBg(color) {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}


function autoSetSize(){
    canvasSetSize();
    function canvasSetSize(){
        // 把变化之前的画布内容copy一份，然后重新画到画布上
        let imgData = context.getImageData(0,0,canvas.width,canvas.height);
        let pageWidth = document.documentElement.clientWidth;
        let pageHeight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHeight;
        context.putImageData(imgData,0,0);
    }

    window.onresize = function(){
        canvasSetSize();
    }
}
function listenToUser() {
    // 定义一个变量初始化画笔状态
    let painting = false;
    // 记录画笔最后一次的位置
    let lastPoint = {x: undefined, y: undefined};

    if(document.body.ontouchstart !== undefined){
        canvas.ontouchstart = function (e) {
            getColor();
            getLinWidth();
            painting = true;
            let x1 = e.touches[0].clientX;
            let y1 = e.touches[0].clientY;
            if(eraserEnabled){//要使用eraser
                context.save();
                context.globalCompositeOperation = "destination-out";
                context.beginPath();
                radius = (lWidth/2) > 5? (lWidth/2) : 5;
                context.arc(x1,y1,radius,0,2*Math.PI);
                context.clip();
                context.clearRect(0,0,canvas.width,canvas.height);
                context.restore();
                lastPoint = {'x': x1,'y': y1}
            }else{
                lastPoint = {'x': x1,'y': y1}
            }
        };
        canvas.ontouchmove = function (e) {
            let x1 = lastPoint['x'];
            let y1 = lastPoint['y'];
            let x2 = e.touches[0].clientX;
            let y2 = e.touches[0].clientY;
            if(!painting){return}
            if(eraserEnabled){
                moveHandler(x1,y1,x2,y2);
                //记录最后坐标
                lastPoint['x'] = x2;
                lastPoint['y'] = y2;
            }else{
                let newPoint = {'x': x2,'y': y2};
                drawLine(lastPoint.x, lastPoint.y,newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        };

        canvas.ontouchend = function () {
            painting = false;
            canvasDraw();
        }
    }else{
        // mousedown
        canvas.onmousedown = function(e){
            getColor();
            getLinWidth();
            painting = true;
            let x1 = e.clientX;
            let y1 = e.clientY;
            if(eraserEnabled){//要使用eraser
                //鼠标第一次点下的时候擦除一个圆形区域，同时记录第一个坐标点
                context.save();
                context.globalCompositeOperation = "destination-out";
                context.beginPath();
                radius = (lWidth/2) > 5? (lWidth/2) : 5;
                context.arc(x1,y1,radius,0,2*Math.PI);
                context.clip();
                context.clearRect(0,0,canvas.width,canvas.height);
                context.restore();
                lastPoint = {'x': x1,'y': y1}
            }else{
                lastPoint = {'x': x1,'y': y1}
            }
        }

        // mouseMove
        canvas.onmousemove = function(e){
            let x1 = lastPoint['x'];
            let y1 = lastPoint['y'];
            let x2 = e.clientX;
            let y2 = e.clientY;
            if(!painting){return}
            if(eraserEnabled){
                moveHandler(x1,y1,x2,y2);
                //记录最后坐标
                lastPoint['x'] = x2;
                lastPoint['y'] = y2;
            }else{
                let newPoint = {'x': x2,'y': y2};
                drawLine(lastPoint.x, lastPoint.y,newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }

        // mouseUp
        canvas.onmouseup = function(){
            painting = false;
            canvasDraw();
        }
    }



}
function moveHandler(x1,y1,x2,y2){
    //获取两个点之间的剪辑区域四个端点
    var asin = radius*Math.sin(Math.atan((y2-y1)/(x2-x1)));
    var acos = radius*Math.cos(Math.atan((y2-y1)/(x2-x1)))
    var x3 = x1+asin;
    var y3 = y1-acos;
    var x4 = x1-asin;
    var y4 = y1+acos;
    var x5 = x2+asin;
    var y5 = y2-acos;
    var x6 = x2-asin;
    var y6 = y2+acos;

    //保证线条的连贯，所以在矩形一端画圆
    context.save()
    context.beginPath()
    context.globalCompositeOperation = "destination-out";
    radius = (lWidth/2) > 5? (lWidth/2) : 5;
    context.arc(x2,y2,radius,0,2*Math.PI);
    context.clip()
    context.clearRect(0,0,canvas.width,canvas.height);
    context.restore();

    //清除矩形剪辑区域里的像素
    context.save()
    context.beginPath()
    context.globalCompositeOperation = "destination-out";
    context.moveTo(x3,y3);
    context.lineTo(x5,y5);
    context.lineTo(x6,y6);
    context.lineTo(x4,y4);
    context.closePath();
    context.clip();
    context.clearRect(0,0,canvas.width,canvas.height);
    context.restore();
}
// 画线函数
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.lineWidth = lWidth;
    // 设置线条末端样式。
    context.lineCap = "round";
    // 设定线条与线条间接合处的样式
    context.lineJoin = "round";
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
}


// 绘制方法
function canvasDraw() {
    step++;
    if (step < canvasHistory.length) {
        canvasHistory.length = step;  // 截断数组
    }

    // 添加新的绘制到历史记录
    canvasHistory.push(canvas.toDataURL());

}
// 撤销方法
function canvasUndo(){
    if(step > 0){
        //console.log(canvasHistory);
        step--;

        let canvasPic = new Image();
        canvasPic.src = canvasHistory[step];
        canvasPic.onload = function () {
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(canvasPic, 0, 0); }
    }else{
        alert('No more withdraw!');
    }
}
// 重做方法
function canvasRedo(){
    if(step < canvasHistory.length - 1){
        step++;
        let canvasPic = new Image();
        canvasPic.src = canvasHistory[step];
        canvasPic.onload = function () {
            context.drawImage(canvasPic, 0, 0);
        }
    }else {
        alert('it\'s already the latest!');
    }
}

function resetCanvas(){
    context.clearRect(0,0,canvas.width,canvas.height);
    canvasHistory = [];
}



function getColor(){
                 activeColor = getHexColor(store.getState().color);
                context.fillStyle = activeColor;
                context.strokeStyle = activeColor;

            ifPop = false;
}


//get Line width from redux
function getLinWidth(){
    lWidth= store.getState().lineWidth;
}

export default function Canvas(){
    useEffect(()=>{
        canvas = document.getElementById('largeCanvas');
        context = canvas.getContext('2d');
        autoSetSize();
        listenToUser()


    })

    useEffect(()=>{

    },[])


    return(
        <canvas id="largeCanvas" >

        </canvas>

    )
}
export {canvasUndo,canvasRedo,resetCanvas};