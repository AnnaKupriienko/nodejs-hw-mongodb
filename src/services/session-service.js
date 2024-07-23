import { SessionsCollection} from "../db/models/sessionModal.js";
import { randomBytes } from 'node:crypto';
import { ACCESS_TOKEN_LIFETIME,REFRESH_TOKEN_LIFETIME } from "../constants/contact-constants.js";

export const findSession = (filter) => {
   return SessionsCollection.findOne(filter);
}

export const createSession = async (userId) => {
    await SessionsCollection.deleteOne({ userId });
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
    const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFETIME);
    const rerfeshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_LIFETIME);
    return SessionsCollection.create({
        userId,
        accessToken: accessToken,
        refreshToken: refreshToken,
        accessTokenValidUntil: accessTokenValidUntil,
        refreshTokenValidUntil: rerfeshTokenValidUntil
    })
};

export const deleteSession = (filter) => SessionsCollection.deleteOne(filter);
