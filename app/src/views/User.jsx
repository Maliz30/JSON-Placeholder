import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userPostService } from "../services/postsService";
import { oneUserService } from "../services/usersService";
import PostComponent from "../components/PostComponent";
import { countAverageCaracters } from "../utils/dataUtils";
import styles from './styles/User.module.css'

const User = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [numPosts, setNumPosts] = useState(0);
    const [averageCaracters, setAverageCaracters] = useState(0);

    const handleComebackBtn = () => {
        navigate('/');
    }

    const fetchUser = async () => {
        try{
            const fetchedUser = await oneUserService(id);
            setUser(fetchedUser);
        } catch(err){
            console.error(err);
            alert("Ocorreu um erro ao carregar dados do usuário. Recarregue a página para tentar novamente!");
        }
    } 
    
    const fetchPosts = async () => {
        try{
            const fetchedPosts = await userPostService(id);
            setPosts(fetchedPosts);
        } catch(err){
            console.error(err);
            alert("Ocorreu um erro ao carregar posts do usuário. Recarregue a página para tentar novamente!");
        }
    }

    useEffect(() => {
        if(id){
            fetchUser();
            fetchPosts();
        }
        
    }, [id]);
    
    useEffect(() => {
        if(posts.length)
            setNumPosts(posts.length);
            setAverageCaracters(countAverageCaracters(posts));

    }, [posts])

    
    return(
        <div className={styles.container}>
            <div className={styles.innerContainerOne}>
                <div className={styles.containetOneLeft}>
                    <button className={styles.btnComeback} onClick={handleComebackBtn}>Voltar</button>
                    <p className={styles.textUserName}>{user?.name}</p>
                    <p className={styles.textId}>id: { id }</p>
                </div>

                <div className={styles.containetOneRight}>
                    <p className={styles.textNumPosts}>{numPosts} posts</p>
                    <p className={styles.textAverage}>Este usuário tem em média {averageCaracters} por post</p>
                </div>
            </div>
            <div className={styles.innerContainerTwo}>
                <div>
                    {posts ? (
                        posts.map((post) => (
                            <div key={post.id}>
                                <PostComponent post={post}/>
                            </div>
                        ))
                    ) : (
                        <p className={styles.textNoPost}>Este usuário ainda não realizou nenhum post!</p>  
                    )}
                </div>
            </div>
        </div>
    )
}

export default User;