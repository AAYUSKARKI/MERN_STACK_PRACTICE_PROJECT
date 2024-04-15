import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    client: {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    status: {
        type: String,
        enum:['posted',"inprogress"],
        default:'posted'
    },
    applicants: [
        {
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
},
    {
        timestamps: true,
    })

    export const Job = mongoose.model("Job", jobSchema)

