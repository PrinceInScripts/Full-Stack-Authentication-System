import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./public/temp/")
    },
    filename: (req, file, cb) => {
        let fileExtension="";
        if(file.originalname.split(".").length>1){
            fileExtension = file.originalname.substring(file.originalname.lastIndexOf("."))
        }
        let fileWithoutExtension=file.originalname
                                                 .toLowerCase()
                                                 .split("")
                                                 .join("-")
                                                 ?.split(".")[0];
        
        cb(null, `${fileWithoutExtension}-${Date.now()}${Math.ceil((Math.random()*1e5))}${fileExtension}`)    
    }
})

export const upload = multer({
    storage,
    limits:{
        fileSize: 100 * 10000 * 1000
    }
});

