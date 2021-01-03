import { Router } from 'express';
import multer from 'multer';
import CreateUsersServices from '../services/CreateUserServices';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import UploadUsersAvatarServices from '../services/UploadUsersAvatarServices';
import multerConfig from '../config/upload';

const upload = multer(multerConfig);
const UsersRouter = Router();

UsersRouter.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  async (req, res) => {
    const uploadFile = new UploadUsersAvatarServices();

    const user = await uploadFile.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    // @ts-expect-error will be any error in the next line  without this commentary
    delete user.password;
    return res.json(user);
  },
);

UsersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUsersServices();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  // @ts-expect-error will be any error in the next line  without this commentary
  delete user.password;
  return res.json(user);

});

export default UsersRouter;
