import {hashValue} from '../utils/hash.js';

export const findUser = filter => UsersCollection.findOne(filter);

export const registerUser = async (data) => {
  const { password } = data;
  const hashPassword = await hashValue(password);
  return await UsersCollection.create({...data, password: hashPassword});
}

