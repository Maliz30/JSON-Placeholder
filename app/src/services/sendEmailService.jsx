import axios from "axios"

export const sendEmailService = async (email, files) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    try{
        console.log(files)
        await axios.post(`${apiUrl}/send-email`, {
            email: email,
            pdf: files?.pdf,
            excel: files?.excel
        });

    } catch(err){
        throw err;
    } 
}