import { Message } from "../model/message.model.js";
import {Job} from '../model/job.model.js'

const sendmessage = asynchandler(async (req, res) => {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const {message} = req.body;
    const isTradeperson = req.user.role==="tradeperson"

    if(!message){
        throw new Apierror(400,"message is required")
    }

    if(isTradeperson){

        const job = await Job.findOne({client:receiverId})

        if(!job){
            throw new Apierror(400,"job not found")
        }

        if(!job.applicants.includes(senderId)){
            throw new Apierror(400,"you are not allowed to send message")
    }

    const newmessage = await Message.create({
        sender:senderId,
        receiver:receiverId,
        content:message
    })

    return res.status(200).json(new Apiresponse(200,newmessage,"message sent successfully"))
}
else{

    const job = await Job.findById(receiverId)

    if(!job){
        throw new Apierror(400,"job not found")
    }

    if(job.client.toString()!==senderId.toString()){

        throw new Apierror(400,"you are not allowed to send message")
}

const tradeperson = job.applicants;

const messages = await Promise.all(tradeperson.map(async (tradepersonid)=>{  
    return await Message.create({
        sender:senderId,
        receiver:tradepersonid,
        content:message
    })
}))

return res.status(200).json(new Apiresponse(200,messages,"message sent successfully"))

}


})



const getallmessages = asynchandler(async (req, res) => {

    const messages = await Message.find({}).sort({createdAt:-1})

    return res.status(200).json(new Apiresponse(200,messages,"all messages fetched successfully"))
})

const getmessage = asynchandler(async (req, res) => {
    
    const message = await Message.findById(req.params.id)

    if(!message){
        throw new Apierror(400,"message not found")
    }

    return res.status(200).json(new Apiresponse(200,message,"message fetched successfully"))
})

export {sendmessage,getallmessages,getmessage}

// const getmessages = asynchandler(async (req, res) => {
//     const userId = req.user._id;
//     const receiverId = req.params.id;

//     const messages = await Message.find({
        
//         $or:[
//             {
//                 sender:userId,
//                 receiver:receiverId
//             },
//             {
//                 sender:receiverId,
//                 receiver:userId
//             }
//         ]

//     }).sort({createdAt:-1})

//     return res.status(200).json(new Apiresponse(200,messages,"messages fetched successfully"))
// })