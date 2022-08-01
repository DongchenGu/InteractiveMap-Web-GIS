import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "./MapProviderMenu.css"
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

export  default class MapProviderMenu extends  React.Component{


    ref1= React.createRef();
    handleClick= (e)=>{
        this.props.changeProvider(e.target.value);
        console.log("already-handleClick");
    };
    handleClearMenu = ()=>{
        this.props.closeProviderMenu();
    };

    render() {
        return(
            <div id="largeMapProviderMenu">
                <div id="div1">
                    <div id="div2">MapProviders</div>
                    <IconButton onClick={this.handleClearMenu}  >
                        <ClearIcon fontSize="medium" style={{marginLeft:"3vw",marginTop:"auto"}}/>
                    </IconButton>

                </div>
            <div id="MapProviderMenu">
                <FormControl>
                    {/*<FormLabel id="demo-radio-buttons-group-label">MapProviders</FormLabel>*/}
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick}/>} label="Stadia.AlidadeSmooth" />
                        <FormControlLabel value="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                                          control={<Radio onClick={this.handleClick}/>} label="OpenStreetMap.Hot" />
                        <FormControlLabel value="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick}/>} label="Stadia.AlidadeSmoothDark" />
                        <FormControlLabel value="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick}/>} label="Stadia.OSMBright" />
                        <FormControlLabel value="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick}/>} label="Stadia.Outdoors" />
                        <FormControlLabel value="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick}/>} label="Stamen.Toner" />
                        <FormControlLabel value="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick}/>} label="Stamen.TonerLite" />

                        <FormControlLabel value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                                          control={<Radio onClick={this.handleClick}/>} label="Esri.WorldTopoMap" />
                        <FormControlLabel value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                          control={<Radio onClick={this.handleClick}/>} label="Esri.WorldImagery" />
                        <FormControlLabel value="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick}/>} label="CartoDB.Voyager" />

                    </RadioGroup>
                </FormControl>
            </div>
            </div>
        )
    }
}