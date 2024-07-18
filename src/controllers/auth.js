import { registerUser,findUser} from "../services/auth.js";
import createHttpError from 'http-errors';
import {compareValue} from '../utils/hash.js';

export const registerUserController = async (req, res) => {
    const { email } = req.body;
    const existUser = await findUser({email})

    if (existUser) {
        throw createHttpError(409, 'Email already in use');
    }
    const newUser = await registerUser(req.body);
    const data = {
        name: newUser.name,
        email: newUser.email,
    };

    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data: data,
    })
};

export const signInUserController = async (req, res) => {
    const { email, password } = req.body;
    console.log(`Received login request for email: ${email}`);
    const user = await findUser({ email });
    if (!user) {
        throw createHttpError(401, 'Email not found');
    }
    const isPasswordValid = await compareValue(password, user.password);
    if (!isPasswordValid) {
        throw createHttpError(401, 'Password is not valid');
    }
    res.status(200).json({
        status: 200,
        message: 'Successfully logged in an user!',
    })
}
