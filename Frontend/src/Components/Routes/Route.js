import React from "react";
import App from '../APP/App.jsx'
import Auth from "../Auth/Auth";
import { Navigate } from "react-router-dom"
import MainProfile from "../UserProfile/MainProfile"
import Landing from "../Landing/Landing"

const routes = [
    {
        path: '/',
        element: <Landing />
    },
    {
        path: '/workspace/:workspaceId',
        element: <App />
    },
    {
        path: '/auth',
        element: <Auth />
    },
    {
        path: '/home',
        element: <Navigate to="/" />
    },
    {
        path: '/mainProfile',
        element: <MainProfile />
    }
];

export default routes;
