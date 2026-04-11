import React, { Fragment, useState } from 'react';
import './Footer.css';

export default function Footer() {
    const [isFull, setIsFull] = useState(false);

    const handleFooterExpand = () => setIsFull(!isFull);

    return (
        <div className={isFull ? 'Footer_bg_full' : 'Footer_bg_slim'}>
            {isFull && (
                <div className="Footer_content_grid">
                    <div className="Footer_col">
                        <div className="Footer_col_header">About</div>
                        <div className="Footer_col_item">Interactive Map GIS</div>
                        <div className="Footer_col_item">Open Source Project</div>
                        <div className="Footer_col_item">Built with React + Leaflet</div>
                        <div className="Footer_col_item">MIT License</div>
                    </div>
                    <div className="Footer_col">
                        <div className="Footer_col_header">Open Source</div>
                        <div className="Footer_col_item">GPL 3.0 License</div>
                        <div className="Footer_col_item">GitHub Repository</div>
                        <div className="Footer_col_item">Contribute</div>
                        <div className="Footer_col_item">Report Issues</div>
                    </div>
                    <div className="Footer_col">
                        <div className="Footer_col_header">API References</div>
                        <div className="Footer_col_item">React</div>
                        <div className="Footer_col_item">Leaflet</div>
                        <div className="Footer_col_item">PixiJS</div>
                        <div className="Footer_col_item">MUI</div>
                    </div>
                    <div className="Footer_col">
                        <div className="Footer_col_header">Tools Used</div>
                        <div className="Footer_col_item">Node.js</div>
                        <div className="Footer_col_item">MongoDB</div>
                        <div className="Footer_col_item">Express</div>
                        <div className="Footer_col_item">Redux</div>
                    </div>
                </div>
            )}

            <div className="Footer_brand_row">
                <div className="Footer_brand_text">Interactive Map GIS</div>
            </div>

            <div className="Footer_separator" />

            <div className="Footer_last_line">
                <div className="Footer_last_item" onClick={handleFooterExpand}>
                    {isFull ? (
                        <Fragment><div className="Footer_down_tri" />Hide</Fragment>
                    ) : (
                        <Fragment><div className="Footer_up_tri" />Expand</Fragment>
                    )}
                </div>
                <div className="Footer_last_item">Part of InteractiveMap GIS</div>
                <div className="Footer_last_item">Privacy Policy</div>
                <div className="Footer_last_item">Terms of Use</div>
                <div className="Footer_last_item_end">Copyright © 2024</div>
            </div>
        </div>
    );
}
