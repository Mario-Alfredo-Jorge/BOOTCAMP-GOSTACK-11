import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Users from '../models/Users';
import authConfig from '../config/auth';
import AppError from '../Errors/AppError';

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
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { expiresIn, secret } = authConfig.jwt;
    const token = sign({}, secret, { subject: user.id, expiresIn });
    return { user, token };
  }
}

export default SessionsUsersServices;
