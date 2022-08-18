// 引入需要使用的常量
import { CHANGE_COLOR } from "./constant.js";

const defaultState ={
    color : {
        r: 0,
        g: 0,
        b: 0,
        a: 1,},
};

function reducer(state = defaultState, action) {
    switch (action.type) {
        case CHANGE_COLOR:
            return {
                color : action.payload
            };
        default: return state;
    }

}

export default reducer;