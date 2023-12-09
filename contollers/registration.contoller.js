import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

const userRegistation = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body
    // validation here
    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All field are required")
    }

    const existedUser = await User.findOne({ email })
    // email checking 
    if (existedUser) {
        throw new ApiError(406, "this email id is already exist");

    }

    // model 

    const createdUser = await User.create({
        name,
        email,
        password
    })

    if (!createdUser) {
        throw new ApiError(509, "something went wrong")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )


})


export { userRegistation };