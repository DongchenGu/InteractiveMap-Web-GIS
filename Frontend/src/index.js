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

// 这里为什么不能加入严格模式，还不是十分清楚
// const container = document.getElementById("root");
//
// const Root = ReactDOM.createRoot(container);
// Root.render(
//
//         <BrowserRouter>
//             <Provider store={store}>
//                 <RouterApp />
//             </Provider>
//         </BrowserRouter>
//
// );



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



