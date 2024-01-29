 // eslint-disable-next-line import/no-unresolved
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../env";
import querySerializer from "../utils/querySerializer";

const api = axios.create({
  baseURL: API_URL,
  paramsSerializer: querySerializer,
});

api.interceptors.request.use(async (config) => {
  try {
    let token = await AsyncStorage.getItem("@token");
    token = JSON.parse(token);

    if (token) {
      config.headers["x-access-token"] = token;
      return config;
    }
    delete config.headers["x-access-token"];
    return config;
  } catch (error) {
    throw new Error("Error in interceptor token", { cause: error });
  }
});

export default api;
