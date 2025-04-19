import axios from "axios";
import { getItem } from "../helpers/persistance-storage";

axios.defaults.baseURL = "http://localhost:3000/api";

axios.interceptors.request.use(
  (config) => {
    const token = getItem("token");
    const authorization = token ? `Token ${token}` : '';

    // 🔍 Diagnostics
    console.log("🧪 Interceptor ishladi");
    console.log("Token:", token);
    console.log("Authorization Header:", authorization);
    console.log("Request URL:", config.url);
    console.log("Request Method:", config.method);

    // Tokenni kiritish
    if (authorization) {
      config.headers.Authorization = authorization;
    }

    return config;
  },
  (error) => {
    console.log("❌ Interceptor error:", error);
    return Promise.reject(error);
  }
);

export default axios;
