import axios from "axios";

const baseURL = "https://challenge.thef2e.com/api/thef2e2019/stage6";
const token = "1SROjHz7pTcLsiaAUwEJzAnfJU0XVvQ95Gy1R1QEDYWgL7Bm5AbNXtuZT3c4";
const instance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "content-type": "application/json",
  },
});

instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  switch (error.response.status) {
    case 400:
      return Promise.reject(error.response.data.message);
    default:
      break;
  }
});


export default instance;