import { Router } from 'express';
import multer from 'multer';
import CreateUsersServices from '../services/CreateUserServices';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import multerConfig from '../config/upload';

const upload = multer(multerConfig);
const UsersRouter = Router();

UsersRouter.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  (req, res) => {
    console.log(req.file);
    return res.json({ ok: true });
  },
);

UsersRouter.post('/', async (req, res) => {
  try {
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
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default UsersRouter;
