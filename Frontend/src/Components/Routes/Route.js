import React from "react";
import App from'../APP/App.jsx'
import Auth from "../Auth/Auth";
import { Navigate } from "react-router-dom"


export  default [
    {
        path:'/home',
        element: <App/>
    },
    {
        path:'/auth',
        element: <Auth/>
    },
    {
        path:'/',
        element: <Navigate to="/home"/>
    }
]