// 引入需要使用的 常量
import {CHANGE_COLOR, CHANGE_TEXT, CHANGE_FONTSIZE, CHANGE_FONTFAMILY,
    CHANGE_LINEWIDTH,USER_EMAIL,USER_NAME,USER_PASSWORD,USER_TOKEN} from "./constant.js";

export const user_email = (email) => {
    return {
        type: USER_EMAIL,
        payload:email,
    };
};
export const user_name = (name) => {
    return {
        type: USER_NAME,
        payload:name,
    };
};
export const user_password = (password) => {
    return {
        type: USER_PASSWORD,
        payload:password,
    };
};
export const user_token = (token) => {
    return {
        type: USER_TOKEN,
        payload:token,
    };
};



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
export const changeFamily = (fontFamily)=>{
    return{
        type: CHANGE_FONTFAMILY,
        payload:fontFamily,
    }
};

export const changeLineWidth = (lineWidth)=>{
    return{
        type: CHANGE_LINEWIDTH,
        payload:lineWidth,
    }
};