import './CurrentStateDialog.css'
import React from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


export default class CurrentStateDialog extends React.Component{
    constructor(props) {
        super(props);
        this.Dialog= null;
        this.styleName ="largeCurrentStateDialogGETIN";
        this.text=null;
    };



    handleLeftClick=()=>{
        console.log("Left click has been handled");
    };
    componentDidMount() {
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    }

    render() {
        if( this.props.CurrentState==="point"){
            this.text="Draw your PointMark on Map";
            this.styleName ="largeCurrentStateDialog";
        }
        if(this.props.CurrentState==="circle"){
            this.text="Draw your CircleMark on Map";
            this.styleName ="largeCurrentStateDialog";
        }
        if(this.props.CurrentState==="outFullScreen"){
            this.text="out";
        }
        if(this.props.CurrentState==="intoFullScreen"){
            this.text="into the Full Screen Mode";
        }

        if(this.props.CurrentState==="intoFullScreen"){
            this.Dialog=<div className={this.styleName}>
                            <div id="close">
                                <IconButton onClick={this.handleLeftClick}>
                                    <ChevronLeftIcon  fontSize="large"/>
                                </IconButton>
                            </div>
                            <div id="content">
                                {this.text}
                            </div>
                        </div>
        }

       // if(this.props.CurrentState!=="intoFullScreen"){
       //      this.Dialog=<div className={this.styleName}>
       //                      <div id="close">
       //                          <IconButton onClick={this.handleLeftClick}>
       //                              <ChevronLeftIcon  fontSize="large"/>
       //                          </IconButton>
       //                      </div>
       //                      <div id="content">
       //                          {this.text}
       //                      </div>
       //                  </div>
       //  }


        return(
            <div>
                {this.Dialog}
            </div>

        );
    }


}



// animation-delay: 2s;
//     animation-duration: 4s;
//     animation-name: slideout;
//     animation-iteration-count: 1;
//     animation-fill-mode: forwards;