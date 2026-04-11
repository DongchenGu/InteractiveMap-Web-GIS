import React, { useState, useEffect } from 'react';
import './SideMenu.css';
import store from '../Store';
import PubSub from 'pubsub-js';

import PlaceTwoToneIcon from '@mui/icons-material/PlaceTwoTone';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import HexagonIcon from '@mui/icons-material/Hexagon';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import LayersClearTwoToneIcon from '@mui/icons-material/LayersClearTwoTone';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const tools = [
    { id: 'point',              label: 'Point Marker',  Icon: PlaceTwoToneIcon },
    { id: 'circle',             label: 'Circle',        Icon: PanoramaFishEyeIcon },
    { id: 'polygon',            label: 'Polygon',       Icon: HexagonIcon },
    { id: 'rectangle',          label: 'Rectangle',     Icon: CropLandscapeIcon },
    { id: 'lines',              label: 'Lines',         Icon: TimelineOutlinedIcon },
    { id: 'inputtext',          label: 'Text Input',    Icon: SpellcheckIcon },
    { id: 'deleteTextOneByOne', label: 'Delete Text',   Icon: TextDecreaseIcon },
    { id: 'paint',              label: 'Paint',         Icon: ModeEditOutlineOutlinedIcon },
    { id: 'deleteItems',        label: 'Clear All',     Icon: LayersClearTwoToneIcon },
];

export default function SideMenu({ CurrentState, changeCurrentState }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        const unsub = store.subscribe(() => {
            const open = store.getState().sidebar_open;
            if (open) setIsFirstLoad(false);
            setIsOpen(open);
        });
        return () => unsub();
    }, []);

    const handleToolClick = (toolId) => {
        if (toolId === 'deleteTextOneByOne') {
            PubSub.publish(toolId, 'xxxx');
        } else {
            if (CurrentState !== toolId) {
                changeCurrentState(toolId);
            } else {
                PubSub.publish(toolId, 'xxxx');
            }
        }
    };

    const frameClass = isOpen
        ? 'SideMenu_frame anime_fadeInLeft'
        : isFirstLoad
            ? 'SideMenu_frame hangout_left'
            : 'SideMenu_frame anime_fadeOutLeft';

    return (
        <div className={frameClass}>
            <div className="SideMenu_scroll_area">
                <div className="SideMenu_section_header">Map Tools</div>
                {tools.map(({ id, label, Icon }) => (
                    <div
                        key={id}
                        className={`SideMenu_tool_item${CurrentState === id ? ' SideMenu_tool_active' : ''}`}
                        onClick={() => handleToolClick(id)}
                    >
                        <Icon sx={{ fontSize: 20, marginRight: '10px' }} />
                        <span>{label}</span>
                    </div>
                ))}

                <div className="SideMenu_section_header" style={{ marginTop: '16px' }}>Map Layers</div>
                <div className="SideMenu_tool_item SideMenu_layer_item">
                    <span>OpenStreetMap</span>
                </div>
                <div className="SideMenu_tool_item SideMenu_layer_item">
                    <span>Satellite</span>
                </div>
                <div className="SideMenu_tool_item SideMenu_layer_item">
                    <span>Terrain</span>
                </div>
            </div>

            <div className="SideMenu_bottom_buttons">
                <div className="SideMenu_bottom_btn">
                    <div className="SideMenu_btn_arrow">
                        <ArrowOutwardIcon sx={{ fontSize: 14 }} />
                    </div>
                    GitHub
                </div>
                <div className="SideMenu_bottom_btn">
                    <div className="SideMenu_btn_arrow">
                        <ArrowOutwardIcon sx={{ fontSize: 14 }} />
                    </div>
                    Leaflet Docs
                </div>
            </div>
            <div className="SideMenu_bottom_text">
                github.com/NorbertFeltchenheimer/InteractiveMap-Web-GIS
            </div>
            <div className="SideMenu_bottom_text">Copyright © 2024.</div>
            <div className="SideMenu_bottom_text_last">Interactive Map GIS. Open Source.</div>
        </div>
    );
}
