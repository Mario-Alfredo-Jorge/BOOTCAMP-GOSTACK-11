import { Router } from 'express';
import CreateUsersServices from '../services/CreateUserServices';

const UsersRouter = Router();

UsersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUsersServices();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default UsersRouter;
