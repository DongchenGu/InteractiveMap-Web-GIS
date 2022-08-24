// 引入需要使用的常量
import {CHANGE_COLOR, CHANGE_TEXT, CHANGE_FONTSIZE, CHANGE_FONTFAMILY} from "./constant.js";

const defaultState ={
    color : {
        r: 0,
        g: 0,
        b: 0,
        a: 1,},
    text:"N/A",
    fontSize: 0.1,
    fontFamily:"Arial",
};

function reducer(state = defaultState, action) {
    switch (action.type) {
        case CHANGE_COLOR:
            return {
                ...state,
                color : action.payload
            };
        case CHANGE_TEXT:
            return {
                ...state,
                text: action.payload
            };
        case CHANGE_FONTSIZE:
            return {
                ...state,
                fontSize  : action.payload
            };
        case CHANGE_FONTFAMILY:
            return {
                ...state,
                fontFamily : action.payload
            };


        default: return state;
    }

}

export default reducer;