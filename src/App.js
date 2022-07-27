import logo from './logo.svg';
import './App.css';
import Navigation from "./Navigation";
import {render} from "react-dom";
import Map from "./OriginMap"
import React from "react";
import OriginMap from "./OriginMap";
import ReactDOM from 'react-dom';
import Footer from './Footer'


import Title from "./Title"
import NMenu from "./NMenu";

class App extends React.Component{
    state={
        isFull: false,
        OSMUrl: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    }

    fullScreenSwitch= ()=>{
        //console.log("切换全屏")
        var temp = this.state.isFull;
        //console.log(this.state.isFull);
        this.setState({isFull : !temp});
        //console.log(this.state.isFull);
    }
    changeProvider=()=>{

    }
     /*
     *
     * */
    render() {
        if(this.state.isFull== false){
            return (
                <div id="App">
                        <div id="Describe">
                            <Navigation  checkFull={this.fullScreenSwitch}
                                         isFull={this.state.isFull}
                                         changeProvider={this.changeProvider}
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
                        <OriginMap/>
                    </div>

                    <div id="endMenu">
                        <Footer/>
                    </div>
                </div>
            );
        }

    }
}

export default App;
