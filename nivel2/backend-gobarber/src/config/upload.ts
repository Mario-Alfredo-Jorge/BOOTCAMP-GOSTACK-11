import multer from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp'),
    filename: (req, file, callback) => {
      const fileHase = randomBytes(10).toString('hex');
      const fileName = `${fileHase}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
