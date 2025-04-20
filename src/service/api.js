import axios from "axios";
import { getItem } from "../helpers/persistance-storage";

axios.defaults.baseURL = "http://localhost:3000/api";

axios.interceptors.request.use(
  (config) => {
    const token = getItem("token");
    const authorization = token ? `Token ${token}` : '';
    if (authorization) {
      config.headers.Authorization = authorization;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axios;
