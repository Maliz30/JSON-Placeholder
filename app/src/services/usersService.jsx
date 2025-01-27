import axios from "axios"

export const usersService = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    try{
        const res = await axios.get(`${apiUrl}/users`);
        return res.data;
    } catch(err){
        console.log(err);
        throw err;
    }
}

export const oneUserService = async (id) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    try{
        const res = await axios.get(`${apiUrl}/users/${id}`);
        return res.data;
    } catch(err){
        console.log(err);
        throw err;
    }
}