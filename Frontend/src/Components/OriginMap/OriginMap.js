import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React from "react";
import './OriginMap.css'
import {useSelector} from "react-redux";


// const position = [51.505, -0.09]

// const coord = useSelector(state => state.navi.coord)

class  OriginMap  extends React.Component{
    mymap = null;



    componentDidMount() {
        // console.log(this.props.coord)
        const {OSMUrl} =this.props;
        this.mymap = L.map("originMap").setView([51.505, -0.09], 12);
        L.tileLayer(OSMUrl).addTo(this.mymap);

        /**

        // 使用 leaflet-color-markers ( https://github.com/pointhi/leaflet-color-markers ) 當作 marker
        const greenIcon = new L.Icon({
            iconUrl:
                "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
            shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        const marker = L.marker([25.03418, 121.564517], { icon: greenIcon }).addTo(
            mymap
        );

        marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

        L.circle([25.03418, 121.564517], {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 10
        }).addTo(mymap);*/
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {OSMUrl, coord} = this.props;
        console.log(coord);
        L.tileLayer(OSMUrl).addTo(this.mymap);
        this.mymap.setView(coord, 12);
    }

    render() {
        return(
            <div  id="originMap"></div>
        );
    }
}

export default OriginMap;