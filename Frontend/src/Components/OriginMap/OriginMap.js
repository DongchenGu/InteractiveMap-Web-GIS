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


let position = [51.505, -0.09]
let pointToken=null;
//global variables to store the data
let mymap = null;
let pointStack=[];
let focusedPoint=null;
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
    var name ="point"+(pointStack.length+1);
    pointToken=L.marker(ev.latlng,{icon:point}).addTo(mymap).on('click',function (ev){
        if(this.getLatLng()!==focusedPoint){
            pointStack.map((obj,index)=>{
                obj.pointToken.setIcon(point);
            })
            this.setIcon(redIcon);
        }
        PubSub.publish('property',{'LL':this.getLatLng()});
    });
    focusedPoint = pointToken;
    pointStack.push({id:name,pointToken:pointToken});
    console.log(pointStack);
    //alert(ev.latlng); // ev 是一个事件对象（本例中是 MouseEvent ）
}


function handleSubscribeTool(msg,data) {
    console.log(msg)
    if(msg==="point"){
        mymap.once('click',pointClick);
    }else if(msg==="circle"){
        console.log(msg);
    }else if(msg==="deleteItems"){

    }
}






class  OriginMap  extends React.Component{
    //it's used to shut down the listener of the previous event
    previousState= null;



    componentDidMount() {
        const{OSMUrl,CurrentState} = this.props;
        mymap = L.map("originMap").setView(position, 12);
        L.tileLayer(OSMUrl).addTo(mymap);
        if(pointStack.length>0){
             pointStack.map((obj)=>{
                 L.marker(obj.pointToken.getLatLng(),{icon: obj.pointToken.getIcon()}).addTo(mymap);
             })
            console.log(">0")
        }
        let token1 = PubSub.subscribe("point", handleSubscribeTool);
        let token2 = PubSub.subscribe("deleteItems", handleSubscribeTool);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const{OSMUrl,CurrentState} = this.props;
        L.tileLayer(OSMUrl).addTo(mymap);

        //open listener for once
        if(CurrentState ==="point"){
            mymap.once('click',pointClick);
        }else if(CurrentState ==="circle"){
            console.log("点击了圆形tool");
            console.log(pointStack);
        }else if(CurrentState ==="deleteItems"){
            console.log("点击了删除选项");
        }
    }

    render() {
        return(
            <div  id="originMap"></div>
        );
    }
}

export default OriginMap;