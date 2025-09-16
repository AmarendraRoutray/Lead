import axiosInstance from "./AxiosInstance";

export function loginApi(data) {
    return axiosInstance.post(`/login`, data)
}