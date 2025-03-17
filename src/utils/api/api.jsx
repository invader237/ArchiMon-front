import axiosInstance from "./axiosConfig";

export const getArchimon = async () => {
    try {
        const response = await axiosInstance.get("/archimon");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createArchimon = async (archimon) => {
    try {
        const response = await axiosInstance.post("/archimon", archimon);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
