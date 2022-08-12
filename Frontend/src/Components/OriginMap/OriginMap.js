import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React from "react";
import './OriginMap.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const position = [51.505, -0.09]

//global variables to store the data
let mymap = null;
let pointStack=[];
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

function pointClick(ev) {
    var name ="point"+(pointStack.length+1);
    L.marker(ev.latlng,{icon:point}).addTo(mymap);
    pointStack.push(ev.latlng);
    //alert(ev.latlng); // ev 是一个事件对象（本例中是 MouseEvent ）
}



class  OriginMap  extends React.Component{
    //it's used to shut down the listener of the previous event
    previousState= null;



    componentDidMount() {
        const{OSMUrl,CurrentState} = this.props;
        mymap = L.map("originMap").setView([45.4131, -75.7026], 12);
        L.tileLayer(OSMUrl).addTo(mymap);
        if(pointStack.length>0){
             pointStack.map((obj)=>{
                 L.marker(obj,{icon:point}).addTo(mymap);
             })
            console.log(">0")
        }


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
        }
        this.previousState = CurrentState;
    }

    render() {

        return(
            <div  id="originMap"></div>
        );
    }
}

export default OriginMap;