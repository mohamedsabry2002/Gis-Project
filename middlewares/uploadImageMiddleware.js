const multer = require('multer');
const { v4:uuidv4 } = require('uuid');
const path = require('path');


const multerStorage = multer.diskStorage({
    destination : function(req, file, cb){
        //cb(null,path.join(__dirname,"../uploads/questionsImage"));
        cb(null,("uploads/images"));

    },
    filename : function(req, file, cb){
        const ext = file.mimetype.split('/')[1];
        const filename = `image-${uuidv4()}-${Date.now()}.${ext}`;
        cb(null,filename);
    },
});
//const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
const upload = multer({ storage: multerStorage });

module.exports = upload;

