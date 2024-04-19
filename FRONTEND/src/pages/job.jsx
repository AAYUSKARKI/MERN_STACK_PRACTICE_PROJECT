import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Job() {

    const { id } = useParams()

    const {jobs} = useSelector(state => state.job)


    



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
    </>
  )
}

export default Job