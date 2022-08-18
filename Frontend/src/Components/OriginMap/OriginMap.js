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
    console.log(store.getState().color);
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
        CirclePop.setContent("绘制圆半径为："+radius.toFixed(2)+"米");
    }else{
        radius=5000;
        if (circleI) {
            tempCircle.setLatLng(circleI)
            tempCircle.setRadius(radius)
            tempCircle.setStyle({ color: color,  fillOpacity: 0 })
            mymap.addLayer(tempCircle)
        }
        CirclePop.setContent("绘制圆半径为："+radius+"米");;
    }
}

function drawCircleOnmouseUp(){
    /* r = L.latLng(e.latlng).distanceTo(i); */
    mymap.removeLayer(CirclePop);
    //L.circle(circleI, { radius: radius, color: '#ff0000',  fillOpacity: 0 });
    mymap.addLayer(tempCircle);
    tempCircle.on('click',function (e){
        if(CurrentStateGlobal!== "deleteItems"){
            if(this.id !== focusedCircle){
                circleStack.map((obj)=>{
                    obj.circleToken.setStyle({color: '#000000'});
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
    } else if(msg==="deleteItems"){
        //一个功能按键要能删除所有内容
        //mymap.on('click',pointClick);
    }
}





//translate color from rgba to hex
const toHex = (n: number) => `${n > 15 ? '' : 0}${n.toString(16)}`;
function  getHexColor(colorObj) {
    const { r, g, b, a = 1 } = colorObj;
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${a === 1 ? '' : toHex(Math.floor(a * 255))}`;
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++React Component++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  function OriginMap(props) {
    //it's used to shut down the listener of the previous event
    let previousState = null;
    const {OSMUrl, CurrentState,IsFull} = props;
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
        mymap = L.map("originMap").setView(position, 10);
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
    }, []);


    //ComponentDidUpdate
    useEffect(() => {
        CurrentStateGlobal = CurrentState;

        L.tileLayer(OSMUrl).addTo(mymap);
        mymap.invalidateSize(true);
        //open listener for once
        if (CurrentState === "point") {
            mymap.once('click', pointClick);
        } else if (CurrentState === "circle") {
            drawCircle();
            console.log("点击了圆形tool");

        } else if (CurrentState === "deleteItems") {
            console.log("点击了删除选项");
        }
    });


    return (
        <div id="originMap" className="originMap"></div>
    );
}

export  {mymap,OriginMap};
