import React from "react";
import './ToolMenu.css'
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import PlaceIcon from '@mui/icons-material/Place';
import PlaceTwoToneIcon from '@mui/icons-material/PlaceTwoTone';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CropDinIcon from '@mui/icons-material/CropDin';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';

export default class ToolMenu extends React.Component{

    constructor(props) {
        super(props);
        const {closeToolMenu,changeCurrentState} = props;
        this.handleCloseToolMenu=()=>{
            closeToolMenu();
        };
        this.handleStateChanged=(value)=>{
            return (value)=> {
                changeCurrentState(value);
            }
        };
    }


    render() {
        return(
            <div id="largeToolMenu">
                <div id="ToolMenuTag">
                    ToolMenu &nbsp;
                    <IconButton>
                        <ClearIcon onClick={this.handleCloseToolMenu} fontSize="small" style={{marginTop:"auto"}}/>
                    </IconButton>
                </div>
                <div id="ToolTable">
                    <table>
                        <tr id="TableRow">
                            <td id="TableData">
                                <IconButton>
                                    <PlaceTwoToneIcon onClick={this.handleStateChanged("point")} fontSize="medium"></PlaceTwoToneIcon>
                                </IconButton>
                            </td>
                            <td>
                                <IconButton>
                                    <PanoramaFishEyeIcon fontSize="medium"></PanoramaFishEyeIcon>
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <IconButton>
                                    <ChangeHistoryIcon fontSize="medium"></ChangeHistoryIcon>
                                </IconButton>
                            </td>
                            <td>
                                <IconButton>
                                    <CropLandscapeIcon fontSize="medium"></CropLandscapeIcon>
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <IconButton>
                                    <ShowChartIcon fontSize="medium"></ShowChartIcon>
                                </IconButton>
                            </td>
                            <td>
                                <IconButton>
                                    <ArrowRightAltIcon fontSize="medium"></ArrowRightAltIcon>
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <IconButton>
                                    <SpellcheckIcon fontSize="medium"></SpellcheckIcon>
                                </IconButton>
                            </td>
                            <td>
                                <IconButton>
                                    <ArrowRightAltIcon fontSize="medium"></ArrowRightAltIcon>
                                </IconButton>
                            </td>
                        </tr>
                    </table>
                </div>

            </div>
        );
    }
}