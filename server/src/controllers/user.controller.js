import { AsyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { userLoginType, userRolesEnum } from "../constant.js";
import {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
} from "../utils/Mail.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { uploadCloudinary } from "../utils/cloudniary.js";
import { getMongoosePaginationOption } from "../utils/helpers.js"

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating the access token"
    );
  }
};

const userRegistration = AsyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
    isEmailVerified: false,
    role: role || userRolesEnum.USER,
  });

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  const mailgenContent = await emailVerificationMailgenContent(
    user.username,
    `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`
  );

  await sendEmail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent,
  });

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry"
  );

  if (!createUser) {
    throw new ApiError(500, "user not created");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createUser,
        "Users registered successfully and verification email has been sent on your email."
      )
    );
});

const logInUser = AsyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const user = await User.findOne({
    $or: [
      { email: usernameOrEmail.toLowerCase() },
      { username: usernameOrEmail }, 
    ],
  });

  if (!user) {
    throw new ApiError(401, "Invalid crdentials");
  }

  if (user.loginType !== userLoginType.EMAIL_PASSWORD) {
    throw new ApiError(
      401,
      "You have previously registered using " +
        user.loginType?.toLowerCase() +
        ". Please use the " +
        user.loginType?.toLowerCase() +
        " login option to access your account."
    );
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  const options = {
    httpOnly: true,
    secure: true,
    // secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = AsyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
    // secure:process.env.NODE_ENV==='prodcution'
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiError(200, {}, "User Logout Successfully"));
});

const verifyEmail = AsyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    throw new ApiError(401, "email verification token is missing");
  }

  let hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Token is invalid and expired");
  }

  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpiry = undefined;

  user.isEmailVerified = true;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { isEmailVerified: true },
        "Email verified successfully"
      )
    );
});

const resendEmailVerification = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  const mailgenContent = await emailVerificationMailgenContent(
    user?.username,
    `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`
  );

  await sendEmail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Mail has been sent to your mail ID"));
});

const refreshAccessToken = AsyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(404, "Unautorized request");
  }

  try {
    const decodedToken = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Invalid or expired refresh token");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
      // secure:process.env.NODE_ENV === "production"
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const forgotPassword = AsyncHandler(async (req, res) => {
  const { usernameOrEmail } = req.body;

  const user = await User.findOne({
    $or: [
      { email: usernameOrEmail.toLowerCase() }, 
      { username: usernameOrEmail }, 
    ],
  });

  if (!user) {
    throw new ApiError("User Does not exist");
  }

  const { unhashedToken, hashedToken, tokenExpiry } =
    await user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordTokenExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  const mailgenContent = await forgotPasswordMailgenContent(
    user?.username,
    `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/reset-password/${unhashedToken}`
  );

  await sendEmail({
    email: user?.email,
    subject: "Reset Your Password",
    mailgenContent,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset mail has been sent on your mail id"
      )
    );
});

const resetForgotPassword = AsyncHandler(async (req, res) => {
  const { resetPasswordToken } = req.params;
  const { newPassword } = req.body;

  let hashedToken = crypto
    .createHash("sha256")
    .update(resetPasswordToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(401, "ResetPasswordToken is invalid or expired");
  }

  user.password = newPassword;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});

const changeCurrentPassword = AsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const assignRole = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(401, "User does not existed");
  }

  user.role = role;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Role Changed for user successfully"));
});

const getCurrentUser = AsyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        req.user,
        "Current User detials fetched Successfully"
      )
    );
});

const updateUserAvatar=AsyncHandler(async (req,res)=>{
  const avatarLocalPath=req.file?.path;

  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is missing")
  }

  const avatar=await uploadCloudinary(avatarLocalPath)

  if(!avatar){
    throw new ApiError(400,"Error while uploading on avatar file")
  }

  const user=await User.findByIdAndUpdate(
       req.user?._id,
       {
        $set:{
          avatar:avatar?.url
        }
       },
       {new:true}
  ).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordTokenExpiry")

 return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              user,
              "Avatar update successfully"
            )
          )

})

const updateProfile=AsyncHandler(async (req,res)=>{
    const {firstName,lastName,username}=req.body

    const user=await User.findById(req.user._id)

    const updateUser=await User.findByIdAndUpdate(
      req.user._id,
      {
        $set:{
          firstName,
          lastName,
          username:username || user.username
        }
      },
      {new:true}
    ).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordTokenExpiry")

    return res
              .status(200)
              .json(
                new ApiResponse(
                  200,
                  updateUser,
                  "profile updated successfully"
                )
              )

})

const addUserByAdmin = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  if (req.user?.role !== "SUPER_ADMIN") {
    throw new ApiError(401, "Only Super Admin can add user");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(401, "User is Already existed");
  }

  const user = await User.create({
    email,
    username,
    password,
    role: role || userRolesEnum.USER,
    isEmailVerified: true,
  });

  await user.save({ validateBeforeSave: false });

  const newUser=await User.findById(user?._id).select(
    "-password"
  )

  return res
    .status(200)
    .json(new ApiResponse(200, newUser, "User added Successfully"));
});


const deleteUserByAdmin=AsyncHandler(async (req,res)=>{
  const {userId}=req.params

  const user=await User.findById(userId)

  if(!user){
    throw new ApiError(404,"User is not existed")
  }

  const deletedUser=await User.findByIdAndDelete(userId).select("-password")

  return res
           .status(200)
           .json(
            new ApiResponse(
              200,
              deletedUser,
              "User deleted Successfully"
            )
           )
})

const getAllUser=AsyncHandler(async (req,res)=>{
    const {page=1,limit=10}=req.query;

    const allUserAggregate=await User.aggregate([{$match:{}}])

    const allUser=await User.aggregatePaginate(
      allUserAggregate,
      getMongoosePaginationOption({
        page,
        limit,
        customLabels:{
          totalDocs:"totalUsers",
          docs:"allUser"
        }
      })
    )

     return res 
              .status(200)
              .json(
                new ApiResponse(
                  200,
                  allUser,
                  "All User detials fetched successfully"
                )
              )
})

const handleSocialLogin=AsyncHandler(async (req,res)=>{
  const user=await User.findById(req.user?._id)

  if(!user){
    throw new ApiError(400,"User does not exists")
  }

  const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

  const options={
    httpOnly:true,
    // secure:true
    secure: process.env.NODE_ENV === "production"
  }

  return res 
           .status(301)
           .cookie("accessToken",accessToken,options)
           .cookie("refreshToken",refreshToken)
           .redirect(
            `${process.env.CLIENT_SSO_REDIRECT_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
           )
})

export {
  userRegistration,
  logInUser,
  logoutUser,
  verifyEmail,
  resendEmailVerification,
  refreshAccessToken,
  forgotPassword,
  resetForgotPassword,
  changeCurrentPassword,
  assignRole,
  getCurrentUser,
  addUserByAdmin,
  deleteUserByAdmin,
  updateUserAvatar,
  updateProfile,
  getAllUser,
  handleSocialLogin
};
