import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "./MapProviderMenu.css"
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
//import Draggable from 'react-draggable';


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
                <div id="firstLine">
                    <div id="Name">MapProviders</div>
                    <div id="closeIcon">
                        <IconButton onClick={this.handleClearMenu}  >
                            <ClearIcon fontSize="medium" style={{marginLeft:"3vw",marginTop:"auto"}}/>
                        </IconButton>
                    </div>


                </div>
            <div id="MapProviderMenu">
                <FormControl >
                    {/*<FormLabel id="demo-radio-buttons-group-label">MapProviders</FormLabel>*/}
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"

                    >
                        <FormControlLabel value="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick} size="small" sx={{
                                              '& .MuiSvgIcon-root': {
                                                  fontSize: 16,
                                              },
                                          }}/>} label="Stadia.AlidadeSmooth" style={{fontSize:"13"}}/>
                        <FormControlLabel value="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                                          control={<Radio onClick={this.handleClick} size="small"sx={{
                                              '& .MuiSvgIcon-root': {
                                                  fontSize: 16,
                                              },
                                          }}/>} label="OpenStreetMap.Hot" style={{fontSize:"13"}}/>
                        <FormControlLabel value="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick} size="small" sx={{
                                              '& .MuiSvgIcon-root': {
                                                  fontSize: 16,
                                              },
                                          }}/>} label="Stadia.AlidadeSmoothDark" style={{fontSize:"13"}}/>
                        <FormControlLabel value="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick} size="small" sx={{
                                              '& .MuiSvgIcon-root': {
                                                  fontSize: 16,
                                              },
                                          }}/>} label="Stadia.OSMBright" style={{fontSize:"13"}}/>
                        <FormControlLabel value="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick} size="small" sx={{
                                              '& .MuiSvgIcon-root': {
                                                  fontSize: 16,
                                              },
                                          }}/>} label="Stadia.Outdoors" style={{fontSize:"13"}}/>
                        <FormControlLabel value="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick} size="small" sx={{
                                              '& .MuiSvgIcon-root': {
                                                  fontSize: 16,
                                              },
                                          }}/>} label="Stamen.Toner" style={{fontSize:"13"}}/>
                        <FormControlLabel value="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick} size="small" sx={{
                                              '& .MuiSvgIcon-root': {
                                                  fontSize: 16,
                                              },
                                          }}/>} label="Stamen.TonerLite" style={{fontSize:"13"}}/>

                        <FormControlLabel value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                                          control={<Radio onClick={this.handleClick} size="small" sx={{
                                              '& .MuiSvgIcon-root': {
                                                  fontSize: 16,
                                              },
                                          }}/>} label="Esri.WorldTopoMap" style={{fontSize:"13"}}/>
                        <FormControlLabel value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                          control={<Radio onClick={this.handleClick} size="small" sx={{
                                              '& .MuiSvgIcon-root': {
                                                  fontSize: 16,
                                              },
                                          }}/>} label="Esri.WorldImagery" style={{fontSize:"13"}}/>
                        <FormControlLabel value="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                          control={<Radio onClick={this.handleClick} size="small" sx={{
                                              '& .MuiSvgIcon-root': {
                                                  fontSize: 16,
                                              },
                                          }}/>} label="CartoDB.Voyager" style={{fontSize:"13"}}/>

                    </RadioGroup>
                </FormControl>
            </div>
            </div>
        )
    }
}