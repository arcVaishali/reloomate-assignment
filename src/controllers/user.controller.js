const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessTokens();
    const refreshToken = user.generateRefreshTokens();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const register = asyncHandler(async (req, res) => {
  const {
    name,
    password,
    email
  } = req.body;

  // console.log(password);

  if (
    [name , password, email ].some(
      (field) => typeof field !== "string" || field.trim() === ""
    )
  ) {
    throw new ApiError("One of the fields is empty");
  }

  const existedUser = await User.findOne({ email: email });
  if (existedUser) {
    throw new ApiError("User already exists");
  }

  const [username] = email.split("@");
  console.log(password);
  const user = await User.create({
    name,
    password,
    email
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const profile = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;

  return res.json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
      },
      "Fetched user data"
    )
  );
});

const onboarding = asyncHandler( async( req , res ) => {
  const steps = [
    {
      title: "Create Your Profile",
      description: "Set up your personal information and preferences to get started.",
      image: "https://example.com/images/onboarding/profile.png"
    },
    {
      title: "Explore Features",
      description: "Discover all the tools and features available to you.",
      image: "https://example.com/images/onboarding/features.png"
    },
    {
      title: "Connect with Others",
      description: "Find and connect with other users to collaborate and share ideas.",
      image: "https://example.com/images/onboarding/connect.png"
    }
  ];

  return res.status(200).json(
    new ApiResponse(200, steps, "Fetched onboarding steps")
  );
})

module.exports = {
  register,
  login,
  profile,
  onboarding
};
