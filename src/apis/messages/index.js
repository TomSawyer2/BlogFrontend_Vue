/**
 * @author TomSawyer2
 * @date 2021/10/27
 *
 * @brief
 * 留言有关的接口
 * 1. 获取所有消息
 * 2. 添加一个消息
 * 3. 回复一个消息
 * 4. 删除一个消息
 */
import { URL } from '@/config';
import axios from '../request';

/**
 * @description 获取所有消息
 * @method POST
 */
export function getAllMessages() {
    return axios.post(URL.getAllMessages);
}

/**
 * @description 添加一个消息
 * @method POST
 * @param {String} content
 * @param {String} update_time
 */
export function addMessage(params) {
    return axios.post(URL.addMessage, params);
}

/**
 * @description 回复一个消息
 * @method POST
 * @param {Number} id
 * @param {String} reply
 */
 export function replyMessage(params) {
    return axios.post(URL.replyMessage, params);
}

/**
 * @description 删除一个消息
 * @method POST
 * @param {Number} id
 */
 export function deleteMessage(params) {
    return axios.post(URL.deleteMessage, params);
}