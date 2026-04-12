import './Navigation.css'
import React, { useEffect, useState } from 'react';
import NavigationIcon from '@mui/icons-material/Navigation';
import LogoutIcon from '@mui/icons-material/Logout';

import AccountMenu from "../AccountMenu/AccountMenu";
import Search from "./Search/Search";
import { useNavigate } from "react-router-dom";
import { user_email, user_name, user_password, user_photo, user_token, setSidebarOpen } from "../Store/actionCreater";
import store from "../Store";

const handleLogOut = () => {
    localStorage.clear();
    store.dispatch(user_name(null));
    store.dispatch(user_email(null));
    store.dispatch(user_password(null));
    store.dispatch(user_token(null));
    store.dispatch(user_photo(null));
};

export default function Navigation(props) {
    const { openProviderMenu, openProperty, getCoord } = props;
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();

    const handleBrandClick = () => navigate('/');

    const handleLogIn = () => navigate("/auth", { state: {} });

    const handleSidebarToggle = () => {
        const current = store.getState().sidebar_open;
        store.dispatch(setSidebarOpen(!current));
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
                <div id="brand_title_main" onClick={handleBrandClick}>Interactive Map</div>
                <div id="brand_title_sub" onClick={handleBrandClick}>GIS</div>
                <div className="NavigationBar__item" onClick={handleSidebarToggle} title="Toggle Tools Menu">
                    <NavigationIcon sx={{ color: "white", fontSize: 24 }} />
                </div>
                <div className="NavigationBar__item">
                    <Search getCoord={getCoord} />
                </div>
            </div>

            <div className="NavigationBar_right_frame">
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
