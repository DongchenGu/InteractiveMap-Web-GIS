import './App.css';
import Navigation from "../Navigation/Navigation";
import OriginMap from "../OriginMap/OriginMap"
import React, {useEffect, useState} from "react";
import Footer from '../Footer/Footer'
import MapProviderMenu from '../MapProviderMenu/MapProviderMenu'
import SideMenu from '../SideMenu/SideMenu';
import CurrentStateDialog from '../CurrentStateDialog/CurrentStateDialog'
import Property from '../Property/Property'
import Tips from "../Tips/Tips";
import Canvas from "../Canvas/Canvas.js"
import Title from "../Title/Title"
import store from "../Store";
import {setWaitingFlag, user_email, user_password, user_name, user_token} from "../Store/actionCreater";
import PubSub from "pubsub-js";

let currentUser = null;
let token = null;

export default function App() {
    const manageFull = React.createRef();
    const [IsFull, setIsFull] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [OSMUrl, setOSMUrl] = useState("https://tile.openstreetmap.org/{z}/{x}/{y}.png");
    const [MapProviderMenuOpen, setMapProviderMenuOpen] = useState(false);
    const [CurrentStateDialogOpen, setCurrentStateDialogOpen] = useState(false);
    const [CurrentState, setCurrentState] = useState("outFullScreen");
    const [PropertyOpen, setPropertyOpen] = useState(true);
    const [TipsOpen, setTipsOpen] = useState(false);

    // sync sidebar state from redux
    useEffect(() => {
        const unsub = store.subscribe(() => {
            setSidebarOpen(store.getState().sidebar_open);
        });
        return () => unsub();
    }, []);

    const getCoord = (coord) => {};

    let stateTimer = null;

    const fullScreenSwitch = () => {
        var temp = IsFull;
        setIsFull(!temp);
        if (temp === false) {
            setCurrentStateDialogOpen(!temp);
            setCurrentState("intoFullScreen");
        }
        if (temp === true) {
            setCurrentStateDialogOpen(!temp);
            setCurrentState("outFullScreen");
        }
    };

    const changeProvider = (OSMUrlValue) => { setOSMUrl(OSMUrlValue); };
    const openProviderMenu = () => { setMapProviderMenuOpen(true); };
    const closeProviderMenu = () => { setMapProviderMenuOpen(false); };
    const openProperty = () => { setPropertyOpen(true); };
    const closeProperty = () => {
        setPropertyOpen(false);
        setCurrentState("IN/OUT/FullScreen");
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
    const openTips = () => { setTipsOpen(true); };
    const closeTips = () => {
        setTipsOpen(false);
        PubSub.publish("inputtext", 'xxxx');
    };
    const setTimerToCloseDialog = () => {
        stateTimer = setTimeout(() => { stateTimer = null; closeStateDialog(); }, "8000");
    };
    const clearTimerAboutStateDialog = () => {
        if (stateTimer !== null) {
            clearTimeout(stateTimer);
            closeStateDialog();
            stateTimer = null;
        }
    };

    let MapProvider = null;
    let CurrentStateDialogComponent = null;
    let PropertyDialog = null;
    let TipsDialog = null;
    let CanvasDialog = null;

    if (MapProviderMenuOpen === true) {
        MapProvider = <MapProviderMenu changeProvider={changeProvider} closeProviderMenu={closeProviderMenu} />;
    }
    if (CurrentStateDialogOpen === true) {
        CurrentStateDialogComponent = <CurrentStateDialog CurrentState={CurrentState} />;
    }
    if (PropertyOpen === true) {
        PropertyDialog = <Property CurrentState={CurrentState} closeProperty={closeProperty} />;
    }
    if (TipsOpen === true) {
        TipsDialog = <Tips CurrentState={CurrentState} closeTips={closeTips} />;
    }
    if (CurrentState === "paint") {
        CanvasDialog = <Canvas />;
    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            currentUser = JSON.parse(localStorage.getItem("user"));
            token = localStorage.getItem("user_token");
            store.dispatch(user_email(currentUser.email));
            store.dispatch(user_password(null));
            store.dispatch(user_name(currentUser.username));
            if (store.getState().user_token == null) {
                store.dispatch(user_token(token));
            }
        }
        setTimeout(() => { store.dispatch(setWaitingFlag(false)); }, 2000);
    }, []);

    return (
        <div id="App_root">
            {/* Left panel: sidebar — takes real space when open */}
            <div id="App_sidebar" className={sidebarOpen ? 'sidebar_open' : 'sidebar_closed'}>
                <SideMenu CurrentState={CurrentState} changeCurrentState={changeCurrentState} />
            </div>

            {/* Right panel: all content */}
            <div id="App_main">
                {MapProvider}
                {PropertyDialog}
                {TipsDialog}
                {CanvasDialog}

                <Navigation
                    checkFull={fullScreenSwitch}
                    IsFull={IsFull}
                    openProviderMenu={openProviderMenu}
                    openProperty={openProperty}
                    getCoord={getCoord}
                />

                {IsFull === false ?
                    <div id="Describe">
                        <Title />
                    </div> : null}

                {IsFull === false ?
                    <div id="stateDialog">
                        {CurrentStateDialogComponent}
                    </div> : null}

                <div id={IsFull === false ? "canvas" : "fullScreenMap"} ref={manageFull}>
                    <OriginMap OSMUrl={OSMUrl} CurrentState={CurrentState} IsFull={IsFull} />
                </div>

                <Footer />
            </div>
        </div>
    );
}
