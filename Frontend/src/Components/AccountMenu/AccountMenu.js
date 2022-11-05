import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {useEffect, useState} from "react";
import store from "../Store";
import {user_email, user_name, user_password, user_token} from "../Store/actionCreater";
import {setAxiosToken} from "../Auth/Auth";


import {useNavigate} from "react-router-dom";



export default function AccountMenu(props) {
    const navigate = useNavigate();
    const {email} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        //console.log(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // useEffect(()=>{
    //     store.subscribe(()=>{
    //         setEmail(store.getState().user_email);
    //     })
    // },[])
    const handleMainProfile=(e)=>{
        //console.log("得得得");
        navigate("/mainProfile", { state: {  }});
    };
    const handleLogOut=(e)=>{
        //清除localStorage
        localStorage.clear();
        //清除redux中的用户信息
        store.dispatch(user_name(null));
        store.dispatch(user_email(null));
        store.dispatch(user_password(null));
        store.dispatch(user_token(null));
        // //取消axios中的token请求头
        // setAxiosToken(null);
        navigate("/home",{ state:{ }});

    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection:'row', alignItems: 'center', textAlign: 'center', marginLeft:'-1.8vw',marginRight:0 }}>

                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}

                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/*<MenuItem>*/}
                {/*    <Avatar /> Profile*/}
                {/*</MenuItem>*/}
                <MenuItem onClick={handleMainProfile}>
                    <Avatar /> {email}
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}