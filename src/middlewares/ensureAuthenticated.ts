import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppErrors from '../errors/appErrors';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authRequest = request.headers.authorization;

  if (!authRequest) throw new AppErrors('Invalid Token');

  const [, token] = authRequest.split(' ');

  const decodedToken = verify(token, authConfig.jwt.secret);

  const { sub } = decodedToken as TokenPayload;
  request.user = {
    id: sub,
  };
  return next();
}
