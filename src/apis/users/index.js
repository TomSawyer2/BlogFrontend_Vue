/**
 * @author TomSawyer2
 * @date 2021/9/26
 *
 * @brief
 * 用户有关的接口
 * 1. 注册
 * 2. 登录
 */
import { URL } from '@/config';
import axios from '../request';

/**
 * @description 注册
 * @method POST
 * @param {String} userName
 * @param {String} password
 */ 
export function register(params) {
    return axios.post(URL.register, params);
}

/**
 * @description 登录
 * @method POST
 * @param {String} userName
 * @param {String} password
 */ 
export function login(params) {
    return axios.post(URL.login, params);
}
