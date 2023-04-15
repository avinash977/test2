import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please enter company name"],
    },
    position:{
        type: String,
        required: [true, "Please enter job position"],
        maxlength: [100, "Position must be at least 100 characters long"],
    },
    status:{
        type: String,
        enum:["pending", "interview", "reject"],
        default: "pending",
    },
    workType:{
        type: String,
        enum:["full-time", "part-time", "internship", "contract"],
        default: "full-time",
    },
    workLocation:{
        type: String,
        default:"Mumbai",
        required: [true, "Please enter job location"],
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;