const multer = require("multer");


const excelFilter = (req, file, cb) => {
    if (
        file.mimetype.includes("excel") ||
        file.mimetype.includes("spreadsheetml")
    ) {
        cb(null, true);
    } else {
        cb("Por favor solo subir archivos en formato excel.", false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/assets/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, `${file.originalname}`);
    },
});


var uploadFile = multer({ storage: storage, fileFilter: excelFilter });

module.exports = uploadFile;