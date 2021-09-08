import axios from "axios";
import { getTokens, removeToken, setToken } from "./authToken";

const axiosConfig = axios.create({
  baseURL: "url",
});

let refreshRequest = null;

axiosConfig.interceptors.request.use(
  function (config) {
    const { access_token } = getTokens();
    config.headers["Authorization"] = access_token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      if (!refreshRequest) {
        refreshRequest = sendRefreshRequest();
      }

      await refreshRequest;

      const { access_token } = getTokens();
      if (access_token) {
        return axiosConfig(error.config);
      }
    }

    return Promise.reject(error);
  }
);

function sendRefreshRequest() {
  const { access_token, refresh_token } = getTokens();
  return axiosConfig("refresh", { headers: { Authorization: access_token, "Refresh-Authorization": refresh_token } })
    .then(function (response) {
      const { data } = response;
      setToken({
        access_token: `Bearer ${data.access_token}`,
        refresh_token: `Bearer ${data.refresh_token}`,
      });

      const { access_token } = getTokens();
      axiosConfig.defaults.headers.common["Authorization"] = access_token;
      refreshRequest = null;
    })
    .catch(function (error) {
      removeToken();
      // also you can do something...
    });
}

export { axiosConfig };
