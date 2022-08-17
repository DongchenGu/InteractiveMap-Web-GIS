import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/APP/App';
import RouterApp from "./RouterApp";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

var toolBarTag = false;



ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <RouterApp />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
