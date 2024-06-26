import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
} from '../controllers/contacts.js';

const router = Router();

export default router;


    router.get('/contacts', getContactsController);

    router.get('/contacts/:contactId', getContactsByIdController);
