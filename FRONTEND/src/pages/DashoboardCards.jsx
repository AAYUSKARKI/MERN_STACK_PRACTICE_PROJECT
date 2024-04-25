import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
function DashboardCards( {job} ) {
  const handleDelete = async()=>{
 try {
  const response = await axios.delete(`http://localhost:8000/api/v1/jobs/deletejob/${job._id}`)
  toast.success(response.data?.data?.message)
 } catch (error) {
  console.log('error deleting jobs',error)
  toast.error(error.message)
 }
  }
  return (
   <>
<div className="card card-side bg-base-100 shadow-xl">
  <figure style={{ width: '200px', height: '200px' }}><img src={job?.thumbnail} alt="JobThumbanail" className="w-full h-full object-cover"/></figure>
  <div className="card-body">
    <h2 className="card-title">{job?.title}</h2>
    <p>{job?.description}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary"><Link to={`/jobs/${job?._id}`}>View Details</Link></button>
    </div>
  </div>
  <button className='btn btn-primary' ><Link to={`/updatejobs/${job?._id}`}>UpdateJobs</Link></button>
  <button className='btn btn-primary' onClick={handleDelete}>Delete</button>
</div>   
   </>
  )
}

export default DashboardCards