/**
 * 对localStorage的一些操作
 * 包括token，phoneNumber，avatarSrc，userName等等
 */
export function setToken(content) {
    if (!localStorage) {
        throw new Error("您的浏览器不支持localStorage,请尝试更新浏览器");
    }
    localStorage.setItem("token", content);
}

export function getToken() {
    if (!localStorage) {
        return "";
    }
    const token = localStorage.getItem("token") || "";
    return token;
}

export function removeToken() {
    localStorage.removeItem("token");
}