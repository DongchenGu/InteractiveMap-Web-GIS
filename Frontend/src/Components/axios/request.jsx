import axios from 'axios';
import qs from 'qs'

import store from "../Store";

const instance = axios.create({
     timeout: 120000,
 });

//请求拦截处理
instance.interceptors.request.use(function (config) {
    // 登录时就已经把token存到了cookie中
    const token = store.getState().user_token;

    if (token) {
        config.headers.authorization = token;
    }
    return config;

}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
//
// instance.interceptors.response.use(function (response) {
//      // ...如上
//  }, function (error) {
//      // ...如上
//  });

const _post = (api, data, headers = {}) => {
     // ...如上
 }

const post = (api, data, headers = {}) => {
     // ...如上
 }

const postJson = (api, data, headers = {}) => {
     // ...如上
 }

const postFormData = (api, data, headers = {}) => {
     // ...如上
 }

const get = (api, params = {}, headers = {}) => {
     // ...如上
 }

// 导出，供各页面调用
export { instance, post, postJson, postFormData, get };
