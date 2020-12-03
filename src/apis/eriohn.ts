import axios from "axios";

import config from "../config/config";

const eriohn = axios.create({
    baseURL: config.ERIOHN_API_URL,
    validateStatus(status) {
        return status < 400;
      }
})

// can easily create other api enpoint exports with axios
export const eriohnDocument = axios.create({
    baseURL: config.ERIOHN_API_DOC_URL
  });
  

// easy method for checking token and auth on FE with axios

// eriohn.interceptors.request.use(request => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       request.headers.Authorization = `Bearer ${token}`;
//     }
//     return request;
// });

export default eriohn;

