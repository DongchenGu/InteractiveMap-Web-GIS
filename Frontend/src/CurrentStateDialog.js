import './CurrentStateDialog.css'
import React from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default class CurrentStateDialog extends React.Component{


    content =null;
    handleLeftClick=()=>{
        console.log("click has been handled");
    };

    componentDidMount(){
        this.content="into the Full Screen WorkStation";
    };

    render() {
        return(
            <div className="largeCurrentStateDialog">
                <div id="close">
                    <IconButton>
                        <ChevronLeftIcon onClick={this.handleLeftClick} fontSize="large"/>
                    </IconButton>
                </div>
                <div id="content">
                    {this.content}
                </div>
            </div>

        );
    }


}

//   transform: translateX(-80vw);
//     transition: all 1s;