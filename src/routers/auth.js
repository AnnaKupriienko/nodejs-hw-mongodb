import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema, userSignInUserSchema } from '../validation/auth.js';
import { registerUserController, signInUserController,refreshController } from '../controllers/auth.js';



const authRouter = Router();

authRouter.post('/auth/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
authRouter.post('/auth/login', validateBody(userSignInUserSchema), ctrlWrapper(signInUserController));
authRouter.post('/auth/refresh', ctrlWrapper(refreshController));
authRouter.post('/auth/logout',);
export default authRouter;
