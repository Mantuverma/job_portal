import mongoos from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
// import { Jwt } from "jsonwebtoken";

const userSchema = new mongoos.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: [true, "name is required"],
        unique: true,
        validator: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "name is required"],
        minlength: [6, "provide minmum 6 length"]
    },
    location: {
        type: String,
        default: "india"
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


export const User = mongoos.model("User", userSchema)