import { registerUser,findUser} from "../services/auth.js";
import createHttpError from 'http-errors';
import { compareValue } from '../utils/hash.js';
import {createSession} from "../services/session-service.js";


const setupResponseSession = (res, { refreshToken, refreshTokenValidUntil, _id }) => {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });

    res.cookie("sessionId", _id, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });
};

export const registerUserController = async (req, res) => {
    const { email } = req.body;
    const existUser = await findUser({ email });
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
    const user = await findUser({ email });
    if (!user) {
        throw createHttpError(401, 'Email not found');
    }
    const isPasswordValid = await compareValue(password, user.password);
    if (!isPasswordValid) {
        throw createHttpError(401, 'Password is not valid');
    }
    const session = await createSession(user._id);
    setupResponseSession(res, session);
    res.status(200).json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: session.accessToken,
        }
    });
};
export const refreshController = async (req, res) => {

}
