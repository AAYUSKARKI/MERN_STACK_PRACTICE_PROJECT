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

const router = Router();

router.route("/createjob").post(Verifyjwt,createJob);
router.route("/getalljobs").get(getalljobs);
router.route("/getmyjobs").get(Verifyjwt,getmyjobs);
router.route("/getonejob/:id").get(getonejob);
router.route("/updatejob/:id").patch(Verifyjwt,updatejob);
router.route("/deletejob/:id").delete(Verifyjwt,deletejob);
router.route("/applyjob/:id").post(Verifyjwt,applyjob);
router.route("/getappliedjobs").get(Verifyjwt,getappliedjobs);
router.route("/searchjobs/?:query").get(searchjobs);
router.route("/getinprogressjobs").get(Verifyjwt,getinprogressjobs);
router.route("/getcompletedjobs").get(Verifyjwt,getcompletedjobs);
router.route("/filterjob/:category").get(Verifyjwt,filterjob);
router.route("/filterjobbyuserCategory").post(Verifyjwt,filterjobbyuserCategory);
router.route("/jobstats").get(Verifyjwt,jobstats);

export default router