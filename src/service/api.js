import axios from "axios";
import { getItem } from "../helpers/persistance-storage";

axios.defaults.baseURL = "https://web-production-3d46.up.railway.app/api";

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
