import express from 'express';
import { updateUserController } from '../controllers/userController.js';
import userAuth from '../middlewares/isAuthenticated.js';

const router = express.Router();

// GET USERS || METHOD: GET || PATH: /api/v1/auth/users


// UPDATE USERS || METHOD: PUT || PATH: /api/v1/auth/users/:id

router.put('/update-user',userAuth,updateUserController);





export default router;