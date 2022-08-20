import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/APP/App';
import RouterApp from "./RouterApp";

import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
// var toolBarTag = false;
import {store} from "./redux/store"
import {Provider} from "react-redux";

var toolBarTag = false;




ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
        <Provider store={store}>
            <RouterApp />
        </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);



