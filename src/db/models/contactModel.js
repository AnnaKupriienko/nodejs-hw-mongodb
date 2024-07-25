import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contact-constants.js';

const contactsShema = new Schema({
 photo: { type: String },
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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
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
contactsShema.post('save', (error, data, next) => {
    error.status = 400;
    next()
})

export const contactsCollection = model('contacts', contactsShema);
