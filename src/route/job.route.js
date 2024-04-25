import { Router } from "express";
import Verifyjwt from '../middleware/auth.middleware.js';
import {createJob,
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
    jobstats}
    from '../controller/job.controller.js'
    import { upload } from "../middleware/multer.middleware.js";
    

const router = Router();

router.route("/createjob").post(Verifyjwt,upload.single("thumbnail"),createJob);//done
router.route("/getalljobs").get(getalljobs);//done
router.route("/getmyjobs").get(Verifyjwt,getmyjobs);//done
router.route("/getonejob/:id").get(getonejob);//done
router.route("/updatejob/:id").patch(Verifyjwt,updatejob);//done
router.route("/deletejob/:id").delete(Verifyjwt,deletejob);//done
router.route("/applyjob/:id").post(Verifyjwt,applyjob);//done
router.route("/getappliedjobs").get(Verifyjwt,getappliedjobs);//done
router.route("/searchjobs/?:query").get(searchjobs);//done
router.route("/getinprogressjobs").get(Verifyjwt,getinprogressjobs);//soon
router.route("/getcompletedjobs").get(Verifyjwt,getcompletedjobs);//soon
router.route("/filterjob/:category").get(Verifyjwt,filterjob);//done
router.route("/filterjobbyuserCategory").post(Verifyjwt,filterjobbyuserCategory);//soon
router.route("/jobstats").get(Verifyjwt,jobstats);//soon

export default router