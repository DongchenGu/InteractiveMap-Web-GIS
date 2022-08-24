// 引入需要使用的 常量
import { CHANGE_COLOR,CHANGE_TEXT ,CHANGE_FONTSIZE,CHANGE_FONTFAMILY} from "./constant.js";


//改变颜色
export const changeColor = (color) => {
    return {
        type: CHANGE_COLOR,
        payload:color,
    };
};

export const changeText = (text)=>{
    return{
        type: CHANGE_TEXT,
        payload:text,
    }
};

export const changeFontSize = (fontSize)=>{
    return{
        type: CHANGE_FONTSIZE,
        payload:fontSize,
    }
};
export const changeFontFamily = (fontFamily)=>{
    return{
        type: CHANGE_FONTFAMILY,
        payload:fontFamily,
    }
};