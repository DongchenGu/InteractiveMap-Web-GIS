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
            PubSub.publish('property',{'LL':this.getLatLng()});
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
    console.log(pointStack);
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


function handleSubscribeTool(msg,data) {
    console.log(msg)
    if(msg==="point"){
        mymap.once('click',pointClick);
    }else if(msg==="circle"){
        console.log(msg);
    }else if(msg==="deleteItems"){
        //一个功能按键要能删除所有内容
        //mymap.on('click',pointClick);
    }
}






  function OriginMap(props) {
    //it's used to shut down the listener of the previous event
    let previousState = null;
    const {OSMUrl, CurrentState,IsFull} = props;
    if(CurrentState==="intoFullScreen"){
        mymap.invalidateSize(true);
    }

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
            console.log("点击了圆形tool");
            console.log(pointStack);
        } else if (CurrentState === "deleteItems") {
            console.log("点击了删除选项");
        }
    });


    return (
        <div id="originMap" className="originMap"></div>
    );
}

export  {mymap,OriginMap};
