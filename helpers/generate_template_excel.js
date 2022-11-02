const excel = require('excel4node');
const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();


const {
    FILE_PATH_STORAGE,
    AZURE_STORAGE_CONNECTION_STRING
} = process.env;



 const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

function generateTemplateExcel(nameFile)
{
    let workBook = new excel.Workbook();
    let trabajadoresSheet = workBook.addWorksheet('Trabajadores');

    const fullPathDocument = FILE_PATH_STORAGE + nameFile;

    let styleNormal = workBook.createStyle({
        font:{
            color: '#000000',
            size: 14,
            bold: true
        },
        border:{
            left: {
                style: 'double',
                color: '#000000',
            },
            right: {
                style: 'double',
                color: '#000000',
            },
            top: {
                style: 'double',
                color: '#000000',
            },
            bottom: {
                style: 'double',
                color: '#000000',
            }
        },
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        }
    });

    buildTrabajadores(trabajadoresSheet, styleNormal);

    workBook.write(fullPathDocument);

    processAzure(fullPathDocument, namePDF)
    .then((res) => {
            console.log("respuesta de la promesa ");
    })
    .catch((err) => {
        console.error(err.message);

        return  resDta.push({"pdf": null, "message": err.message});
    });

    return true;


}

async function processAzure(fullPathDocument, namePDF)
{ 
    try {
            const containerClient = blobServiceClient.getContainerClient("documentos");
            const filePdf = fullPathDocument;
            
            console.log("path full name file pdf");
            console.log(filePdf);
            console.log(namePDF);
            
            // upload file
            await containerClient.getBlockBlobClient(namePDF).uploadFile(fullPathDocument);

    } catch (error) {
        console.error(error.message);
    }
}

function buildTrabajadores(trabajadores, styleNormal)
{
    trabajadores.cell(1, 1, 1, 5, true).string('Trabajadores').style(styleNormal);

    trabajadores.cell(2, 1).string('Rut').style(styleNormal);
    trabajadores.cell(2, 2).string('Nombres').style(styleNormal);
    trabajadores.cell(2, 3).string('Apellidos').style(styleNormal);
    trabajadores.cell(2, 4).string('Fecha Nacimiento').style(styleNormal);
    trabajadores.cell(2, 5).string('Sexo').style(styleNormal);

    trabajadores.column(1).setWidth(30);
    trabajadores.column(2).setWidth(30);
    trabajadores.column(3).setWidth(30);
    trabajadores.column(4).setWidth(30);
    trabajadores.column(5).setWidth(30);

    return trabajadores;
}


module.exports = { generateTemplateExcel };