import { Router } from 'express';
import {
  getContactsController,
    getContactsByIdController,
  createContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

export default router;
router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));
router.post('/contacts', ctrlWrapper(createContactController));

