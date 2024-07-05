import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { registerUserSchema } from '../validation/auth.js'
import { registerUserController } from '../controllers/auth.js'

const router = Router();

export default router;
router.post('/auth/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
router.get('/contacts',ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactsByIdController));
router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/contacts/:contactId',isValidId,validateBody(updateContactSchema), ctrlWrapper(updateContactController));
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));


