import logo from './logo.svg';
import './App.css';
import Navigation from "./Navigation";
import {render} from "react-dom";
import Map from "./MyMap"
import React from "react";
import MyMap from "./MyMap";
import ReactDOM from 'react-dom';

import Title from "./Title"

function App() {


  return (

      <div id="App">
          <div id="Describe">
             <Navigation />
              <Title/>
          </div>
          <div id="canvas">

              <MyMap/>
          </div>



      </div>
  );


}

export default App;
