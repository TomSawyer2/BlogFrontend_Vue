import { URL } from "@/config";
import axios from "../request";

export function addArticle(params) {
  return axios.post(URL.addArticle, params);
}

export function deleteArticle(params) {
    return axios.post(URL.deleteArticle, params);
}

export function updateArticle(params) {
    return axios.post(URL.updateArticle, params);
}

export function getAllArticle() {
    return axios.post(URL.getAllArticle);
}

export function getArticleById(params) {
    return axios.post(URL.getArticleById, params);
}

export function getArticleByTag(params) {
    return axios.post(URL.getArticleByTag, params);
}
