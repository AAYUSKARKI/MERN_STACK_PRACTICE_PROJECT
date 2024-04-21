import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
function Job() {

    const { id } = useParams()

    const {jobs} = useSelector(state => state.job)

    const handleSubmit = async(e) => {

        e.preventDefault()
        try {
          
          axios.defaults.withCredentials = true
          const response = await axios.post(`http://localhost:8000/api/v1/jobs/applyjob/${id}`)
          
          toast.success(response.data.message)

          console.log('response', response)
          

        } catch (error) {

          toast.error(error?.response?.data?.message)

          console.log('error', error)

          
        }
        
    }
    



  return (

<>
{jobs && jobs.filter((job) => job._id === id).map((job) => (
    <div className="bg-gray-200 p-6 rounded" key={job._id}>
        <h1 className="text-xl text-gray-700">{job.title}</h1>
        <p className="text-gray-500">{job.description}</p>
        <p className="text-gray-500">{job.category}</p>
        <p className="text-gray-500">{job.status}</p>
        <img src={job.thumbnail} />
    </div>
))}

<button type='submit' onClick={handleSubmit}>ApplyNOW</button>
    </>
  )
}

export default Job