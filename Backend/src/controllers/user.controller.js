import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, role } = req.body;
    if ([name, email, password, role].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User already exist")
    }

    const user = await User.create({ 
        name, 
        email, 
        password, 
        role,  
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(createdUser._id);

    const options = {
        httpOnly: true,
        secure: true,
        maxAge: process.env.COOKIE_EXPIRY, 
    }
    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);

    return res.status(201).json(
        new ApiResponse(200, { user: createdUser, accessToken }, "User Registered Successfully")
    )

});

const generateAccessAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
}

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required")
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const ispasswordValid = await user.isPasswordCorrect(password);
    if (!ispasswordValid) {
        throw new ApiError(401, "Invalid user Crendetials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const logedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        maxAge: process.env.COOKIE_EXPIRY, 
    }
    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);

    return res.status(200).json(
        new ApiResponse(200, { user: logedInUser, accessToken }, "User LoggedIn Successfully")
    )
});

export { 
    registerUser, 
    loginUser,
}