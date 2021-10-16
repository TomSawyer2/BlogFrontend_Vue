import { getToken } from "@/utils/storage";
import axios from "axios";
import { TIMEOUT, CONTENT_TYPE, ERROR_CODE } from "../config/index";
import baseURL from "../config";
import { message } from "ant-design-vue";

const Axios = axios.create({
  baseURL: baseURL,
  timeout: TIMEOUT,
  headers: { "Content-Type": CONTENT_TYPE },
  withCredentials: false
});

// 请求拦截
Axios.interceptors.request.use(
  (config) => {
    config.headers["token"] = getToken(); // getToken
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

// 响应拦截
Axios.interceptors.response.use(
  (res) => {
    const errorCode = res.data.status;
    // 错误处理
    switch (errorCode) {
      case ERROR_CODE.USER_EXIST:
        message.error("用户已存在");
        break;
      
      case ERROR_CODE.PASSWORD_ERR:
        message.error("账号密码错误");
        break;

      case ERROR_CODE.ACCOUNT_EMP:
        message.error("账号不存在");
        break;

      case ERROR_CODE.ADD_ERR:
        message.error("文章添加失败");
        break;

      case ERROR_CODE.DEL_ARTICLE_EMP:
        message.error("删除的文章不存在");
        break;

      case ERROR_CODE.DEL_ARTICLE_ERR:
        message.error("删除文章失败");
        break;

      case ERROR_CODE.QUERY_ERR:
        message.error("查询失败");
        break;

      case ERROR_CODE.UPDATE_ARTICLE_EMP:
        message.error("查询的文章不存在");
        break;

      case ERROR_CODE.UPDATE_ERR:
        message.error("更新失败");
        break;

      case ERROR_CODE.TAG_ERR:
        message.error("tag添加失败");
        break;

      case ERROR_CODE.TAG_EXIST:
        message.error("tag已存在");
        throw new Error(res.data.msg);

      case ERROR_CODE.GET_TAG_ERR:
        message.error("获取所有tag失败");
        break;

      case ERROR_CODE.QUERY_ARTICLE_ERR:
        message.error("查询文章不存在");
        break;

      case ERROR_CODE.QUERY_ARTICLE_BY_TAG_ERR:
        message.error("查询文章错误");
        break;

      default:
        return res;
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default Axios;
