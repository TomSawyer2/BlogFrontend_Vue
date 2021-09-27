export const TIMEOUT = 5000;
export const CONTENT_TYPE = "application/json";

let baseURL = "";
if (process.env.NODE_ENV === "development") {
  baseURL = "http://127.0.0.1:8085/api";
  // dev
} else {
  baseURL = "http://127.0.0.1:8085/api";
  // build
}
export default baseURL;

const URL = {
  register: "/register",
  login: "/login",
  getAllArticle: "/getAllArticle",
  getArticleById: "/getArticleById",
  updateArticle: "/updateArticle",
  deleteArticle: "/deleteArticle",
  addArticle: "/addArticle",
};

const ERROR_CODE = {
  QUERY_ERR: 7, // 查询失败
};

export { URL, ERROR_CODE };
