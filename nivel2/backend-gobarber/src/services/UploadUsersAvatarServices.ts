import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Users from '../models/Users';
import uploadConfig from '../config/upload';
import AppError from '../Errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}
class UploadUsersAvatarServices {
  public async execute({ user_id, avatarFilename }: Request): Promise<Users> {
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne(user_id);

    if (!user)
      throw new AppError('Only authenticated users can change avatar', 401);

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UploadUsersAvatarServices;
