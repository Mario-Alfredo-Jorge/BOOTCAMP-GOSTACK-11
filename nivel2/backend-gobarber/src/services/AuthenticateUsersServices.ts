import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import Users from '../models/Users';

interface Request {
  email: string;
  password: string;
}

class SessionsUsersServices {
  public async execute({ email, password }: Request): Promise<{ user: Users }> {
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

    return { user };
  }
}

export default SessionsUsersServices;
