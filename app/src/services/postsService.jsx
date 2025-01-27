import axios from "axios";

export const userPostService = async (userId) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    try{
        const res = await axios.get(`${apiUrl}/users/${userId}/posts`)
        return res.data;
    } catch(err){
        throw err;
    }
}