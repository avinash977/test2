import express from 'express';
import { getAllUsers, loginUser, registerUser } from '../controllers/authController.js';
import userAuth from '../middlewares/isAuthenticated.js';

const router = express.Router();

//REGISTER || METHOD: POST || PATH: /api/v1/auth/register
router.post('/register',registerUser);

//LOGIN || METHOD: POST || PATH: /api/v1/auth/login
router.post('/login',loginUser);

//Get all users || METHOD: GET || PATH: /api/v1/auth/users
router.get('/users',userAuth,getAllUsers);



export default router;