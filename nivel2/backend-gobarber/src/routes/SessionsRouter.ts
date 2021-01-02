import { Router } from 'express';
import AuthenticateUserServices from '../services/AuthenticateUsersServices';

const UsersRouter = Router();

UsersRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserServices();

    const { user } = await authenticateUser.execute({
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
