import { Schema, model } from 'mongoose';
import {emailRegexp} from '../../constants/users-constants.js';


const usersShema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

},
    {versionKey: false,
    timestamps: true,
    },
);
export const UsersCollection = model('users', usersShema);
