import { getRepository } from 'typeorm';
import User from '../models/user';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/appErrors';

interface Params {
  email: string;
  password: string;
}

interface AuthReturn {
  user: User;
  token: string;
}

class CreateAuthenticateUserService {
  public async execute({ email, password }: Params): Promise<AuthReturn> {
    const userRepository = getRepository(User);

    const userFounded = await userRepository.findOne({ where: { email } });

    if (!userFounded) throw new AppError('Email/Password not matched');

    const passwordMatched = await compare(password, userFounded.password);

    if (!passwordMatched) throw new AppError('Email/Password not matched');

    const token = sign({}, authConfig.jwt.secret, {
      subject: userFounded.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    delete userFounded.password;

    return { user: userFounded, token };
  }
}

export default CreateAuthenticateUserService;
