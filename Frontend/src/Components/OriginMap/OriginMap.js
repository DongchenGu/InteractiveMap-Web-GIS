import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React from "react";
import './OriginMap.css'

const position = [51.505, -0.09]

let mymap = null;
var myimage = L.icon({
    iconUrl:'../images/point.png', //图片url
    iconSize:[12,12],     //设置图片大小 宽度50.高度100
    iconAnchor: [0,0] ,   //设置定位点的位置。默认为中心  例子中以左上角为定位参考。相当于relative
    popupAnchor:[50 ,0],   //设置警示框位置 ，以iconAnchor的值进行定位。相当于absolute 例子中的警示框定位到有、右上角。
});

class  OriginMap  extends React.Component{

     state={
            pointStack:[],
        }


    handlePointTool = ()=>{
        const {pointStack} = this.state;
        var temp=null;
        console.log("调用到这个PointTool")
        mymap.on('click', function(ev) {
            var name =pointStack.length+1;
            var marker = L.marker(ev.latlng,).addTo(mymap);
            //pointStack.push({[name]:temp});
            //alert(ev.latlng); // ev 是一个事件对象（本例中是 MouseEvent ）
        });

    }
    handleCircleTool = ()=>{
        console.log("已经调用到CircleTool");

    };


    componentDidMount() {
        const{OSMUrl,CurrentState} = this.props;
        mymap = L.map("originMap").setView([45.4131, -75.7026], 12);
        L.tileLayer(OSMUrl).addTo(mymap);

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const{OSMUrl,CurrentState} = this.props;
        L.tileLayer(OSMUrl).addTo(mymap);
        if(CurrentState ==="point"){
            this.handlePointTool();
        }else if(CurrentState ==="circle"){
            this.handleCircleTool();
        }
    }

    render() {

        return(
            <div  id="originMap"></div>
        );
    }
}

export default OriginMap;