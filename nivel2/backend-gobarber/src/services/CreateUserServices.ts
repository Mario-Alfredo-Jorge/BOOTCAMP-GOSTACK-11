import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../Errors/AppError';
import Users from '../models/Users';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUsersServices {
  public async execute({ name, email, password }: Request): Promise<Users> {
    const userRepository = await getRepository(Users);

    const checkUserExits = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExits) {
      throw new AppError(
        'The email is already used by another user, try with other email',
        401,
      );
    }

    const hashedPassword = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUsersServices;
