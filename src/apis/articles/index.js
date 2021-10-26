/**
 * @author TomSawyer2
 * @date 2021/9/26
 *
 * @brief
 * 文章有关的接口
 * 1. 添加一篇文章
 * 2. 删除一篇文章
 * 3. 更新一篇文章
 * 4. 获取所有文章（无具体内容）
 * 5. 根据ID获取单篇文章
 * 6. 根据Tag获取文章
 * 7. 上传草稿
 * 8. 删除草稿
 * 9. 查询草稿
 * 10. 点赞
 */
import { URL } from '@/config';
import axios from '../request';

/**
 * @description 添加一篇文章
 * @method POST
 * @param {String} title
 * @param {String} content
 * @param {Array} tags
 * @param {String} update_time
 * @param {String} brief
 */ 
export function addArticle(params) {
    return axios.post(URL.addArticle, params);
}

/**
 * @description 删除一篇文章
 * @method POST
 * @param {Number} id
 */ 
export function deleteArticle(params) {
    return axios.post(URL.deleteArticle, params);
}

/**
 * @description 更新一篇文章
 * @method POST
 * @param {Number} id
 * @param {String} title
 * @param {String} content
 * @param {Array} tags
 * @param {String} brief
 */ 
export function updateArticle(params) {
    return axios.post(URL.updateArticle, params);
}

/**
 * @description 获取所有文章（无具体内容）
 * @method POST
 */ 
export function getAllArticle() {
    return axios.post(URL.getAllArticle);
}

/**
 * @description 根据ID获取单篇文章
 * @method POST
 * @param {Number} id
 */ 
export function getArticleById(params) {
    return axios.post(URL.getArticleById, params);
}

/**
 * @description 根据ID获取单篇文章
 * @method POST
 * @param {String} tag
 */ 
export function getArticleByTag(params) {
    return axios.post(URL.getArticleByTag, params);
}

/**
 * @description 上传草稿
 * @method POST
 * @param {String} title
 * @param {String} content
 * @param {Array} tags
 * @param {String} brief
 */ 
 export function updateTempArticle(params) {
    return axios.post(URL.updateTempArticle, params);
}

/**
 * @description 删除草稿
 * @method POST
 */ 
 export function deleteTempArticle() {
    return axios.post(URL.deleteTempArticle);
}

/**
 * @description 查询草稿
 * @method POST
 */ 
 export function searchTempArticle() {
    return axios.post(URL.searchTempArticle);
}

/**
 * @description 查询草稿
 * @method POST
 * @param {Number} id
 */ 
 export function like(params) {
    return axios.post(URL.like, params);
}
