import './Navigation.css'
import React, { useEffect, useState } from 'react';
import NavigationIcon from '@mui/icons-material/Navigation';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import LogoutIcon from '@mui/icons-material/Logout';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AccountMenu from "../AccountMenu/AccountMenu";
import Search from "./Search/Search";
import { useNavigate } from "react-router-dom";
import { user_email, user_name, user_password, user_photo, user_token, setSidebarOpen } from "../Store/actionCreater";
import store from "../Store";
import ScreenShot from "js-web-screen-shot";

const handleLogOut = () => {
    localStorage.clear();
    store.dispatch(user_name(null));
    store.dispatch(user_email(null));
    store.dispatch(user_password(null));
    store.dispatch(user_token(null));
    store.dispatch(user_photo(null));
};

export default function Navigation(props) {
    const { IsFull, checkFull, openProviderMenu, openProperty, getCoord } = props;
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();

    const handleLogIn = () => navigate("/auth", { state: {} });

    const handleSidebarToggle = () => {
        const current = store.getState().sidebar_open;
        store.dispatch(setSidebarOpen(!current));
    };

    const handleScreenShot = () => {
        new ScreenShot({ enableWebRtc: true, completeCallback: callback, closeCallback: () => {} });
    };
    const callback = (base64) => { downloadImage(base64); };
    const downloadImage = (base64) => {
        var byteCharacters = atob(base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""));
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) { byteNumbers[i] = byteCharacters.charCodeAt(i); }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: undefined });
        var aLink = document.createElement("a");
        aLink.download = "ScreenShot.jpg";
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
    };

    useEffect(() => {
        const unsub = store.subscribe(() => {
            setEmail(store.getState().user_email);
        });
        return () => unsub();
    }, []);

    return (
        <div className="NavigationBar_large_frame">
            <div className="NavigationBar_left_frame">
                <div id="brand_title_main">Interactive Map</div>
                <div id="brand_title_sub">GIS</div>
                <div className="NavigationBar__item" onClick={handleSidebarToggle} title="Toggle Tools Menu">
                    <NavigationIcon sx={{ color: "white", fontSize: 24 }} />
                </div>
                <div className="NavigationBar__item">
                    <Search getCoord={getCoord} />
                </div>
            </div>

            <div className="NavigationBar_right_frame">
                <div className="NavigationBar__item" onClick={handleScreenShot} title="Screenshot">
                    <AddAPhotoIcon sx={{ color: "white", fontSize: 22 }} />
                </div>
                <div className="NavigationBar__item" title="Full Screen">
                    <span style={{ color: "white", fontSize: 13, marginRight: 4 }}>Full Screen</span>
                    <FormControlLabel
                        control={<Switch checked={IsFull} onChange={checkFull} name="isFull" size="small" />}
                        label=""
                        style={{ margin: 0 }}
                    />
                </div>
                {email !== null &&
                    <div className="NavigationBar__item">
                        <AccountMenu email={email} />
                    </div>
                }
                <div
                    className="NavigationBar__item"
                    onClick={email === null ? handleLogIn : handleLogOut}
                    title={email === null ? "Login" : "Logout"}
                >
                    <LogoutIcon sx={{ color: "white", fontSize: 22 }} />
                    <span style={{ color: "white", fontSize: 13, marginLeft: 4 }}>
                        {email === null ? "LOGIN" : "LOGOUT"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export { handleLogOut };
