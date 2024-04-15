import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    content:{
        type:String,
        required:true
    },
},
    {
        timestamps: true
    })

export const Message = mongoose.model("Message", messageSchema)