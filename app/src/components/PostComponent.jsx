import styles from './styles/PostComponent.module.css'

const PostComponent = (props) => {
    const { post } = props;

    return(
        <div className={styles.container}>
            <p className={styles.title}>{post?.title}</p>
            <p className={styles.text}>{post?.body}</p>
        </div>
    )
}

export default PostComponent;
