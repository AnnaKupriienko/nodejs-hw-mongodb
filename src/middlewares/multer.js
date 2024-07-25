import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/contact-constants.js';

const storage = multer.diskStorage({
    destination: TEMP_UPLOAD_DIR,
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const filename = `${uniqueSuffix}_${file.originalname}`;
        cb(null, filename);
    },
});
export const upload = multer({ storage })
