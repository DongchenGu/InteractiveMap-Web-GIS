import React from 'react';
import {Container, createTheme, ThemeProvider} from "@material-ui/core";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import App from "./App"
import Footer from "./Footer"
import Auth from "./components/Auth/Auth"
import Navigation from "./Navigation"

import "./App.css"

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

const RouterApp = ()=>{

    // const user = JSON.parse(localStorage.getItem('profile'))
    return(

            <Router>
                    <ThemeProvider theme={theme}>
                        <Container maxWidth="xl">
                            {/*<Navbar/>*/}
                            <Navigation/>
                            <Routes>
                                <Route path="/" exact element={<App/>}/>
                                <Route path="/auth" exact element={<Auth id={"endMenu"}/>}/>
                            </Routes>
                            <Footer/>
                        </Container>
                    </ThemeProvider>
            </Router>



    )
}

export default RouterApp;