import { Router } from 'express';
import AuthenticateUserServices from '../services/AuthenticateUsersServices';

const UsersRouter = Router();

UsersRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserServices();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  // @ts-expect-error will be any error in the next line  without this commentary
  delete user.password;

  return res.json({ user, token });

});

export default UsersRouter;
