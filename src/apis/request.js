import { getToken } from "@/utils/storage";
import axios from "axios";
import { TIMEOUT, CONTENT_TYPE, ERROR_CODE } from "../config/index";
import baseURL from "../config";

const Axios = axios.create({
  baseURL: baseURL,
  timeout: TIMEOUT,
  headers: { "Content-Type": CONTENT_TYPE },
  withCredentials: false,
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
      case ERROR_CODE.QUERY_ERR:
        console.log('查询失败');
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
