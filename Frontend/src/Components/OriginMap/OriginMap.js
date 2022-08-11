import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React from "react";
import './OriginMap.css'

const position = [51.505, -0.09]

class  OriginMap  extends React.Component{

    constructor(props) {
        super(props);
        this.mymap=null;
    }


    handlePointTool = ()=>{
        console.log("已经调用到这个")
        this.mymap.on('click', function(ev) {
            alert(ev.latlng); // ev 是一个事件对象（本例中是 MouseEvent ）
        });
    }
    handleCircleTool = ()=>{
        console.log("已经调用到这个")
    };


    componentDidMount() {
        const{OSMUrl,CurrentState} = this.props;
        this.mymap = L.map("originMap").setView([45.4131, -75.7026], 12);
        L.tileLayer(OSMUrl).addTo(this.mymap);

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const{OSMUrl,CurrentState} = this.props;
        L.tileLayer(OSMUrl).addTo(this.mymap);
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