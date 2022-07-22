import logo from './logo.svg';
import './App.css';
import Navigation from "./Navigation";
import {render} from "react-dom";
import Map from "./MyMap"
import React from "react";
import MyMap from "./MyMap";
import ReactDOM from 'react-dom';

import Title from "./Title"

class App extends React.Component{
    state={
        isFull: false,
    }

    fullScreenSwitch= ()=>{
        //console.log("切换全屏")
        var temp = this.state.isFull;
        //console.log(this.state.isFull);
        this.setState({isFull : !temp});
        //console.log(this.state.isFull);
    }

    render() {
        if(this.state.isFull== false){
            return (
                <div id="App">
                    <div id="Describe">
                        <Navigation  checkFull={this.fullScreenSwitch} isFull={this.state.isFull} />
                        <Title/>
                    </div>
                    <div id="canvas">
                        <MyMap/>
                    </div>

                    <div id="endMenu">

                    </div>
                </div>
            );
        }else{
            return (
                <div id="App">
                    <Navigation  checkFull={this.fullScreenSwitch} isFull={this.state.isFull} />

                    <MyMap/>

                    <div id="endMenu">

                    </div>
                </div>
            );
        }

    }
}

export default App;
