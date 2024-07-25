import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';
import {getContactsController, getContactsByIdController,createContactController,updateContactController,deleteContactController,} from '../controllers/contacts.js';
import { createContactSchema, updateContactSchema} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);

router.get('/contacts',ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactsByIdController));
router.post('/contacts', upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/contacts/:contactId', upload.single('photo'),isValidId,validateBody(updateContactSchema), ctrlWrapper(updateContactController));
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
