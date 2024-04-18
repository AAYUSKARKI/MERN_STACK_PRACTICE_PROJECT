import jwt from 'jsonwebtoken'
import { asynchandler } from '../utils/Asynchandler.js'
import { Apierror } from '../utils/Apierror.js'
import { User } from '../model/user.model.js'

const VerifyJwt = asynchandler(async (req, res, next) => {
   try {
     const token = req.cookies.accesstoken|| req.header("Authorization")?.replace("Bearer", "")
 console.log("token from frontend", token)
     if (!token) {
         throw new Apierror(401, "unauthorized user")
     }
 
     console.log("token secret", process.env.ACCESS_TOKEN_SECRET)
     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("after verify token", decodedToken)
     if(!decodedToken){

        console.log("token not verified", decodedToken)
         throw new Apierror(401, "unauthorized user")
         
     }
     const user = await User.findById(decodedToken._id).select("-password -refreshtoken")

     console.log("user from token verify", user)
 
     if (!user) {
         throw new Apierror(401, "unauthorized user")
     }
 
     req.user = user
 
     next()
 
   } catch (error) {
    
    throw new Apierror(401,error?.message|| InvalidAccessToken)

   }

})

export default VerifyJwt