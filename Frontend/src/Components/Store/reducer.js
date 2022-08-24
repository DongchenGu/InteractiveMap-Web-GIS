// 引入需要使用的常量
import { CHANGE_COLOR,CHANGE_TEXT } from "./constant.js";

const defaultState ={
    color : {
        r: 0,
        g: 0,
        b: 0,
        a: 1,},
    text:"N/A",
};

function reducer(state = defaultState, action) {
    switch (action.type) {
        case CHANGE_COLOR:
            return {
                color : action.payload
            };
        case CHANGE_TEXT:
            return {
                text: action.payload
            };
        default: return state;
    }

}

export default reducer;