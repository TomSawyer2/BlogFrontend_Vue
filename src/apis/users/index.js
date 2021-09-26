import { URL } from "@/config";
import axios from "../request";

export function register(params) {
  return axios.post(URL.register, params);
}

export function login(params) {
    return axios.post(URL.login, params);
}