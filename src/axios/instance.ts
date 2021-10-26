import axios from "axios";

import useStore from "../store/store";

const instance:any = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  (config:any) => {
    const token = useStore.getState().authToken;

    if (token) {
      config.headers.jwtAuthToken = token;
    } else {
      if (instance && instance.defaults.headers){
        delete instance.defaults.headers.jwtAuthToken;
      }
    }
    return config;
  },

  (error:any) => Promise.reject(error)
);

export default instance;
