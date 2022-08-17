import React from 'react';
import {Container, createTheme, ThemeProvider} from "@material-ui/core";
import { BrowserRouter } from 'react-router-dom'

//import App from "./Components/APP/App"
import Footer from "./Components/Footer/Footer"
//import Auth from "./Components/Auth/Auth"
import "./RouterApp.css"
// import Navigation from "./Navigation"
import { useRoutes} from 'react-router-dom';
// import "./App.css"
import routes from './Components/Routes/Route';


const theme = createTheme({
  palette: {
    primary: {
      main: '#eb1745',
    },
    secondary: {
      main: '#0044ff',
    },
  },
});

function RouterApp(){
    const element = useRoutes(routes);
    // const user = JSON.parse(localStorage.getItem('profile'))
    return(
                    <ThemeProvider theme={theme}>
                              {element}
                        <Footer/>
                    </ThemeProvider>
    )
    /*<Container maxWidth="xl"></Container>*/
}

export default RouterApp;