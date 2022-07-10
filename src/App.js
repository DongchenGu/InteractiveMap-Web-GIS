import logo from './logo.svg';
import './App.css';
import Navigation from "./Navigation";
import {render} from "react-dom";
import Map from "./MyMap"
import React from "react";
import MyMap from "./MyMap";



function App() {


  return (

      <div id="App">
          <div id="Describe">
             <Navigation />
          </div>
          <div id="canvas">

          </div>
        <MyMap/>


      </div>
  );


}

export default App;
