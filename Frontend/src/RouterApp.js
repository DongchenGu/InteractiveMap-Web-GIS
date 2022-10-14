import React, {useEffect, useState} from 'react';
// import {Container, createTheme, ThemeProvider} from "@material-ui/core";
// import { BrowserRouter } from 'react-router-dom'

//import App from "./Components/APP/App"
import Footer from "./Components/Footer/Footer"
//import Auth from "./Components/Auth/Auth"
import "./RouterApp.css"
// import Navigation from "./Navigation"
import { useRoutes} from 'react-router-dom';
// import "./App.css"
import routes from './Components/Routes/Route';
import Waiting from "./Components/Waiting/Waiting";
import store from "./Components/Store";
import {createTheme, ThemeProvider} from "@mui/material";


const theme = createTheme({
  palette: {
    primary: {
      main: '#0044ff',
    },
    secondary: {
      main: '#0044ff',
    },
  },
});


function RouterApp(){
    const element = useRoutes(routes);
    const [waitingFlag,setWaitingFlag] = useState(false);

    useEffect(()=>{
        store.subscribe(()=>{
            setWaitingFlag(store.getState().waiting_flag);
        })
    },[])

    // const user = JSON.parse(localStorage.getItem('profile'))
    return(
        <div>
                    <ThemeProvider theme={theme} >
                        {waitingFlag ===true?     <Waiting/> : <div></div>}
                            {element}
                        <Footer/>
                    </ThemeProvider>
        </div>
    )
    /*<Container maxWidth="xl"></Container>*/
}

export default RouterApp;