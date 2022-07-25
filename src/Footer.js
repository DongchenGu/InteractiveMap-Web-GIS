import React from "react";
import './Footer.css'
import {tileLayer} from "leaflet/dist/leaflet-src.esm";

export  default  class Footer extends  React.Component{

    url="https://leafletjs.cn/index.html";
    shareOnFacebook= ()=>{
        window.open(`http://www.facebook.com/sharer.php?kid_directed_site=0&u=${this.url}`, `_blank`, `width=600, height=450, toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, top=100,left=350`)
    }

    render() {
        return (
            <div>

                <div className="table">
                        <div className='tr'>
                            <div className='td'><img src="./logo1.png" alt=""/></div>
                            <div className='td'>Share us on the Social Media!</div>
                            <div className='td'></div>
                            <div className='td'></div>
                            <div className='td'></div>
                            <div className='tdIcon'>
                                {/*<input type="image" id="shareOnFacebook" src="facebook.png" onClick={this.shareOnFacebook} ></input>*/}
                                <button onClick={this.shareOnFacebook} id="shareOnFacebook"></button>
                            </div>
                            <div className='tdIcon'>
                                <button onClick={this.shareOnFacebook} id="shareOnTwitter"></button>
                            </div>
                            <div className='tdIcon'>
                                <button onClick={this.shareOnFacebook} id="shareOnTwitter"></button>
                            </div>
                        </div>
                </div>
                <hr style={ {align:"center", width:"100%", color: "azure", SIZE:2, opacity:"60%"}} />
                <div className="table2">
                    <div className='th'>
                        <div className='td2'></div>
                        <div className='td2'>Open Source Map Marker </div>
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='td2'></div>
                    </div>
                    <div className='tr2'>
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='td2'></div>
                        <div className='td2'></div>
                    </div>
                </div>
            </div>
        );
    }
}
