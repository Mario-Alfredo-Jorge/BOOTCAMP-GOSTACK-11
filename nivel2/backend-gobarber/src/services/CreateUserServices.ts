import { getRepository } from 'typeorm';
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
      throw new Error(
        'The email is already used by another user, try with other email',
      );
    }

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUsersServices;
