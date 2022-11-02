require("dotenv").config();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { BlobServiceClient } = require("@azure/storage-blob");
const path = require('path');

const {
    FILE_PATH_STORAGE,
    AZURE_STORAGE_CONNECTION_STRING,
    URL_AZURE_STORAGE_DOCUMENT,
    ACCOUNT_NAME
} = process.env;

 const containerName = "documentos";

 const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);


 function generatePdf(data, path, namePDF)   {

    const fullPathDocument = FILE_PATH_STORAGE + path;
    const resDta = [];
    
    let documentPDF = new PDFDocument({ margin: 10 });

    generateHeader(documentPDF);
    title(documentPDF);
    generateCustomerInformation(documentPDF, data);
    generateInvoiceTable(documentPDF, data);

    documentPDF.end();
    documentPDF.pipe(fs.createWriteStream(fullPathDocument));

    processAzure(fullPathDocument, namePDF)
            .then((res) => {
                    console.log("respuesta de la promesa ");
            })
            .catch((err) => {
                console.error(err.message);

                return  resDta.push({"pdf": null, "message": err.message});
            });

    resDta.push({ "pdf": `/${namePDF}.pdf`, "message": "success"});

    return resDta;
}
 
async function processAzure(fullPathDocument, namePDF)
{ 
    try {
            const containerClient = blobServiceClient.getContainerClient(containerName);
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

async function dowloadFilePDF(namePDF)
{
    
    try {
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blobClient =  containerClient.getBlobClient(namePDF);
      const downloadBlockBlobResponse = await blobClient.download();
      
      const downloaded = (
        await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
      ).toString();

      //console.log("Downloaded blob content:", downloaded);
       return downloaded;

    } catch (error) {
        console.error(error.message);
    }

}

async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on("data", (data) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on("error", reject);
    });
}

function title(doc)
{
    doc
        .fontSize(16)
        .text("PROGRAMA DE RECUPERACIÓN DENTAL 2022", 50, 120, { align: 'center'})
        .moveDown();
}

function generateHeader(doc) {

    doc
        .image('assets/images/logo.jpeg', 500, 45, { width: 50, align: 'left' })
        .fillColor('#444444')
        .fontSize(10)
        .text('Fecha vigencia:', 60, 57)
        .text('Hasta: 25/09/2022', 60, 77)
        .moveDown();
}

function generateFooter(doc, position) {
    doc.fontSize(
        10,
    ).text(
        'Si tiene alguna duda y/o inconveniente, contáctese con Maria Luisa Reyes al teléfono 954234991 ' +
        '* Sólo para CMD RedSalud: "Agende su cita de DIAGNÓSTICO DENTAL en la Clínica Dental indicada en este documento llamando al 600 718 6000 opción 3. El día de su cita presente este documento en la recepción para hacer ' +
        'válido el Programa de Prótesis Dental en RedSalud."',
        50,
        position,
        { align: 'justify', width: 500 },
    );
}

function generateCustomerInformation(doc, data)
{
    const operativosTerrenos = {};
    let myArrayOfItems = [
        'Diagnóstico y confección de una prótesis Acrílica o Metálica removible, de preferencia superior, total o parcia',
        'Tratamiento de caries y extracciones (siempre que estas sean requeridas con el fin de confeccionar la prótesis).',
        'Solo en el caso de que el paciente este desdentado o posea pocas piezas dentales, se podría considerar la confección de ambas prótesis, lo cual podría incluir un gasto adicional por parte del trabajador. (Modalidad de pago será acordada directamente con el Centro Dental).'
    ];
        //${invoice.invoice_nr}
        //${new Date()}
        //${invoice.subtotal - invoice.paid}


    doc
        .fontSize(12)
        .text(`NOMBRE: SALVO HORMAZABAL JORGE MARCELINO`, 50, 160)
        .text(`RUT: 8.495.207-9`, 50, 180)
        .text(`EMPRESA: CONSTRUCTORA E INMOBILIARIA HECTOR ROMAN Y OTRO LTDA.`, 50, 200)
        .moveDown()
        .text("Estimado trabajador: Usted es beneficiario del Programa de Recuperación Dental para trabajadores y esposas de empresas Socias de la Cámara Chilena de la Construcción. Este programa social tiene un tope de $290.000 (Arica, Punta Arenas y Coyhaique $390.000) para el tratamiento y considera las siguientes prestaciones:",
            50,
            220,
            {
                width: 500,
                align: 'justify'
            })
        .moveDown()
        .list(myArrayOfItems, 80, 300, { width: 400 })
        .moveDown(1);
}

function generateInvoiceTable(doc, data)
{
    let i,
        invoiceTableTop = 470;

        doc.text("PARA COMENZAR SU TRATAMIENTO DEBE SOLICITAR HORA EN UNO DE ESTOS CENTROS:",
        50, 430,
        {
            width: 500,
            align: 'justify'
        }).moveDown(4);

        doc.font("Helvetica-Bold");

        generateTableRow(
            doc,
            invoiceTableTop,
            "Comuna",
            "Prestador",
            "Direccion",
            "Telefono"
        );

    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    //TODO: example one row table
    generateTableRow(
        doc,
        invoiceTableTop + (1 + 1) * 20,
        "comuna prueba",
        "prestador prueba",
        "direccion ",
        "1232314"
    );

    generateTableRow(
        doc,
        invoiceTableTop + (1 + 2) * 20,
        "comuna prueba",
        "prestador prueba",
        "direccion ",
        "1232314"
    );


    //TODO: cambiar la variable const position por el que esta dentro del ciclo for
    const position = invoiceTableTop + (1 + 2) * 20;
    /*
    for (i = 0; i < data.items.length; i++) {
        const item = data.items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.item,
            item.description,
            formatCurrency(item.amount / item.quantity),
            item.quantity,
            formatCurrency(item.amount)
        );

        generateHr(doc, position + 20);
    }
    */



    afterItems(doc, position + 30);


}

function afterItems(doc, position)
{
    doc
        .text(
            "AL MOMENTO DE LA ATENCIÓN, DEBE PRESENTAR LA CARTA ORIGINAL TIMBRADA Y FIRMADA POR SU EMPRESA."
        , 50, position)
        .moveDown(2)
        .text("* Esta carta es personal e intransferible. Está estrictamente prohibido ceder a otra persona.", 50, position + 30)
        .moveDown(2)
        .text("NOMBRE RESPONSABLE EMPRESA: ____________________________________________", 50, position + 50)
        .moveDown()
        .text("FIRMA Y TIMBRE: ____________________________________________", 50, position + 70)
        .moveDown(2)
    ;

    generateFooter(doc, position + 120);
}

function generateTableRow(doc, y, comuna, prestador, direccion, telefono) {
    doc
        .fontSize(10)
        .text(comuna, 50, y)
        .text(prestador, 150, y)
        .text(direccion, 280, y, { width: 90, align: 'right' })
        .text(telefono, 370, y, { width: 90, align: 'right' });

}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

module.exports = {generatePdf, dowloadFilePDF}