/**
 * @author TomSawyer2
 * @date 2021/10/8
 *
 * @brief
 * 标签有关的接口
 * 1. 获取所有标签
 * 2. 添加一个标签
 */
import { URL } from '@/config';
import axios from '../request';

/**
 * @description 获取所有标签
 * @method POST
 */ 
export function getAllTags() {
    return axios.post(URL.getAllTags);
}

/**
 * @description 添加一个标签
 * @method POST
 * @param {String} name
 * @param {String} color 
 */ 
export function addTag(params) {
    return axios.post(URL.addTag, params);
}
