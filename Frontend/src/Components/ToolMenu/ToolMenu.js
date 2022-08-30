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
import HexagonIcon from '@mui/icons-material/Hexagon';
import {mymap} from "../OriginMap/OriginMap";
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
let StateBeforeoutFullScreen = null;

export default class ToolMenu extends React.Component{


    constructor(props) {
        super(props);
        const {closeToolMenu,CurrentState,changeCurrentState,setTimerToCloseDialog,clearTimerAboutStateDialog,openTips} = props;
        this.handleCloseToolMenu=()=>{
            closeToolMenu();
        };

        //仅当当前工具Tool改变的时候才执行后面的，否则点击同一个工具多次的时候，会不停地刷新dom导致性能问题
        this.state={
            CurrentState: CurrentState,
        }

        this.handleStateChanged=function (toolValue,e){
            if(toolValue==="deleteTextOneByOne"){
               // console.log("toolmenu里面选中了")
                PubSub.publish(toolValue, 'xxxx');
            }else{
                if(this.state.CurrentState!== toolValue){
                    changeCurrentState(toolValue);
                    // console.log("这里执行了")
                    // console.log(CurrentState);
                }else{
                    PubSub.publish(toolValue, 'xxxx');
                }
            }

        };
        //these codes are used to always listen to the event

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
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        //该方法内禁止访问this
        if (nextProps.CurrentState !== prevState.CurrentState) {
            //通过对比nextProps和prevState，返回一个用于更新状态的对象
            //console.log("sdfsdf"+prevState.CurrentState);
            //记住退出全屏之前的状态
            if(nextProps.CurrentState === "outFullScreen"){
                StateBeforeoutFullScreen = prevState.CurrentState;
            }
            return {
                CurrentState: nextProps.CurrentState
            }

        }

        //不需要更新状态，返回null
        return null
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        //恢复退出全屏前的状态
        if(prevProps.CurrentState === "outFullScreen"){
            this.props.changeCurrentState(StateBeforeoutFullScreen);
        }
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
                                <IconButton onClick={this.handleStateChanged.bind(this,"polygon")}>
                                    <HexagonIcon fontSize="medium"></HexagonIcon>
                                </IconButton>
                            </td>
                            <td>
                                <IconButton onClick={this.handleStateChanged.bind(this,"rectangle")}>
                                    <CropLandscapeIcon fontSize="medium"></CropLandscapeIcon>
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <IconButton onClick={this.handleStateChanged.bind(this,"lines")}>
                                    <TimelineOutlinedIcon fontSize="medium"></TimelineOutlinedIcon>
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
                                <IconButton onClick={this.handleStateChanged.bind(this,"inputtext")}>
                                    <SpellcheckIcon fontSize="medium"></SpellcheckIcon>
                                </IconButton>
                            </td>
                            <td>
                                <IconButton onClick={this.handleStateChanged.bind(this,"deleteTextOneByOne")}>
                                    <TextDecreaseIcon fontSize="medium"></TextDecreaseIcon>
                                </IconButton>
                            </td>
                        </tr>

                        <tr>

                            <td>
                                <IconButton onClick={this.handleStateChanged.bind(this,"paint")}>
                                    <ModeEditOutlineOutlinedIcon fontSize="medium"></ModeEditOutlineOutlinedIcon>
                                </IconButton>

                            </td>
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