import mongoose, { Schema } from "mongoose"
import validator from 'validator'
import uniqueValidator from 'mongoose-unique-validator'

const userStructure = {
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Please, enter a email.'],
        validate: [validator.isEmail, 'Please, enter a valid email.']
    },
    password: {
        type: String,
        required: [true, 'Please, enter a password.'],
        min: [8, 'The password must be at least 8 characters long.'],
        max: [255, 'The password must not be longer than 255 characters.'],
    },
    firstName: {
        type: String,
        uppercase: true,
        required: [true, 'Please, enter your first name.'],
        validate: [validator.isAlpha, 'Please, enter a valid name.']
    },
    lastName: {
        type: String,
        uppercase: true,
        required: [true, 'Please, enter your last name.'],
        validate: [validator.isAlpha, 'Please, enter a valid name.']
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    country: String,
    worksAt: String,
    relationship: String,
    followers: [],
    following: [],
}

const opt = {
    timestamps: true
}

const userSchema = new Schema(userStructure, opt)
userSchema.plugin(uniqueValidator, { message: '{PATH} should be unique' })

const User = mongoose.model('User', userSchema)
export default User