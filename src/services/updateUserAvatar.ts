import { getRepository } from 'typeorm';
import User from '../models/user';
import updateConfig from '../config/upload';
import path from 'path';
import fs from 'fs';

import AppError from '../errors/appErrors';

interface Params {
  user_id: string;
  filename: string;
}

class UpdateUserAvatar {
  public async execute({ user_id, filename }: Params): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) throw new AppError('User not found.');

    if (user.avatar) {
      const userAvatarPath = path.join(updateConfig.directory, user.avatar);

      // -- Só executa se o arquivo físico realmente existir
      const fileExists = await fs.promises.stat(userAvatarPath);

      if (fileExists) {
        await fs.promises.unlink(userAvatarPath);
      }
    }

    user.avatar = filename;

    await userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default UpdateUserAvatar;
