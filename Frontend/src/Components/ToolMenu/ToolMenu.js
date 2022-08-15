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
import PubSub from 'pubsub-js'
import LayersClearTwoToneIcon from '@mui/icons-material/LayersClearTwoTone';



export default class ToolMenu extends React.Component{

    constructor(props) {
        super(props);
        const {closeToolMenu,changeCurrentState,setTimerToCloseDialog,clearTimerAboutStateDialog} = props;
        this.handleCloseToolMenu=()=>{
            closeToolMenu();
        };
        //these codes are used to always listen to the event
        //仅当当前工具Tool改变的时候才执行后面的，否则点击同一个工具多次的时候，会不停地刷新dom导致性能问题
        this.currentTool= null;
        // this.handleStateChanged=function (toolValue,e){
        //     if(this.currentTool!== toolValue){
        //         this.currentTool=toolValue;
        //         clearTimerAboutStateDialog();
        //         setTimeout(()=>{changeCurrentState(toolValue);
        //             setTimerToCloseDialog();},200);
        //     }else{
        //         return;
        //     }
        // };
        this.handleStateChanged=function (toolValue,e){
            if(this.currentTool!== toolValue){
                this.currentTool=toolValue;
                changeCurrentState(toolValue);
            }else{
                PubSub.publish(toolValue, 'xxxx');
                    }

        };

    }


    render() {
        return(
            <div id="largeToolMenu">
                <div id="ToolMenuTag">
                    ToolMenu &nbsp;
                    <IconButton onClick={this.handleCloseToolMenu}>
                        <ClearIcon  fontSize="small" style={{marginTop:"auto"}}/>
                    </IconButton>
                </div>
                <div id="ToolTable">
                    <table>
                        <tbody>
                        <tr id="TableRow">
                            <td id="TableData">
                                <IconButton onClick={this.handleStateChanged.bind(this,"point")}>
                                    <PlaceTwoToneIcon  fontSize="medium"></PlaceTwoToneIcon>
                                </IconButton>
                            </td>
                            <td>
                                <IconButton onClick={this.handleStateChanged.bind(this,"circle")}>
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

                        <tr>
                            <td>
                                <IconButton onClick={this.handleStateChanged.bind(this,"deleteItems")}>
                                    <LayersClearTwoToneIcon fontSize="medium"></LayersClearTwoToneIcon>
                                </IconButton>

                            </td>
                        </tr>
                        </tbody>

                    </table>
                </div>

            </div>
        );
    }
}