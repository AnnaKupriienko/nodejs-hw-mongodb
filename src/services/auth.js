import { hashValue } from '../utils/hash.js';
import { UsersCollection } from '../db/models/userModel.js';

export const findUser = filter => UsersCollection.findOne(filter);

export const registerUser = async (data) => {
  const { password } = data;
  const hashPassword = await hashValue(password);
  return await UsersCollection.create({...data, password: hashPassword});
}

