import { URL } from "@/config";
import axios from "../request";

export function getAllTags() {
  return axios.post(URL.getAllTags);
}

export function addTag(params) {
  return axios.post(URL.addTag, params);
}