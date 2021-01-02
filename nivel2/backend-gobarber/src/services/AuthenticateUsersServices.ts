import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Users from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}

class SessionsUsersServices {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = await getRepository(Users);
    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, '799e0f61d6c4524ccd8e2b4cbb8c186b', {
      subject: user.id,
      expiresIn: '1d',
    });
    return { user, token };
  }
}

export default SessionsUsersServices;
