import ExcelJS from 'exceljs';
import { saveAs } from "file-saver";

export const createExcelFile = async (reportData) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Relatório de Usuários');

    sheet.columns = [
        { header: 'ID do Usuário', key: 'id' },
        { header: 'Nome do Usuário', key: 'name' },
        { header: 'Quantidade de Posts', key: 'numPosts' },
        { header: 'Média de Caracteres dos Posts', key: 'averageCaracters' },
    ];

    if (!reportData || Object.keys(reportData).length === 0) {
        throw new Error("Não há dados para gerar o relatório.");
    }

    for (let data of Object.values(reportData)) {
    sheet.addRow({
        id: data.id,
        name: data.userName,
        numPosts: data.numPosts,
        averageCaracters: data.averageCaracters
    });
    }

    try {
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        return blob;
    } catch (err) {
        console.error(err);
    }
};

export const downloadExcelFile = (fileBlob) => {
    try{
        if (!fileBlob) {
            throw new Error("Não foi possível gerar o arquivo.");
        }

        saveAs(fileBlob, "relatorio-de-usuarios.xlsx");
    } catch(err){
        console.error(err);
    }
}
