import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contact-constants.js';

const contactsShema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: typeList,
        required: true,
        default: 'personal',
    },
},
    {versionKey: false,
    timestamps: true,
    },
);
contactsShema.pre('findOneAndUpdate', function (next) {
    this.options.new = true,
    this.options.runValidators = true;
    next();
});

export const contactsCollection = model('contacts', contactsShema);
