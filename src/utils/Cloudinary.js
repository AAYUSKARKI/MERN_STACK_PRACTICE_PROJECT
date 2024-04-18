import { v2 as cloudinary} from "cloudinary"
import fs from "fs" //file system

      
cloudinary.config({ 
  cloud_name: 'dimahkbnh', 
  api_key: '169688681512636', 
  api_secret:  '7oU-2vtNkuauXhGCyvbCNZxzh9E'
});

const uploadOnCloudinary = async (localFilePath) =>{
    try{
if(!localFilePath) return null
//uploade the file on cloudinary
const response = await cloudinary.uploader.upload(localFilePath,{
    resource_type: "auto"
})

//file upload sucessfully
console.log("file is upload on cloudinary",response.url);
return response;
    }
    catch (error){
        console.error('Error uploading file to Cloudinary:', error);
        console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);

        fs.unlinkSync(localFilePath) //remove the locally saved temporary file
        console.log(error);
        return null
    }
}
export {uploadOnCloudinary}