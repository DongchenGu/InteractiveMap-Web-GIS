import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function NMenu(props) {
    const {openProviderMenu,openToolMenu,openProperty} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChangeMap=()=>{
       openProviderMenu();
    };
    const handleToolMenu=()=>{
        openToolMenu();
    };
    const handleProperty = ()=>{
        openProperty();
    }



    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Menu
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleChangeMap}>ChangeMapProviders</MenuItem>
                <MenuItem onClick={handleToolMenu}>OpenToolMenu</MenuItem>
                <MenuItem onClick={handleProperty}>Openattributes</MenuItem>
            </Menu>
        </div>
    );
}