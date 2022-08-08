import logo from '../../images/logo.svg';
import './App.css';
import Navigation from "../Navigation/Navigation";
import {render} from "react-dom";
import Map from "../OriginMap/OriginMap"
import React from "react";
import OriginMap from "../OriginMap/OriginMap";
import ReactDOM from 'react-dom';
import Footer from '../Footer/Footer'
import MapProviderMenu from '../MapProviderMenu/MapProviderMenu'
import ToolMenu from "../ToolMenu/ToolMenu";
import CurrentStateDialog from '../CurrentStateDialog/CurrentStateDialog'


import Title from "../Title/Title"
import NMenu from "../NMenu/NMenu";


class App extends React.Component{
    timer = true;
    state={
        isFull: false,
        OSMUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        MapMenu: false,
        ToolMenu: false,
        StateDialog: false,
        CurrentState: null,
    }
    //计时器的flag
    stateTimer = null;
    fullScreenSwitch= ()=>{
        //console.log("切换全屏")
        var temp = this.state.isFull;
        //console.log(this.state.isFull);
        this.setState({isFull : !temp});
        if(temp===false){
            this.setState({StateDialog:!temp,CurrentState: "intoFullScreen" });
        }
        if(temp ===true){
            this.setState({StateDialog:!temp,CurrentState: "outFullScreen" });
        }

    }
    changeProvider=(OSMUrlValue)=>{
       // this.setState({OSMUrl : OSMUrlValue});
            this.setState({OSMUrl : OSMUrlValue});
            console.log(OSMUrlValue);
    }
    openProviderMenu=()=>{
          this.setState({MapMenu: true});
    }
    closeProviderMenu=()=>{
        this.setState({MapMenu: false});
    }
    openToolMenu=()=>{
        this.setState({ToolMenu: true});
    }
    closeToolMenu=()=>{
        this.setState({ToolMenu:false});
    }
    changeCurrentState=(stateValue)=>{
        this.setState({CurrentState :stateValue,StateDialog:true});
    };
    closeStateDialog=()=>{
        this.setState({StateDialog:false});
    }
    //设置计时器来关掉stateDialog
    setTimerToCloseDialog=()=>{
        this.stateTimer = setTimeout(()=>{ this.stateTimer=null; this.closeStateDialog();console.log("Dialog timeOut")},"8000");
        //setTimeout(this.timeToCloseDialog,"200");
    }
    //在改变currentState前关掉stateTimer并且关闭dialog
    clearTimerAboutStateDialog=()=>{
            if(this.stateTimer!==null){
                clearTimeout(this.stateTimer);
                this.closeStateDialog();
                this.stateTimer=null;
                console.log("timer has been removed")
            }
    }



    render() {
        let Index=null;
        let MapProvider =null;
        let Tool= null;
        let StateDialog = null;
        if(this.state.MapMenu===true){
            MapProvider=<MapProviderMenu changeProvider={this.changeProvider} closeProviderMenu={this.closeProviderMenu}/>
        }
        if(this.state.ToolMenu===true){
            Tool=<ToolMenu  closeToolMenu={this.closeToolMenu}
                            changeCurrentState={this.changeCurrentState}
                            setTimerToCloseDialog={this.setTimerToCloseDialog}
                            clearTimerAboutStateDialog={this.clearTimerAboutStateDialog}/>
        }
        if(this.state.StateDialog===true){
            StateDialog=<CurrentStateDialog
                CurrentState={this.state.CurrentState}
                />
            //setTimeout(function(){alert("Hello")},5000);
        }



        if(this.state.isFull===false){
            Index = <div>

                            {Tool}
                            {MapProvider}
                            <div id="Describe">
                                <Navigation  checkFull={this.fullScreenSwitch}
                                             isFull={this.state.isFull}
                                             changeMapMenu={this.state.changeMapMenu}
                                             openProviderMenu={this.openProviderMenu}
                                             openToolMenu={this.openToolMenu}
                                />
                                <Title/>
                            </div>
                            <div id="canvas">
                                <div id="indexMap">
                                    <OriginMap OSMUrl={this.state.OSMUrl}/>
                                </div>
                            </div>
                    </div>
        }else{

            Index= <div>
                        <Navigation  checkFull={this.fullScreenSwitch}
                                     isFull={this.state.isFull}
                                     changeMapMenu={this.state.changeMapMenu}
                                     openProviderMenu={this.openProviderMenu}
                                     openToolMenu={this.openToolMenu}
                        />
                        <div id="fullScreenMap">
                            <div id="stateDialog">
                                {StateDialog}
                            </div>
                            {Tool}
                            {MapProvider}
                            <OriginMap OSMUrl={this.state.OSMUrl}/>
                        </div>
                    </div>
        }

        return(
            <div id="App">
                {Index}
                {/*<Footer/>*/}
            </div>
        )


    }
}

export default App;
