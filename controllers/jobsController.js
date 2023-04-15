import Job from "../models/jobsModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createJobController = async (req, res,next) => {
    try {
        const {company,position}=req.body;
        if(!company || !position){
            return next(new ErrorHandler("Please fill all the fields", 400))
        }
        req.body.createdBy = req.user.id;
        const job = await Job.create(req.body);
        res.status(201).json({
            success: true,
            data: job,
            message: "Job created successfully",
        })
    } catch (error) {
        next(error)
    }
};


// Get all jobs

export const getAllJobsController = async (req, res,next) => {
    try {
        const jobs = await Job.find({createdBy: req.user.id});
        res.status(200).json({
            success: true,
            totalJobs: jobs.length,
            data: jobs,
            message: "All jobs",
        })
    } catch (error) {
        next(error)
    }
};


// update job

export const updateJobController = async (req, res,next) => {
    try {
        const {id}=req.params;
        const {company,position}=req.body;
        if(!company || !position){
            return next(new ErrorHandler("Please fill all the fields", 400))
        }

        // find job by id
        const job=await Job.findOne({_id: id, createdBy: req.user.id});

        if(!job){
            return next(new ErrorHandler("Job not found or no rights available", 404))
        }

        // update job
        const updateJob=await Job.findOneAndUpdate({_id: id, createdBy: req.user.id},req.body,{
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            data: updateJob,
            message: "Job updated successfully",
        })

        
    } catch (error) {
        next(error)
        
    }


};


// delete job

export const deleteJobController = async (req, res,next) => {
    try {
        const {id}=req.params;
        // find job by id
        const job=await Job.deleteOne({_id: id, createdBy: req.user.id});

        if(!job){
            return next(new ErrorHandler("Job not found or no rights available", 404))
        }

        res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        })
        
    } catch (error) {
        next(error)
    }
};