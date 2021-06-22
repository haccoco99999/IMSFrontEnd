import axios from "axios"
import { GET_ALL_GOODS_ISSUE_URL } from "./endpoint"

const axiosClient = axios.create({
    baseURL: GET_ALL_GOODS_ISSUE_URL,
    headers:{
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    //handel token here
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if(response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    //handel errors
    throw error;
});

export default axiosClient;