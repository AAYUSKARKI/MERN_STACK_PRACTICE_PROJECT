import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../navbar/navbar'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Footer from '../footer/Footer'

function DashboardTable() {
  const {jobs} = useSelector((state) => state.job)
  console.log("jobs are",jobs)

  const handleDelete = async(id)=>{

    axios.defaults.withCredentials = true

    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/jobs/deletejob/${id}`)
      toast.success(response.data?.data?.message)
    } catch (error) {
      toast.error(error?.message)
    
  }
}

  return (
    <>
    <Navbar/>
     <table className="table w-full border-red-500">
      <thead>
        <tr className='border-black-900'>
          <th>Job Title</th>
          <th>Category</th>
          <th>Status</th>
          <th colSpan={2}>Action</th>
        </tr>
      </thead>
      <tbody>
    {
        jobs&&jobs.map((job)=>(   
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.category}</td>
                <td>{job.status}</td>
                <td>

                  <button><Link to={`/updatejobs/${job._id}`}>Update</Link></button>&nbsp;
                  <button onClick={()=>handleDelete(job._id)}>Delete</button>
                  
                </td>
          </tr>
        ))
    }
    </tbody></table>
    <Footer/>
    </>
  )
}

export default DashboardTable