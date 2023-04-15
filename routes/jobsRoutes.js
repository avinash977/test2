import express from 'express';
import { createJobController, deleteJobController, getAllJobsController, updateJobController } from '../controllers/jobsController.js';
import userAuth from '../middlewares/isAuthenticated.js';

const router = express.Router();


// routes
//CREATE JOB || METHOD: POST || PATH: /api/v1/job
router.post('/create-job',userAuth,createJobController);

//GET JOB || METHOD: GET || PATH: /api/v1/job
router.get('/get-job',userAuth,getAllJobsController);

//UPDATE JOB || METHOD: PUT || PATH: /api/v1/jobs/:id
router.patch('/update-job/:id',userAuth,updateJobController);

//DELETE JOB || METHOD: DELETE || PATH: /api/v1/jobs/:id
router.delete('/delete-job/:id',userAuth,deleteJobController);



export default router;