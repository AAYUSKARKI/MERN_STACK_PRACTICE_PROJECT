import React from 'react'
import { Link } from 'react-router-dom'


function DashboardCards( {job} ) {
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
  <button className='btn btn-primary'>Update</button>
  <button className='btn btn-primary'>Delete</button>
</div>   
   </>
  )
}

export default DashboardCards