import { userPostService } from "../services/postsService";

export const countAverageCaracters = (posts) => {
    const numPosts = posts.length;

    if (numPosts === 0) return "0";

    let average = 0;

    for(let post of posts) {
        let comment = post.body;
        average += comment.length;
    }

    average /= numPosts;

    return average.toLocaleString('pt-BR');
}

export const generateReportData = async (users) => {
    let reportData = {};

    for (let user of users){  
        
        try{
            const posts = await userPostService(user.id);
            const average = countAverageCaracters(posts);
            
            reportData[user.id] = {
                id: user.id, 
                userName: user.name, 
                numPosts: posts.length, 
                averageCaracters: average
            };

        } catch(err){
            console.error(err)

            reportData[user.id] = {
                id: user.id, 
                userName: user.name, 
                numPosts: 0, 
                averageCaracters: "N/A", 
            };
        }
    }

    return reportData;
}