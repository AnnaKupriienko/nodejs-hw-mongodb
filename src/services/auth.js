import { UsersCollection } from "../db/models/userModel.js"

export const registerUser = async (data) => {
  return await UsersCollection.create(data);
}

