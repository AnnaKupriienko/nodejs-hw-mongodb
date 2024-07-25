import { env } from '../utils/env.js';
import jwt from 'jsonwebtoken';
import { hashValue } from '../utils/hash.js';
import { UsersCollection } from '../db/models/userModel.js';
import { SMTP,TEMPLATES_DIR } from '../constants/contact-constants.js';
import { sendEmail } from '../utils/sendMail.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import createHttpError from 'http-errors';

export const findUser = filter => UsersCollection.findOne(filter);

export const registerUser = async (data) => {
  const { password } = data;
  const hashPassword = await hashValue(password);
  return await UsersCollection.create({...data, password: hashPassword});
}

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  };
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
    expiresIn: '15m',
  },
  );
  const resetPasswordTemplatePath = path.join(TEMPLATES_DIR, 'reset-password-email.html');
  const templateSourse = (await fs.readFile(resetPasswordTemplatePath)).toString();
  const template = handlebars.compile(templateSourse);
  const html= template({name: user.name, link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`});
  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reser your password',
    html,
})
};
export const resetPassword = async (payload) => {
  let entries;
  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (error) {
    if (error instanceof Error) {
      throw createHttpError(401, "Token is expired or invalid.");
    }
    throw error;
  };
  const user = await UsersCollection.findOne({
    email:entries.email,
    _id: entries.sub,
  });
  if (!user) {
    throw createHttpError(404, 'User not found');
  };
  const encryptedPassword = await hashValue(payload.password);
  await UsersCollection.updateOne(
    { _id: user._id },
  {password: encryptedPassword},
  );
};
