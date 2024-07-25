import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema, userSignInUserSchema ,requestResetEmailSchema,resetPasswordSchema} from '../validation/auth.js';
import { registerUserController, signInUserController,refreshController,logoutController,requestResetEmailController,resetPasswordController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/auth/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
authRouter.post('/auth/login', validateBody(userSignInUserSchema), ctrlWrapper(signInUserController));
authRouter.post('/auth/refresh', ctrlWrapper(refreshController));
authRouter.post('/auth/logout', ctrlWrapper(logoutController));
authRouter.post('/auth/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));
authRouter.post('/auth/reset-pwd',validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));
export default authRouter;
