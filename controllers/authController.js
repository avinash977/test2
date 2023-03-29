import User from "../models/userModel.js";
import JWT from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";

/*
@desc    Register a new user
@route   POST /api/users
@access  Public
*/

export const registerUser = async (req, res,next) => {

    try {
        const { name, lastName, email,  password, location} = req.body;

        // validation
        if (!name || !email || !password) {
          return next(new ErrorHandler("Please fill all the fields", 400))
        }

         // existing user 
         const existingUser = await User.findOne({ email })
         if (existingUser) {
           return next(new ErrorHandler("User already exists", 400))
         }


        // create new user
        // const hashedPassword = await hashPassword(password)
        const user = await User.create({
            name,
            lastName,
            email,
            password,
            location,
        });

        // create token
        const token=user.createJWT();

        res.status(201).json({
            success: true,
            data: user,
            message: `${user.name} Registered Successfully 💃`,
            token
        });

    } catch (error) {
        next(error)
    }
}

/*
@desc    Login a user
@route   POST /api/users/login
@access  Public
*/

export const loginUser = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return next(new ErrorHandler("Please fill all the fields", 400))
        }

        // check for existing user
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return next(new ErrorHandler("Invalid Credentials", 400))
        }

        // match password using bcrypt.js 
        const match = await user.comparePassword(password)

        if (!match) {
            return next(new ErrorHandler("Invalid Credentials", 400))

        }

        user.password = undefined;

        // create token
        const token = user.createJWT();

        res.status(200).json({
            success: true, 
            message: "Login Successfull",
            user,
            token

        })


    } catch (error) {
        return next(error)
    }
};


/*
@desc    Get all users
@route   GET /api/users/
@access  Public
*/

export const getAllUsers = async (req, res,next) => {
    try {
        const users = await User.find({})

        res.status(200).json({ success: true, data: users })
    } catch (error) {
        return next(error)
    }
}





