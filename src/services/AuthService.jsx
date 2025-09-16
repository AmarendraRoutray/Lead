import axiosInstance from "./AxiosInstance";

export function loginApi(data) {
    return axiosInstance.post(`/user/login`, data)
}

export function signUpApi(data) {
    return axiosInstance.post(`/user/signup`, data)

}export function logoutApi(data) {
    return axiosInstance.post(`/user/login`, data)
}

export function whoami(data) {
    return axiosInstance.post(`/user/me`, data)
}