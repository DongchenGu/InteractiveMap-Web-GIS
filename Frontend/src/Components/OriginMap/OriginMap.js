import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React from "react";
import './OriginMap.css'
import * as PIXI from 'pixi.js';
import 'leaflet-pixi-overlay';
//import { pixiOverlay } from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import PubSub from 'pubsub-js'
import {icon} from "leaflet/dist/leaflet-src.esm";
import RedIcon from "../../images/marker-icon-2x-red.png"
import MarkerShadow from '../../images/marker-shadow.png'
import GreenIcon from '../../images/marker-icon-2x-green.png'
import {useEffect,useState} from "react";
import {useSelector} from "react-redux";

import store from "../Store";

//from redux
let color = null;


let CirclePop = null;
let tempCircle =null;
let circleI= null;
let radius = 0;
let circleStack =[];
let idCircle=0;
let focusedCircle=null;


let position = [45.2498, -76.0804];

let pointToken=null;
//global variables to store the data
let mymap = null;
let pointStack=[];
let focusedPoint=null;
let CurrentStateGlobal=null;
//给每一个Marker对象一个独立的id，方便进行查找
let idMarker =0;
//引入一个标记，标记从非全屏状态回来
let BackFlag = false;
let InitialFlag = true;

//this is the default pointMark image
let point = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

//for you to cstomize the mark image
var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [25, 41],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});
let greenIcon = new L.Icon({
    iconUrl: GreenIcon,
    shadowUrl: MarkerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
let redIcon = new L.Icon({
    iconUrl: RedIcon,
    shadowUrl: MarkerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

//---------------------------------------------------------------------used to draw point
function pointClick(ev) {
    let index= idMarker++;
    let name ="point"+index;
    pointToken=L.marker(ev.latlng,{icon:point}).addTo(mymap).on('click',function (ev){
        if(CurrentStateGlobal !=="deleteItems"){
            if(this.getLatLng()!==focusedPoint){
                pointStack.map((obj,index)=>{
                    obj.token.setIcon(point);
                })
                this.setIcon(redIcon);
            }
            PubSub.publish('pointProperty',{'LL':this.getLatLng()});
        }
        else{
            //要从pointStack中移出相应的点
            deletePoint(this.id);
            this.removeFrom(mymap);
        }
    });
    focusedPoint = pointToken;
    //强行向Marker对象中写入id，便于查找
    pointToken.id=index;
    pointStack.push({id:name,token:pointToken});
    //console.log(pointStack);
    //alert(ev.latlng); // ev 是一个事件对象（本例中是 MouseEvent ）
}
//从pointStack中删除点
function deletePoint(id){
    pointStack.map((obj,index)=>{
        if(obj.token.id===id){
            pointStack.splice(index,1);
        }
    });
}

//----------------------------------------------------------------used to draw circle
function drawCircle(){
    //console.log(store.getState().color);
    color =getHexColor(store.getState().color);

    tempCircle = new L.circle();
    mymap.dragging.disable();//将mousemove事件移动地图禁用
    mymap.once('mousedown', drawCircleOnMouseDown);
}

function drawCircleOnMouseDown(e){
    //确定圆心
    circleI = e.latlng
    CirclePop=L.popup().setLatLng(e.latlng);
    mymap.addLayer(CirclePop);
    //监听鼠标移动事件
    mymap.on('mousemove', drawCircleOnMove);
    //监听鼠标弹起事件
    mymap.on('mouseup', drawCircleOnmouseUp);
    let index = idCircle++;
    //save into the stack
    tempCircle.id = index;
    circleStack.push({id:index,token:tempCircle});
    //console.log(circleStack);
}

function drawCircleOnMove(e){
    radius = L.latLng(e.latlng).distanceTo(circleI);//计算半径
    if(radius<5000){
        if (circleI) {
            //绘制圆心位置与半径
            tempCircle.setLatLng(circleI)
            tempCircle.setRadius(radius)
            tempCircle.setStyle({ color: color,  fillOpacity: 0 })
            //tempCircle.addTo(mymap);
            mymap.addLayer(tempCircle);
        }
        //toFixed()方法用来保留两位小数（四舍五入）
        CirclePop.setContent("Radius of the circle is："+radius.toFixed(2)+"M");
    }else{
        radius=5000;
        if (circleI) {
            tempCircle.setLatLng(circleI)
            tempCircle.setRadius(radius)
            tempCircle.setStyle({ color: color,  fillOpacity: 0 })
            mymap.addLayer(tempCircle)
        }
        CirclePop.setContent("Radius of the circle is："+radius+"M");;
    }
}

function drawCircleOnmouseUp(){
    /* r = L.latLng(e.latlng).distanceTo(i); */
    mymap.removeLayer(CirclePop);
    //L.circle(circleI, { radius: radius, color: '#ff0000',  fillOpacity: 0 });
    mymap.addLayer(tempCircle);
    tempCircle.originColor=color;
    tempCircle.on('click',function (e){
        if(CurrentStateGlobal!== "deleteItems"){
            if(this.id !== focusedCircle){
                circleStack.map((obj)=>{
                    obj.token.setStyle({color: obj.token.originColor});
                })
                this.setStyle({color:'#ff0000'});
                focusedCircle =this.id;
                PubSub.publish('circleProperty',{'CC':this.getLatLng(),'CR':this.getRadius()});
            }
        }else{
                deleteCircle(this.id);
                this.removeFrom(mymap);
        }
    });
    mymap.dragging.enable();
    //focus on the circle
    //mymap.setView(circleI,13);

    circleI = null;
    radius = 0;
    //取消监听事件
    // mymap.off('mousedown');
    mymap.off('mouseup');
    mymap.off('mousemove');
}

function  deleteCircle(id){
    circleStack.map((obj,index)=>{
        if(obj.id===id){
            circleStack.splice(index,1);
        }
    });
}

//------------------------------------------------------------------------------
//用来分发pubsub的订阅消息
function handleSubscribeTool(msg,data) {
    console.log(msg)
    if(msg==="point"){
        mymap.once('click',pointClick);
    }else if(msg==="circle") {
        drawCircle();
    }else if(msg==="polygon") {
        drawPolygon();
    }else if(msg==="rectangle") {
        drawRectangle();
    }else if(msg==="inputtext") {

        drawText();
    }else if(msg==="deleteItems"){
        //一个功能按键要能删除所有内容
        //mymap.on('click',pointClick);
    }else if(msg==="deleteTextOneByOne"){
        deleteText();
    }
}


//--------------------------------------------------------------------------------------------------------------


//translate color from rgba to hex
const toHex = (n: number) => `${n > 15 ? '' : 0}${n.toString(16)}`;
function  getHexColor(colorObj) {
    const { r, g, b, a = 1 } = colorObj;
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${a === 1 ? '' : toHex(Math.floor(a * 255))}`;
}

//---------------------------------------------------------------------------used to draw Polygon

let points, geometry,lines,tempLines,node;
let polygonToken, polygonStack=[];
let idPolygon=0;
let focusedPolygon =null;
function drawPolygon(){
    if(tempLines){
        removePolygon();
    }
    color =getHexColor(store.getState().color);
    mymap.doubleClickZoom.disable();
    lines = new L.polyline([],{color:color});
    tempLines = new L.polyline([],{ dashArray: 5, color:color });
    points = [];
    geometry = [];

    mymap.on('click', drawPolygonOnClick);    //click
    mymap.on('dblclick', drawPolygonOnDoubleClick);
    mymap.on('mousemove', drawPolygonOnMove)

}

function drawPolygonOnClick(e) {
    points.push([e.latlng.lat, e.latlng.lng])
    lines.addLatLng(e.latlng)
    mymap.addLayer(tempLines)
    mymap.addLayer(lines)
    node=L.circle(e.latlng, { color: '#ff0000', fillColor: 'ff0000', fillOpacity: 1 }).setRadius(2);
    mymap.addLayer(node)
    geometry.push(node)
}
function drawPolygonOnMove(e) {
    if (points.length > 0) {
        L.ls = [points[points.length - 1], [e.latlng.lat, e.latlng.lng], points[0]]
        tempLines.setLatLngs(L.ls)
        //mymap.addLayer(tempLines)
    }
}
function drawPolygonOnDoubleClick(e) {
    mymap.removeLayer(tempLines);
    mymap.removeLayer(lines);


    polygonToken = L.polygon(points,{color: color});
    let index= idPolygon++;
    polygonToken.id = index;
    polygonToken.color = color;

    mymap.addLayer(polygonToken);
    //console.log(polygonToken);
    polygonStack.push({id:index, token:polygonToken});
    geometry.map((obj)=>{
        mymap.removeLayer(obj);
    });
    points = [];
    node=null;
    geometry=[];
    //把前面的点击事件都取消掉
    mymap.off('click', drawPolygonOnClick);
    mymap.off('dblclick', drawPolygonOnDoubleClick);
    mymap.off('mousemove', drawPolygonOnMove)//双击地图
    polygonToken.on('click',function (e){
        if(CurrentStateGlobal!== "deleteItems"){

        }else{
            this.removeFrom(mymap);
            deletePolygon(this.id);
        }
    })

    mymap.doubleClickZoom.enable();
    //isInPolygon(marker);
}

function removeCircle(){
     mymap.removeLayer(tempCircle);
 }
function removePolygon(){
    for(let ooo of geometry){
        ooo.remove();
    }
    //mymap.removeLayer(lines);
    //mymap.removeLayer(tempLines);
}

function  deletePolygon(id){
    polygonStack.map((obj,index)=>{
        if(obj.id ===id){
            polygonStack.splice(index,1);
        }
    })
}


//---------------------------------------------------------------------------used to draw rectangle

let rectangle,rectangleStack=[];
let idRectangle=0;
let tmprect=null ;
const latlngs=[]

function drawRectangle(){
    color =getHexColor(store.getState().color);
    mymap.dragging.disable();//将mousemove事件移动地图禁用
    mymap.once('mousedown', drawRectangleOnClick);    //点击地图
    mymap.once('mouseup',drawRectangleOnDoubleClick);


}

function drawRectangleOnClick(e) {
    // if (tmprect !==null){
    //     tmprect.remove();
    // }
    //左上角坐标
    latlngs[0]=[e.latlng.lat,e.latlng.lng]

    //开始绘制，监听鼠标移动事件
    mymap.on('mousemove',drawRectangleOnMove)

}
function drawRectangleOnMove(e) {
    latlngs[1]=[e.latlng.lat,e.latlng.lng]
    //删除临时矩形
    if ( tmprect!==null){
        mymap.removeLayer(tmprect);
    }
    //添加临时矩形
    //tmprect =mymap.addLayer( L.rectangle(latlngs,{dashArray:5 ,fillOpacity: 0}));
    tmprect = L.rectangle(latlngs,{dashArray:5,fillOpacity:0,color:color}).addTo(mymap);
    //tmprect=L.rectangle(latlngs,{dashArray:5,color:color}).addTo(mymap)
}


function drawRectangleOnDoubleClick(e)
{
    //矩形绘制完成，移除临时矩形，并停止监听鼠标移动事件
    tmprect.remove()
    mymap.off('mousemove')
    //右下角坐标
    latlngs[1]=[e.latlng.lat,e.latlng.lng]
    rectangle=L.rectangle(latlngs,{
        color:color,
        fillOpacity:0,
        weight:2
    })

    rectangle.addTo(mymap)
    //调整view范围
    tmprect=null;
    mymap.fitBounds(latlngs)
    //存入数组
    let index = idRectangle++;
    rectangle.id=index;
    rectangle.color = color;
    rectangleStack.push({id:index,token:rectangle});
    console.log(rectangleStack);

    rectangle.on('click',function (e){
        if(CurrentStateGlobal!=="deleteItems"){

        }else {
            deleteRectangle(this.id);
            this.remove();
        }
    });
    mymap.dragging.enable();
}
function  deleteRectangle(id){
    rectangleStack.map((obj,index)=>{
        if(obj.id===id){
            rectangleStack.splice(index,1)
        }
    })
}


//map.off(....) 关闭该事件

//----------------------------------------------------------------------used to draw a triangle




//----------------------------------------------------------------------used to draw text

let container = new PIXI.Container();
let Text;
let text
let pixiOverlay;

//let shape = new PIXI.Graphics();
let map
let zoom;
let fontSize =null;
let fontFamily= null;
let style=null;
let textStack = [];
let idText=0;
let drawTextOnClick;

drawTextOnClick=(e)=>{
    let LL = e.latlng;
    // let prevZoom;
    // let firstDraw = true;
    text = store.getState().text;
    fontSize = store.getState().fontSize;
    fontFamily = store.getState().fontFamily;
    color = getHexColor(store.getState().color);
    //console.log("FontSize"+store.getState().fontSize);
    // console.log(store.getState());
    style = new PIXI.TextStyle({
        fontFamily: 'Arial', // 字体
        fontSize: fontSize, // 字号大小
        fontStyle: 'italic', // 斜体
        fontWeight: 'bold', //粗体
        fill: color, // 填充颜色
        stroke: color, // 描边颜色
        strokeThickness: 1, // 描边宽度
        wordWrapWidth: 440, // 每行的长度
    });

    // {fontFamily: fontFamily}
    Text = new PIXI.Text(text,{fontFamily: fontFamily, fill: color,})
    container.addChild(Text)

    //Text.id = idText++;


    pixiOverlay = L.pixiOverlay((utils) => {
        map = utils.getMap()
        zoom = map.getZoom()
        const container = utils.getContainer()
        const renderer = utils.getRenderer()
        const project = utils.latLngToLayerPoint
        const scale = utils.getScale();
        //text.scale.set(1 / scale);
        //text.text = store.getState().text;
        Text.scale.set(fontSize)
        const coords = project([LL.lat.toFixed(5), LL.lng.toFixed(5)]) // 需要把经纬度转换为 canvas 上的坐标
        Text.x = coords.x;
        Text.sssssssssssssss= coords.x;
        Text.y = coords.y
        Text.resolution=20;
        // text.scale.set(1 / scale);
        //text.scale.set(1 / scale);
        //text.text = store.getState().text;
        //const scale =e.target.getZoom();
        // firstDraw = false;
        // prevZoom = zoom;
        renderer.render(container)
    }, container)

    let index = idText++
    Text.id = index;
    pixiOverlay.addTo(mymap);
    textStack.push({id:index, tokens:Text});
    console.log(textStack);
}

function drawText(){
    //text = store.getState().text;
    //console.log(text);
    mymap.once('click',drawTextOnClick );


    // mymap.on('zoomend', (e) => {
    //     //获取当前放大或者缩小的等级
    //     let scale = e.target.getZoom();
    //     pixiOverlay.redraw(container)
    // });
}


function deleteText(){

    let id = textStack.length-1;
    container.removeChild( textStack.pop().tokens);
    // textStack.map((obj,index)=>{
    //     if(obj.id===textStack.length-1){
    //         container.removeChild(obj.tokens);
    //         //textStack.splice(id,1);
    //         textStack.pop();
    //     }
    // })
    console.log("已经调用到了");
    console.log(textStack);
    //console.log(textStack);
}



//------------------------------------------------------------------clear ALL Listener
function clearAllToolListener(){
    //在每次状态更新的时候，必须清除之前未完成的绘图点击事件，否则会有多个点击事件叠加
    mymap.off('click', pointClick);
    mymap.off('mousedown', drawCircleOnMouseDown);

    mymap.off('click', drawPolygonOnClick);    //click
    mymap.off('dblclick', drawPolygonOnDoubleClick);
    mymap.off('mousemove', drawPolygonOnMove)

    mymap.off('mousedown', drawRectangleOnClick);    //点击地图
    mymap.off('mouseup',drawRectangleOnDoubleClick);

    mymap.off('click',drawTextOnClick);
}




//+++++++++++++++++++++++++++++++++++++++++++++++++++React Component++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  export  default function OriginMap(props) {


    const nav = useSelector(state => state.coord.coordinate)

      useEffect(()=>{
          console.log(nav)
      },[nav])


    //it's used to shut down the listener of the previous event
    let previousState = null;
    const {OSMUrl, CurrentState,IsFull,coord} = props;
    //自适应画面，防止白屏
    if(CurrentState==="intoFullScreen"){
        mymap.invalidateSize(true);
    }

    //从redux中拿到颜色，转换成hex
    //color =getHexColor(store.getState().color.toString.);
      //console.log(store.getState());

    //ComponentDidMount
    useEffect(() => {
        CurrentStateGlobal = CurrentState;
        mymap = L.map("originMap").setView(nav, 10);
        L.tileLayer(OSMUrl).addTo(mymap);
        // if(mymap ===null){
        //     mymap = L.map("originMap").setView(position, 12);
        //     L.tileLayer(OSMUrl).addTo(mymap);
        // }else{
        //     mymap = L.map("originMap").setView(position, 12);
        //     L.tileLayer(OSMUrl).addTo(mymap);
        //     if(pointStack.length>0){
        //         pointStack.map((obj)=>{
        //             L.marker(obj.pointToken.getLatLng(),{icon: obj.pointToken.getIcon()}).addTo(mymap);
        //         })
        //     }
        // }
        let token1 = PubSub.subscribe("point", handleSubscribeTool);
        let token2 = PubSub.subscribe("deleteItems", handleSubscribeTool);
        let token3 = PubSub.subscribe("circle", handleSubscribeTool);
        let token4 = PubSub.subscribe("polygon", handleSubscribeTool);
        let token5 = PubSub.subscribe("rectangle", handleSubscribeTool);
        let token6 = PubSub.subscribe("inputtext", handleSubscribeTool);
        let token7 = PubSub.subscribe("deleteTextOneByOne", handleSubscribeTool);

    }, []);


    //ComponentDidUpdate
    useEffect(() => {
        // console.log(coord);
        //mymap.setView(coord, 12);
        CurrentStateGlobal = CurrentState;

        mymap.setView(nav, 10);


        L.tileLayer(OSMUrl).addTo(mymap);
        mymap.invalidateSize(true);
        //这里当处于非全屏模式，并且绘制了内容的时候，将BackFlag置为TRUE，防止回到全屏模式下的-重新恢复之前的state的时候-自动绘图
        if(CurrentState === "outFullScreen"&& (pointStack.length>0||circleStack.length>0)){
            BackFlag =true;
            console.log("true了")
            console.log(mymap)
        }
        //open listener for once.
        //在每次状态更新的时候，必须清除之前未完成的绘图点击事件，否则会有多个点击事件叠加
        if (CurrentState === "point") {
            if(BackFlag===false){
                clearAllToolListener();
                mymap.once('click', pointClick);
            }else { BackFlag =false;}
        } else if (CurrentState === "circle") {
            if(BackFlag===false){
                clearAllToolListener();
                drawCircle();
                console.log("点击了圆形tool");
            }else { BackFlag =false;}
        }else if(CurrentState === "polygon"){
            if(BackFlag===false){
                clearAllToolListener();
                drawPolygon();
                console.log("点击了多边形工具");
            }else { BackFlag =false;}
        }else if(CurrentState === "rectangle"){
            if(BackFlag===false){
                clearAllToolListener();
                drawRectangle();
                console.log("点击了矩形工具");
            }else { BackFlag =false;}
        }else if(CurrentState === "inputtext"){
            if(BackFlag===false){
                clearAllToolListener();
                //mymap.off('click',drawTextOnClick);//这里需要先取消事件，因为tips的引入，导致关闭tips后会更新APP的state，导致drawText被调用两次
                drawText();
                console.log("点击了文字工具");
            }else { BackFlag =false;}
        } else if (CurrentState === "deleteItems") {
            if(BackFlag===false){
                clearAllToolListener();
                console.log("点击了删除选项");
            }else { BackFlag =false;}
        }
    });



    return (
        <div id="originMap" className="originMap"></div>
    );
}


