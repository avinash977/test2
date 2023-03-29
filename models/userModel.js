import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    lastName:{
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password must be at least 6 characters long"],

    },
    location: {
        type: String,
        default:"India",
    },
    
}, {
    timestamps: true,
});

// middleware to encrypt password before saving to database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// compare user password with hashed password in database
userSchema.methods.comparePassword = async function (enteredPassword) {
    const isMatch= await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
}

// JSON Web Token 
userSchema.methods.createJWT = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    })
}

const User = mongoose.model("User", userSchema);

export default User;