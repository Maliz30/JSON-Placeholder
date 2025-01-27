import { useEffect, useState } from "react";
import { usersService } from "../services/usersService";
import { useNavigate } from "react-router-dom";
import styles from './styles/Home.module.css'
import UserComponent from "../components/UserComponent";
import { sendEmailService } from "../services/sendEmailService";
import { createExcelFile, downloadExcelFile } from "../utils/exportUtils";
import { generateReportData } from "../utils/dataUtils";

const Home = () => {
    const navigate = useNavigate(); 
    const [users, setUsers] = useState([]);
    const [numPosts, setNumPosts] = useState(0);
    const [email, setEmail] = useState("");
    const [files, setFiles] = useState();

    const fetchUsers = async () => {
        try{ 
            const fetchedUsers = await usersService();
            setUsers(fetchedUsers);
            
        } catch(err){
            console.error(err);
            alert("Ocorreu um erro ao carregar dados dos usuários. Recarregue a página para tentar novamente!");
        }
    }

    const handleUserClick = (userId) => {
        navigate(`/user/${userId}`)
    }

    const handleExportExcel = async () => {

        try{
            const reportData = await generateReportData(users);
            const fileBlob = await createExcelFile(reportData);
            downloadExcelFile(fileBlob);
    
            setFiles({excel: fileBlob});
        } catch(err){
            console.error(err)
            alert("Ocorreu um erro gerar o arquivo Excel. Tente novamente!");
        }
    }

    const handleSendEmail = async () => {
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        
        if (!isValidEmail(email)) {
            alert("Por favor, insira um email válido!")
            return;
        } 

        try{
            if(!files?.excel){
                const reportData = await generateReportData(users);
                const fileBlob = await createExcelFile(reportData);
                setFiles({excel: fileBlob});
            }
            
            if(!files?.pdf){}

            await sendEmailService(email, files);
            alert("O email foi enviado com sucesso!");

        } catch(err){
            alert("Falha ao realizar o envio do email. Tente novamente!");
            console.error(err);
        }
        
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        <div className={styles.container}>
            <div className={styles.innerContainerLeft}>
                <p className={styles.textTitle}>Usuários</p>
                    {users ? (
                        users.map((user) => (
                            <div key={user.id} onClick={() => handleUserClick(user.id)} className={styles.btnUser}>
                                <UserComponent id={user.id} name={user.name}/>
                            </div>
                        ))
                    ) : (
                        <p>Não há usuários!</p>
                    )}
            </div>
            <div className={styles.innerContainerRight}>
                <p className={styles.textSecondTitle}>Relatório</p>

                {/* <button className={styles.btnStandard}>Acessar</button>
                <button className={styles.btnStandard}>Exportar PDF</button> */}
                <button className={styles.btnStandard} onClick={handleExportExcel}>Baixar Excel</button>

                <br/><br/><br/><br/>

                <input placeholder="Seu email" className={styles.inputStandard} onChange={(e) => setEmail(e.target.value)}/>
                <button className={styles.btnStandard} onClick={handleSendEmail}>Enviar por email</button>
            </div>
        </div>
    )
}

export default Home;