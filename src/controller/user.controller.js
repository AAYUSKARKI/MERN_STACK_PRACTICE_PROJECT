import { asynchandler } from "../utils/Asynchandler.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { Apierror } from "../utils/Apierror.js";
import { User } from "../model/user.model.js";

const generateAccessTokenAndRefreshtoken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accesstoken = user.generateAccessToken()
        const refreshtoken = user.generaterefreshtoken()
        user.refreshtoken = refreshtoken
        await user.save({validateBeforeSave:false})
        return {accesstoken,refreshtoken}
    } catch (error) {
        throw new Apierror(500, "something wwnt wrong while genrating refresh anf aveessstoken")
    }
}

const signup = asynchandler(async (req, res) => {
    
    const { fullname, username, email, password ,role , category} = req.body;

    if (!fullname || !username || !email || !password) {
        throw new Apierror(400,"all fields are required")
    }

    const existeduser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
})

   if (existeduser) {
    throw new Apierror(400,"user already exists with this email or username")
    }

    const user = await User.create({
        fullname,
        username,
        email,
        password,
        role,
        category
    })

    const createduser = await User.findById(user._id).select("-password -refreshtoken")

    if(!createduser){
        throw new Apierror(400,"something went wrong while registering a user")
    }

    return res.status(201).json(new Apiresponse(200,createduser,"user created successfully")
)

})

const login = asynchandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new Apierror(400,"all fields are required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new Apierror(400,"user not found")
    }

    const ispasswordcorrect = await user.ispasswordcorrect(password)

    if (!ispasswordcorrect) {
        throw new Apierror(400,"password is incorrect")
    }

    const {accesstoken , refreshtoken} = await generateAccessTokenAndRefreshtoken(user._id)

    const loginUser = await User.findById(user._id).select("-password -refreshtoken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accesstoken", accesstoken, options)
    .cookie("refreshtoken", refreshtoken, options)
    .json(
        new Apiresponse(200,
            {
                user:loginUser,accesstoken,refreshtoken
            },
            "user logged in successfully"
        )
    )
})



const logout = asynchandler(async (req, res) => {
    await User.findByIdAndUpdate
    (
        req.user._id,
        {
            $unset:{
                refreshtoken:1
            }
        },
        {
            new:true,
        }  
    )

    const options = 
    {
        httpOnly: true,
        secure: true    
    }

    return res.status(200)
    .clearCookie("accesstoken", options)
    .clearCookie("refreshtoken", options)
    .json(new Apiresponse(200,{},"user logged out successfully"))

})

const changePassword = asynchandler(async (req, res) => {

    const { oldpassword, newpassword } = req.body;
    const user = await User.findById(req.user._id)

    const ispasswordcorrect = await user.ispasswordcorrect(oldpassword)

    if (!ispasswordcorrect) {
        throw new Apierror(400,"old password is incorrect")
    }

    user.password = newpassword

    await user.save({validateBeforeSave:false})

    return res.status(200).json(new Apiresponse(200,{},"password changed successfully"))
})

const getyourprofile = asynchandler(async (req, res) => {
    return res.status(200).json(new Apiresponse(200,req.user,"your profile fetched successfully"))
})

const updateprofile = asynchandler(async (req, res) => {

    const { fullname, username, email } = req.body;

    if (!fullname || !username || !email) {
        throw new Apierror(400,"all fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullname,
                username,
                email,
            }
        },
            {
                new:true

            }
    ).select("-password")

    return res.status(200).json(new Apiresponse(200,user,"profile updated successfully"))


})


export { 
    signup,
    login,
    logout,
    changePassword,
    getyourprofile,
    updateprofile
}