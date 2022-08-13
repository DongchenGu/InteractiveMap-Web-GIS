import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/APP/App';
import RouterApp from "./RouterApp";
// var toolBarTag = false;
import {store} from "./redux/store"
import {Provider} from "react-redux";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterApp />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);



