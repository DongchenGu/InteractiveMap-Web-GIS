import './App.css';
import Navigation from "../Navigation/Navigation";
import OriginMap from "../OriginMap/OriginMap"
import React, { useEffect, useState } from "react";
import Footer from '../Footer/Footer'
import MapProviderMenu from '../MapProviderMenu/MapProviderMenu'
import SideMenu from '../SideMenu/SideMenu';
import CurrentStateDialog from '../CurrentStateDialog/CurrentStateDialog'
import Property from '../Property/Property'
import Tips from "../Tips/Tips";
import Canvas from "../Canvas/Canvas.js"
import store from "../Store";
import { setWaitingFlag, user_email, user_password, user_name, user_token } from "../Store/actionCreater";
import PubSub from "pubsub-js";
import { useParams } from 'react-router-dom';

let currentUser = null;
let token = null;

export default function App() {
    const { workspaceId } = useParams();
    const manageFull = React.createRef();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [OSMUrl, setOSMUrl] = useState("https://tile.openstreetmap.org/{z}/{x}/{y}.png");
    const [MapProviderMenuOpen, setMapProviderMenuOpen] = useState(false);
    const [CurrentStateDialogOpen, setCurrentStateDialogOpen] = useState(false);
    const [CurrentState, setCurrentState] = useState("idle");
    const [PropertyOpen, setPropertyOpen] = useState(false);
    const [TipsOpen, setTipsOpen] = useState(false);

    useEffect(() => {
        const unsub = store.subscribe(() => {
            setSidebarOpen(store.getState().sidebar_open);
        });
        return () => unsub();
    }, []);

    const getCoord = (coord) => {};
    let stateTimer = null;

    const changeProvider = (OSMUrlValue) => { setOSMUrl(OSMUrlValue); };
    const openProviderMenu = () => { setMapProviderMenuOpen(true); };
    const closeProviderMenu = () => { setMapProviderMenuOpen(false); };
    const openProperty = () => { setPropertyOpen(true); };
    const closeProperty = () => {
        setPropertyOpen(false);
        setCurrentState("idle");
    };
    const changeCurrentState = (stateValue) => {
        if (stateValue === "inputtext") {
            setCurrentState(stateValue);
            setCurrentStateDialogOpen(true);
            setTipsOpen(true);
            openProperty();
        } else {
            setCurrentState(stateValue);
            setCurrentStateDialogOpen(true);
            openProperty();
        }
    };
    const closeStateDialog = () => { setCurrentStateDialogOpen(false); };
    const closeTips = () => {
        setTipsOpen(false);
        PubSub.publish("inputtext", 'xxxx');
    };

    let MapProvider = null;
    let CurrentStateDialogComponent = null;
    let PropertyDialog = null;
    let TipsDialog = null;
    let CanvasDialog = null;

    if (MapProviderMenuOpen) MapProvider = <MapProviderMenu changeProvider={changeProvider} closeProviderMenu={closeProviderMenu} />;
    if (CurrentStateDialogOpen) CurrentStateDialogComponent = <CurrentStateDialog CurrentState={CurrentState} />;
    if (PropertyOpen) PropertyDialog = <Property CurrentState={CurrentState} closeProperty={closeProperty} />;
    if (TipsOpen) TipsDialog = <Tips CurrentState={CurrentState} closeTips={closeTips} />;
    if (CurrentState === "paint") CanvasDialog = <Canvas />;

    useEffect(() => {
        if (localStorage.getItem("user")) {
            currentUser = JSON.parse(localStorage.getItem("user"));
            token = localStorage.getItem("user_token");
            store.dispatch(user_email(currentUser.email));
            store.dispatch(user_password(null));
            store.dispatch(user_name(currentUser.username));
            if (store.getState().user_token == null) store.dispatch(user_token(token));
        }
        setTimeout(() => { store.dispatch(setWaitingFlag(false)); }, 2000);
    }, []);

    return (
        <div id="App_root">
            {/* Sidebar panel — takes real layout space when open */}
            <div id="App_sidebar" className={sidebarOpen ? 'sidebar_open' : 'sidebar_closed'}>
                <SideMenu CurrentState={CurrentState} changeCurrentState={changeCurrentState} />
            </div>

            {/* Right panel: nav + map + footer, fills viewport exactly */}
            <div id="App_main">
                {MapProvider}
                {PropertyDialog}
                {TipsDialog}
                {CanvasDialog}

                {/* Sticky navbar */}
                <Navigation
                    checkFull={() => {}}
                    IsFull={false}
                    openProviderMenu={openProviderMenu}
                    openProperty={openProperty}
                    getCoord={getCoord}
                />

                {/* State dialog — floating */}
                {CurrentStateDialogComponent &&
                    <div id="stateDialog">{CurrentStateDialogComponent}</div>
                }

                {/* Map fills all remaining space */}
                <div id="mapFill" ref={manageFull}>
                    <OriginMap OSMUrl={OSMUrl} CurrentState={CurrentState} IsFull={false} />
                </div>

                {/* Footer — always visible at bottom */}
                <Footer />
            </div>
        </div>
    );
}
