// 引入需要使用的 常量
import { CHANGE_COLOR } from "./constant.js";

//改变颜色
export const changeColor = (color) => {
    return {
        type: CHANGE_COLOR,
        payload:color,
    };
};
