/**
 * @author TomSawyer2
 * @date 2021/9/26
 *
 * @brief
 * 1. 存入token
 * 2. 取得token
 * 3. 删除token
 * 4. 存入文章ID
 * 5. 取得文章ID
 * 6. 删除文章ID
 */

/**
 * @description 存入token
 * @param {String} content
 */ 
export function setToken(content) {
    if (!localStorage) {
        throw new Error('您的浏览器不支持localStorage,请尝试更新浏览器');
    }
    localStorage.setItem('token', content);
}

/**
 * @description 取得token
 * @returns {String} token
 */ 
export function getToken() {
    if (!localStorage) {
        return '';
    }
    const token = localStorage.getItem('token') || '';
    return token;
}

/**
 * @description 删除token
 */ 
export function removeToken() {
    localStorage.removeItem('token');
}

/**
 * @description 存入文章的ID
 * @param {String} content
 */ 
export function setDetailId(content) {
    if (!localStorage) {
        throw new Error('您的浏览器不支持localStorage,请尝试更新浏览器');
    }
    localStorage.setItem('id', content);
}

/**
 * @description 取得文章的ID
 * @returns {String} ID
 */ 
export function getDetailId() {
    if (!localStorage) {
        return -1;
    }
    const id = localStorage.getItem('id') || '';
    return id;
}

/**
 * @description 删除文章的ID
 */ 
export function removeDetailId() {
    localStorage.removeItem('id');
}
