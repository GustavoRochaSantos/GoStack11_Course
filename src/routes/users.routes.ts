import { Router, json } from 'express';
import CreateUserService from '../services/createUserService';
import uploadConfig from '../config/upload';
import multer from 'multer';
import UpdateUserAvatar from '../services/updateUserAvatar';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({ name, email, password });

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatar();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      filename: request.file.filename,
    });

    return response.json(user);
  },
);

export default usersRouter;
