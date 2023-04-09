

import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import multer from 'multer';


dotenv.config();
const username=process.env.DB_USERNAME;
const password=process.env.db_password;


const storage= new GridFsStorage({
    url:`mongodb+srv://${username}:${password}@cluster0.i4nhnfk.mongodb.net/Blog?retryWrites=true&w=majority`,
    options:{useNewUrlParser:true},
    options: {useUnifiedTopology: true},
    file:(req,file)=>{
        const match=['image/png','image/jpg','image/jpeg'];
        
        if(match.indexOf(file.mimetype)!==-1){
            return `${Date.now()}-blog-${file.originalname}`;
        }
       
        return{
            
            bucketName:'Photos',
            filename:`${Date.now()}-blog-${file.originalname}`

        }
       
    }
})
export default multer({storage});