import React from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import ExploreIcon from '@mui/icons-material/Explore';
import LayersIcon from '@mui/icons-material/Layers';
import PushPinIcon from '@mui/icons-material/PushPin';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const workspaces = [
    {
        id: 1,
        title: 'Workspace 1',
        subtitle: 'General Purpose Map',
        description: 'Create and annotate markers, shapes and lines on a standard street map.',
        Icon: MapIcon,
    },
    {
        id: 2,
        title: 'Workspace 2',
        subtitle: 'Exploration Map',
        description: 'Explore terrain and satellite layers with custom overlays and annotations.',
        Icon: ExploreIcon,
    },
    {
        id: 3,
        title: 'Workspace 3',
        subtitle: 'Layer Editor',
        description: 'Work with multiple map layers and manage complex geographic data.',
        Icon: LayersIcon,
    },
    {
        id: 4,
        title: 'Workspace 4',
        subtitle: 'Pin Board',
        description: 'Quickly drop and organize pins and notes across any region.',
        Icon: PushPinIcon,
    },
];

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="Landing_root">
            {/* Top bar */}
            <div className="Landing_navbar">
                <div className="Landing_brand_main" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Interactive Map</div>
                <div className="Landing_brand_sub" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>GIS</div>
            </div>

            {/* Hero */}
            <div className="Landing_hero">
                <div className="Landing_hero_title">Select a Workspace</div>
                <div className="Landing_hero_subtitle">
                    Choose a workspace below to open the map editor
                </div>
            </div>

            {/* Workspace cards */}
            <div className="Landing_cards_grid">
                {workspaces.map(({ id, title, subtitle, description, Icon }) => (
                    <div
                        key={id}
                        className="Landing_card"
                        onClick={() => navigate(`/workspace/${id}`)}
                    >
                        <div className="Landing_card_icon_wrap">
                            <Icon sx={{ fontSize: 38, color: '#3e7f9f' }} />
                        </div>
                        <div className="Landing_card_title">{title}</div>
                        <div className="Landing_card_subtitle">{subtitle}</div>
                        <div className="Landing_card_desc">{description}</div>
                        <div className="Landing_card_enter">Open →</div>
                    </div>
                ))}

                {/* Create new workspace card */}
                <div
                    className="Landing_card Landing_card_new"
                    onClick={() => alert('Create a new workspace — coming soon!')}
                >
                    <div className="Landing_card_icon_wrap">
                        <AddCircleOutlineIcon sx={{ fontSize: 38, color: '#3e7f9f' }} />
                    </div>
                    <div className="Landing_card_title">Create a New Workspace</div>
                    <div className="Landing_card_subtitle">New Project</div>
                    <div className="Landing_card_desc">Start fresh with a blank map workspace. Customize it to fit your project.</div>
                    <div className="Landing_card_enter">Create →</div>
                </div>
            </div>

            {/* Footer strip */}
            <div className="Landing_footer">
                <span>Interactive Map GIS</span>
                <span>Copyright © 2024</span>
            </div>
        </div>
    );
}
