
import axios from "axios";
const IS_HEADER_TOKEN = import.meta.env.VITE_HEADER_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const Token = localStorage.getItem("TOKEN") || "";
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers:
    IS_HEADER_TOKEN === "LOCALSTORAGE" && Token
      ? {
          Authorization: `Bearer ${Token}`,
        }
      : {},
});

let cancelTokenSource

axiosInstance.interceptors.request.use((config) => {
    if (config.method === 'get') {
        const queryParams = new URLSearchParams(config.url.split('?')[1])
        const paramsObject = Object.fromEntries(queryParams.entries())
        const searchParams = paramsObject?.query || null
        if (searchParams) {
            cancelTokenSource = axios.CancelToken.source()
            config.cancelToken = cancelTokenSource.token
        }
    }
    return config;
});


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if ("Request was canceled" === error?.message) {
            return
        }
        if ([401, 403].includes(error?.response?.status)) {
            // localStorage.removeItem('refreshToken')
            // localStorage.removeItem('accessToken')
            // localStorage.removeItem('userDetails')
            //window.location.href = "/"
        }
        return Promise.reject(error)
    }
)

export function CancelRequest (){
    if (cancelTokenSource) {
        cancelTokenSource.cancel('Request was canceled')
    }
}

export default axiosInstance;