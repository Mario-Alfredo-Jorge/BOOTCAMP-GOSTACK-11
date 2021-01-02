import multer from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

const FilePath = resolve(__dirname, '..', '..', 'tmp');
export default {
  directory: FilePath,
  storage: multer.diskStorage({
    destination: FilePath,
    filename: (req, file, callback) => {
      const fileHase = randomBytes(10).toString('hex');
      const fileName = `${fileHase}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
