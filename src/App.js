import logo from './logo.svg';
import './App.css';
import Navigation from "./Navigation";
import {render} from "react-dom";
import Map from "./OriginMap"
import React from "react";
import OriginMap from "./OriginMap";
import ReactDOM from 'react-dom';
import Footer from './Footer'
import MapProviderMenu from './MapProviderMenu'
import ToolMenu from "./ToolMenu";



import Title from "./Title"
import NMenu from "./NMenu";

class App extends React.Component{
    state={
        isFull: false,
        OSMUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        MapMenu: false,
        ToolMenu: false,
    }

    fullScreenSwitch= ()=>{
        //console.log("切换全屏")
        var temp = this.state.isFull;
        //console.log(this.state.isFull);
        this.setState({isFull : !temp});
        //console.log(this.state.isFull);
    }
    changeProvider=(OSMUrlValue)=>{
       // this.setState({OSMUrl : OSMUrlValue});
            this.setState({OSMUrl : OSMUrlValue});
            console.log(OSMUrlValue);
    }
    openProviderMenu=()=>{
          this.setState({MapMenu: true});
    }
    closeProviderMenu=()=>{
        this.setState({MapMenu: false});
    }
    openToolMenu=()=>{
        console.log("hello");
        this.setState({ToolMenu: true});
    }
    closeToolMenu=()=>{
        this.setState({ToolMenu:false});
    }

    render() {
        let Index=null;
        let MapProvider =null;
        let Tool= null;
        if(this.state.MapMenu===true){
            MapProvider=<MapProviderMenu changeProvider={this.changeProvider} closeProviderMenu={this.closeProviderMenu}/>
        }
        if(this.state.ToolMenu===true){
            Tool=<ToolMenu  closeToolMenu={this.closeToolMenu}/>
        }



        if(this.state.isFull===false){
            Index = <div>
                            {Tool}
                            {MapProvider}
                            <div id="Describe">
                                <Navigation  checkFull={this.fullScreenSwitch}
                                             isFull={this.state.isFull}
                                             changeMapMenu={this.state.changeMapMenu}
                                             openProviderMenu={this.openProviderMenu}
                                             openToolMenu={this.openToolMenu}
                                />
                                <Title/>
                            </div>
                            <div id="canvas">
                                <div id="indexMap">
                                    <OriginMap OSMUrl={this.state.OSMUrl}/>
                                </div>
                            </div>
                    </div>
        }else{
            Index= <div>
                        <Navigation  checkFull={this.fullScreenSwitch}
                                     isFull={this.state.isFull}
                                     changeMapMenu={this.state.changeMapMenu}
                                     openProviderMenu={this.openProviderMenu}
                                     openToolMenu={this.openToolMenu}
                        />
                        <div id="fullScreenMap">
                            {Tool}
                            {MapProvider}
                            <OriginMap OSMUrl={this.state.OSMUrl}/>
                        </div>
                    </div>
        }

        return(
            <div id="App">
                {Index}
                <div id="endMenu">
                    <Footer/>
                </div>
            </div>
        )


    }
}

export default App;
