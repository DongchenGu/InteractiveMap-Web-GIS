// 引入需要使用的常量
import {CHANGE_COLOR, CHANGE_TEXT, CHANGE_FONTSIZE, CHANGE_FONTFAMILY,CHANGE_LINEWIDTH,
    USER_EMAIL,USER_NAME,USER_PASSWORD,USER_TOKEN,WaitingFlag} from "./constant.js";


const defaultState ={
    color : {
        r: 0,
        g: 0,
        b: 0,
        a: 1,},
    text:"N/A",
    fontSize: 0.1,
    fontFamily:"Arial",
    lineWidth: 5,
    user_email: null,
    user_name: null,
    user_password: null,
    user_token:null,
    waiting_flag:false
};

function reducer(state = defaultState, action) {
    switch (action.type) {
        case WaitingFlag:
            return {
                ...state,
                waiting_flag : action.payload
            };

        case USER_EMAIL:
            return {
                ...state,
                user_email : action.payload
            };
        case USER_NAME:
            return {
                ...state,
                user_name : action.payload
            };
        case USER_PASSWORD:
            return {
                ...state,
                user_password : action.payload
            };
        case USER_TOKEN:
            return {
                ...state,
                user_token : action.payload
            };

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
        case CHANGE_LINEWIDTH:
            return {
                ...state,
                lineWidth: action.payload
            };

        default: return state;
    }

}

export default reducer;