import { Schema, model } from 'mongoose';


const usersShema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
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
