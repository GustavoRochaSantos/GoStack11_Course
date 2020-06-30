import { Router } from 'express';
import CreateAuthenticateUserService from '../services/createAuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createAuthenticatedUser = new CreateAuthenticateUserService();

  const { user, token } = await createAuthenticatedUser.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionRouter;
