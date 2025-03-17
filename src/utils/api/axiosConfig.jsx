import axios from "axios";
import { baseURL } from "../config/baseUrl";

const axiosInstance = axios.create({
    baseURL: baseURL,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("Erreur Axios détectée :", error.response);
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;
