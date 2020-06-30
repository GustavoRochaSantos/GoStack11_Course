import { getRepository } from 'typeorm';
import User from '../models/user';
import { hash } from 'bcryptjs';

import AppError from '../errors/appErrors';

interface Params {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ name, email, password }: Params): Promise<User> {
    const usersRepository = getRepository(User);

    const existUser = await usersRepository.findOne({ where: { email } });

    if (existUser) throw new AppError('Email address already exists.');

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;
