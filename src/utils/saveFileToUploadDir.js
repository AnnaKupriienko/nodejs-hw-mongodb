import path from 'node:path';
import fs from 'node:fs/promises';
import { PUBLIC_DIR } from '../constants/contact-constants.js';

export const saveFileToUploadDir = async (file,filePath) => {
 const newPath = path.join(PUBLIC_DIR, filePath, file.filename);
  await fs.rename(file.path, newPath);
  return `/${filePath}/${file.filename}`;
};
