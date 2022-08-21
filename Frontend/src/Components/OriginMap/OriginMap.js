import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React from "react";
import './OriginMap.css'

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
                    obj.pointToken.setIcon(point);
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
    pointStack.push({id:name,pointToken:pointToken});
    //console.log(pointStack);
    //alert(ev.latlng); // ev 是一个事件对象（本例中是 MouseEvent ）
}
//从pointStack中删除点
function deletePoint(id){
    pointStack.map((obj,index)=>{
        if(obj.pointToken.id===id){
            pointStack.splice(index,1);
        }
    });
}

//----------------------------------------------------------------used to draw circle
function drawCircle(){
    //console.log(store.getState().color);
    color =getHexColor(store.getState().color);
    let index = idCircle++;
    tempCircle = new L.circle();
    mymap.dragging.disable();//将mousemove事件移动地图禁用
    mymap.once('mousedown', (e)=>{
        //确定圆心
        circleI = e.latlng
        CirclePop=L.popup().setLatLng(e.latlng);
        mymap.addLayer(CirclePop);
        //监听鼠标移动事件
        mymap.on('mousemove', drawCircleOnMove);
        //监听鼠标弹起事件
        mymap.on('mouseup', drawCircleOnmouseUp);
        //save into the stack
        tempCircle.id = index;
        circleStack.push({id:index,circleToken:tempCircle});
        console.log(circleStack);
    });
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
                    obj.circleToken.setStyle({color: obj.circleToken.originColor});
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
    }else if(msg==="deleteItems"){
        //一个功能按键要能删除所有内容
        //mymap.on('click',pointClick);
    }
}


//--------------------------------------------------------------------------------------------------------------


//translate color from rgba to hex
const toHex = (n: number) => `${n > 15 ? '' : 0}${n.toString(16)}`;
function  getHexColor(colorObj) {
    const { r, g, b, a = 1 } = colorObj;
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${a === 1 ? '' : toHex(Math.floor(a * 255))}`;
}

//---------------------------------------------------------------------------used to draw

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

    mymap.on('click', onClick);    //click
    mymap.on('dblclick', onDoubleClick);
    mymap.on('mousemove', onMove)//双击

    function onClick(e) {
        points.push([e.latlng.lat, e.latlng.lng])
        lines.addLatLng(e.latlng)
        mymap.addLayer(tempLines)
        mymap.addLayer(lines)
        node=L.circle(e.latlng, { color: '#ff0000', fillColor: 'ff0000', fillOpacity: 1 }).setRadius(2);
        mymap.addLayer(node)
        geometry.push(node)
    }
    function onMove(e) {
        if (points.length > 0) {
            L.ls = [points[points.length - 1], [e.latlng.lat, e.latlng.lng], points[0]]
            tempLines.setLatLngs(L.ls)
            //mymap.addLayer(tempLines)
        }
    }
    function onDoubleClick(e) {
        mymap.removeLayer(tempLines);
        mymap.removeLayer(lines);

        polygonToken = L.polygon(points,{color: color});
        polygonToken.id = idPolygon++;
        polygonToken.color = color;

        mymap.addLayer(polygonToken);
        //console.log(polygonToken);
        polygonStack.push(polygonToken);
        //geometry.push(L.polygon(points).addTo(mymap))
        points = [];
        node=null;
        //把前面的点击事件都取消掉
        mymap.off('click', onClick);
        mymap.off('dblclick', onDoubleClick);
        mymap.off('mousemove', onMove)//双击地图
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
        //open listener for once
        if (CurrentState === "point") {
            if(BackFlag===false){
                mymap.once('click', pointClick);
            }else { BackFlag =false;}
        } else if (CurrentState === "circle") {
            if(BackFlag===false){
                drawCircle();
                console.log("点击了圆形tool");
            }else { BackFlag =false;}
        }else if(CurrentState === "polygon"){
            if(BackFlag===false){
                drawPolygon();
                console.log("点击了多边形工具");
            }else { BackFlag =false;}
        }else if (CurrentState === "deleteItems") {
            if(BackFlag===false){
                console.log("点击了删除选项");
            }else { BackFlag =false;}
        }
    });



    return (
        <div id="originMap" className="originMap"></div>
    );
}


