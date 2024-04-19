import { Job } from "../model/job.model.js";
import { asynchandler } from "../utils/Asynchandler.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { Apierror } from "../utils/Apierror.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const createJob = asynchandler(async (req, res) => {

    console.log('req body is here', req)
    console.log(req.file,"req.file")
    console.log(req.body,"req.body")
    
    const { title, category, description, status } = req.body;

    if (!title || !category || !description ) {
        throw new Apierror(400,"all fields are required")
    }

    const existedjob = await Job.findOne({
        $or: [
            { title },
            { description }
        ]
})  

   if (existedjob) {
    throw new Apierror(400,"job already exists with this title or description")
    }

    console.log(req.file)
    const thumbnaillocalpath = req.file?.path

    if(!thumbnaillocalpath){
        throw new Apierror(400,"thumbnail is required")
    }

    const thumbnail = await uploadOnCloudinary(thumbnaillocalpath)
    
    if(!thumbnail){
        throw new Apierror(400,"something went wrong while uploading thumbnail")
    }


    const job = await Job.create({
        title,
        category,
        description,
        thumbnail: thumbnail.url,
        status,
        client: req.user._id,
    })

    const createdjob = await Job.findById(job._id).populate("client").select("-password")

    if (!createdjob) {
        throw new Apierror(400,"something went wrong while creating job")
    }

    return res.status(200).json(new Apiresponse(200,createdjob,"job created successfully"))


    })

    const getalljobs = asynchandler(async (req, res) => {

        const jobs = await Job.find().populate("client").select("-password")

        if (!jobs) {
            throw new Apierror(400,"something went wrong while fetching jobs")
        }

        return res.status(200).json(new Apiresponse(200,jobs,"jobs fetched successfully"))
    })

    const getmyjobs = asynchandler(async (req, res) => {
        
        const jobs = await Job.find({client:req.user._id}).populate("client").select("-password")

        if (!jobs) {
            
            throw new Apierror(400,"something went wrong while fetching jobs")
        }

        return res.status(200).json(new Apiresponse(200,jobs,"jobs fetched successfully"))
    })

    const getonejob = asynchandler(async (req, res) => {

        const job = await Job.findById(req.params.id).populate("client").select("-password")

        if (!job) {
            throw new Apierror(400,"something went wrong while fetching job")
        }

        return res.status(200).json(new Apiresponse(200,job,"job fetched successfully"))
    })

    const updatejob = asynchandler(async (req, res) => {
        
        const { title, category, description, status } = req.body;

        if (!title || !category || !description ) {
            throw new Apierror(400,"all fields are required")
        }

        const job = await Job.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    title,
                    category,
                    description,
                    status
                }

            },
            {
                new:true
            }
        )

        if (!job) {
            throw new Apierror(400,"something went wrong while updating job")
        }

        return res.status(200).json(new Apiresponse(200,job,"job updated successfully"))
    })

    const deletejob = asynchandler(async (req, res) => {

        const job = await Job.findByIdAndDelete(req.params.id)

        if (!job) {
            throw new Apierror(400,"something went wrong while deleting job")
        }

        return res.status(200).json(new Apiresponse(200,job,"job deleted successfully"))
    })


    const applyjob = asynchandler(async (req, res) => {

        const jobId = req.params.id
        const userId = req.user._id

        const job = await Job.findById(jobId)

        if (!job) {
            throw new Apierror(400,"something went wrong while applying job")
        }

        if(job.applicants.includes(userId)){
            throw new Apierror(400,"user already applied for this job")
        }

        job.applicants.push(userId);

        await job.save()

        return res.status(200).json(new Apiresponse(200,job,"job applied successfully"))
    })


    const getappliedjobs = asynchandler(async (req, res) => {
        
        const jobs = await Job.find({applicants:req.user._id}).populate("client").select("-password")

        if (!jobs) {
            throw new Apierror(400,"something went wrong while fetching applied jobs")
        }

        return res.status(200).json(new Apiresponse(200,jobs,"applied jobs fetched successfully"))
    })

   
    const searchjobs = asynchandler(async (req, res) => {

        const keyword = req.query.keyword

        const jobs = await Job.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        }).populate("client").select("-password")

        if (!jobs) {
            throw new Apierror(400,"something went wrong while searching jobs")
        }

        return res.status(200).json(new Apiresponse(200,jobs,"jobs fetched successfully"))
        })

    
        const getinprogressjobs = asynchandler(async (req, res) => {

            const jobs = await Job.find({status:"inprogress"}).populate("client").select("-password")

            if (!jobs) {
                throw new Apierror(400,"something went wrong while fetching inprogress jobs")
            }

            return res.status(200).json(new Apiresponse(200,jobs,"inprogress jobs fetched successfully"))
        })

        const  getcompletedjobs = asynchandler(async (req, res) => {
            
            const jobs = await Job.find({status:"posted"}).populate("client").select("-password")

            if (!jobs) {
                throw new Apierror(400,"something went wrong while fetching completed jobs")
            }

            return res.status(200).json(new Apiresponse(200,jobs,"completed jobs fetched successfully"))
        })

        const filterjob = asynchandler(async (req, res) => {
            
            const jobs = await Job.find({category:req.params.category}).populate("client").select("-password")

            if (!jobs) {
                throw new Apierror(400,"something went wrong while fetching filtered jobs")
            }

            return res.status(200).json(new Apiresponse(200,jobs,"filtered jobs fetched successfully"))
        })

        const filterjobbyuserCategory = asynchandler(async (req, res) => {
            
            const userCategory = req.user.category;

            const jobs = await Job.find({category:userCategory}).populate("client").select("-password")

            if (!jobs) {
                throw new Apierror(400,"something went wrong while fetching filtered jobs")
            }

            return res.status(200).json(new Apiresponse(200,jobs,"filtered jobs fetched successfully"))
        })

        const jobstats = asynchandler(async (req, res) => {

            const stats = await Job.aggregate([
                {
                    $match:{status:"posted"}
                },
                {
                    $group:{
                        _id:"$category",
                        count:{$sum:1}
                }
            },
            {
                $project:{
                    _id:0
                }
            },
            {
                $sort:{
                    count:-1
                }
            },
            {
                $limit:5
            },
            {
                $addFields:{
                    category:"$_id"
                },
                $unset:["_id"]
            },
            {
                $lookup:{
                    from:"categories",
                    localField:"category",
                    foreignField:"_id",
                    as:"category"
                }
            },
            {
                $unwind:{
                    path:"$category",
                    preserveNullAndEmptyArrays:true
                }
            },
            {
                $project:{
                    category:1,
                    count:1
                }
            },
            {
                $addFields:{
                    category:"$category.name"
                },
                $unset:["_id"]
            },
        ])        
            if (!stats) {
                throw new Apierror(400,"something went wrong while fetching job stats")
            }

            return res.status(200).json(new Apiresponse(200,stats,"job stats fetched successfully"))
               
        })

export {
    createJob,
    getalljobs,
    getmyjobs,
    getonejob,
    updatejob,
    deletejob,
    applyjob,
    getappliedjobs,
    searchjobs,
    getinprogressjobs,
    getcompletedjobs,
    filterjob,
    filterjobbyuserCategory,
    jobstats
}