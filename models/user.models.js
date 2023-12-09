import mongoos from "mongoose";
import validator from "validator";

const userSchem = new mongoos.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: validator.isEmail
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "india"
    },
}, { timestamps: true });


export const User = mongoos.model("User", userSchem)