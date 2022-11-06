import React from "react";
import './Footer.css'
import {tileLayer} from "leaflet/dist/leaflet-src.esm";
import Button from '@mui/material/Button';


export  default  class Footer extends  React.Component{

    url="https://github.com/NorbertFeltchenheimer/InteractiveMap-Web-GIS";
    shareOnFacebook= ()=>{
        window.open(`http://www.facebook.com/sharer.php?kid_directed_site=0&u=${this.url}`, `_blank`, `width=600, height=450, toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, top=100,left=350`)
    }
    shareOnTwitter= ()=>{
        window.open(`https://twitter.com/share?url=${this.url}`, `_blank`, `width=600, height=450, toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, top=100,left=350`)
    }
    shareOnReddit= ()=>{
        window.open(`http://www.reddit.com/submit?url=${this.url}`, `_blank`, `width=600, height=450, toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, top=100,left=350`)
    }

    render() {
        return (
            <div id="endMenu">

                <div className="table">
                        <div className='tr'>
                            <div className='td'><img src="./Logo1.png" alt=""/></div>
                            <div className='td'>Share us on the Social Media!</div>
                            <div className='td'></div>
                            <div className='td'></div>
                            <div className='td'></div>
                            <div className='tdIcon'>
                                {/*<input type="image" id="shareOnFacebook" src="facebook.png" onClick={this.shareOnFacebook} ></input>*/}
                                <button onClick={this.shareOnFacebook} id="shareOnFacebook"></button>
                            </div>
                            <div className='tdIcon'>
                                <button onClick={this.shareOnTwitter} id="shareOnTwitter"></button>
                            </div>
                            <div className='tdIcon'>
                                <button onClick={this.shareOnReddit} id="shareOnReddit"></button>
                            </div>
                        </div>
                </div>
                <hr style={ {align:"center", width:"95%", color: "azure", SIZE:2, opacity:"60%"}} />
                <div className="table2">
                    <div className='th2'>
                        <div className='td2'></div>
                        <div className='td2'>Open Source Map Marker </div>
                        <div className='td2'><a href="https://www.gnu.org/licenses/gpl-3.0.en.html" className="link" style={{fontSize:'18px'}}>GPL 3.0 License</a></div>
                        <div className='td2'>API Reference</div>
                        <div className='td2'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                    </div>
                    <div className="tr2">
                        <div className='td2'></div>
                        <div className='td2'><a href="https://github.com/NorbertFeltchenheimer/InteractiveMap-Web-GIS" className="importantLink">GitHub</a></div>
                        <div className='td2'></div>
                        <div className='td2'><a href="https://github.com/facebook/react/" className="link">React</a></div>
                        <div className='td2'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                    </div>
                    <div className="tr2">
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='td2'><a href="https://github.com/Leaflet/Leaflet" className="link">Leaflet</a></div>
                        <div className='td2'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                    </div>
                    <div className="tr2">
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='td2'><a href="https://github.com/Leaflet/Leaflet" className="link">W3cSchool</a></div>
                        <div className='td2'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                    </div>
                    <div className="tr2">
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='td2'><a href="https://github.com/pixijs/pixijs" className="link">PiXiJS</a></div>
                        <div className='td2'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                    </div>
                    <div className="tr2">
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='td2'><a href="https://github.com/pixijs/pixijs" className="link">PiXiJS</a></div>
                        <div className='td2'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                    </div>
                    <div className="tr2">
                        <div className='td2'></div>
                        <div className='td2' style={{fontSize:'15px'}}>Terms-></div>
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                        <div className='tdIcon'></div>
                    </div>
                </div>
                <div id="Copyright">
                    <div>
                        &lt;InteractiveMap Web GIS&gt;
                    </div>
                    <div>
                        Copyright (C) &lt;2022&gt;  &lt;DongchenGu&gt;
                    </div>
                    <br />
                        <div>
                            we provide some different styles of map for the user! Various 2D interactive markers are provided,
                            users can add point Markers, rectangles, polygons, lines, circles,
                            text and user can even make map as a Canvas using brush tool to draw drafts.
                        </div>
                    <br/>
                        <div>
                            This program is free software: you can redistribute it and/or modify
                            it under the terms of the GNU General Public License as published by
                            the Free Software Foundation, version 3.
                        </div>
                    <br/>
                        <div>
                            This program is distributed in the hope that it will be useful,
                            but WITHOUT ANY WARRANTY; without even the implied warranty of
                            MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                            GNU General Public License for more details.
                        </div>
                    <br/>
                    along with this program.  If not, see &lt;https://www.gnu.org/licenses/&gt;
                </div>

                <div id="endBar"> TERMS AND CONDITIONS   PRIVACY POLICY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ＠2022</div>
            </div>
        );
    }
}
