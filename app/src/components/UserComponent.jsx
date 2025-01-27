import styles from './styles/UserComponent.module.css'


const UserComponent = ( props ) => {
    const { id, name } = props;

    return(
        <div className={styles.container}>
            <div>
                <p className={styles.textName}>{name}</p>
                <p className={styles.textId}>id: {id}</p>
            </div>
        </div>
    )
}

export default UserComponent;