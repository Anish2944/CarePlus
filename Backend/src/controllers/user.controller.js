import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, role, phoneNumber } = req.body;
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
        phoneNumber  
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(createdUser._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
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
})

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            refreshToken: null
        }
    }, {
        new: true
    })

    const options = {
        htttpOnly: true,
        secure: true,
        maxAge: 0,
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user logged out"))

})

const getCurrentUser = asyncHandler(async (req, res) => {

    return res.status(200).json(new ApiResponse(200, req.user, "Current user fetchd Successfully"))
})

const accessRefreshToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    // Verify the refresh token
    let decodedToken;
    try {
        decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    // Find the user by ID from the decoded token
    const user = await User.findById(decodedToken._id);
    if (!user) {
        throw new ApiError(401, "Invalid refresh token");
    }

    // Compare the incoming refresh token with the one stored in the user's record
    if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(401, "Refresh token is expired or does not match");
    }

    // Generate new access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    // Update the user's refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    // Set options for cookies (secure: true should only be used in production)
    const options = {
        httpOnly: true,
        secure: true,
        maxAge: process.env.COOKIE_EXPIRY,
    };

    // Send the new tokens in cookies and the response body
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber } = req.body;

    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    return res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!(newPassword === confirmPassword)) {
        throw new ApiError(400, "Passwords do not match");
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid old password");
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

export { 
    registerUser, 
    loginUser,
    logout,
    getCurrentUser,
    accessRefreshToken,
    updateAccountDetails,
    changeCurrentPassword
}