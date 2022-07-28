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

import Title from "./Title"
import NMenu from "./NMenu";

class App extends React.Component{
    state={
        isFull: false,
        OSMUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        MapMenu: false,
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

     /*
     *  if(this.state.isFull=== false){
            return (
                <div id="App">
                    <MapProviderMenu changeProvider={this.changeProvider}/>


                        <div id="Describe">
                            <Navigation  checkFull={this.fullScreenSwitch}
                                         isFull={this.state.isFull}
                                         changeMapMenu={this.state.changeMapMenu}
                            />
                            <Title/>
                        </div>
                        <div id="canvas">
                            <div id="indexMap">
                                <OriginMap OSMUrl={this.state.OSMUrl}/>
                            </div>
                        </div>

                        <div id="endMenu">
                            <Footer/>
                        </div>
                </div>
            );
        }else{
            return (
                <div id="App">
                    <Navigation  checkFull={this.fullScreenSwitch} isFull={this.state.isFull} />
                    <div id="fullScreenMap">
                        <MapProviderMenu changeProvider={this.changeProvider}/>
                        <OriginMap OSMUrl={this.state.OSMUrl}/>
                    </div>

                    <div id="endMenu">
                        <Footer/>
                    </div>
                </div>
            );
        }
     * */
    render() {
        let Index=null;
        let MapMenu =null;
        if(this.state.MapMenu===true){
            MapMenu=<MapProviderMenu changeProvider={this.changeProvider}/>
        }



        if(this.state.isFull===false){
            Index = <div>
                            {MapMenu}
                            <div id="Describe">
                                <Navigation  checkFull={this.fullScreenSwitch}
                                             isFull={this.state.isFull}
                                             changeMapMenu={this.state.changeMapMenu}
                                             openProviderMenu={this.openProviderMenu}
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
                        />
                        <div id="fullScreenMap">
                            {MapMenu}
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
