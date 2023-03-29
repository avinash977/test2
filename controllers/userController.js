import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const updateUserController = async (req, res,next) => {
   try {
    const { name, email, location,lastName } = req.body;

    if(!name || !email || !location || !lastName){
        return next(new ErrorHandler("Please fill all the fields", 400))
    }

    const user = await User.findOne({_id: req.user.id});

    if(!user){
        return next(new ErrorHandler("User not found", 404))
    }

    // update user details
    user.name = name;
    user.email = email;
    user.location = location;
    user.lastName = lastName;

    await user.save();
    const token = user.createJWT();

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user,
        token
    })
    
   } catch (error) {
         next(error)
   }
};