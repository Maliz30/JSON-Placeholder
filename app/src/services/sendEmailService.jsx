import axios from "axios"

export const sendEmailService = async (email, blobFiles) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    try{
        const formData = new FormData();
        formData.append("email", email);
        formData.append("excel", blobFiles.excel);


        console.log(blobFiles)
        await axios.post(`${apiUrl}/send-email`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });

    } catch(err){
        throw err;
    } 
}