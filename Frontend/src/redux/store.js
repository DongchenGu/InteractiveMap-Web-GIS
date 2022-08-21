import {configureStore} from "@reduxjs/toolkit";
import naviReducer from "../Components/Navigation/searchSlice";

export const store = configureStore({
    reducer:{
        coord: naviReducer
    }
})