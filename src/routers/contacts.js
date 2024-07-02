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


const router = Router();

export default router;
router.get('/contacts',ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', isValidId(), ctrlWrapper(getContactsByIdController));
router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/contacts/:contactId',validateBody(updateContactSchema), ctrlWrapper(updateContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));


