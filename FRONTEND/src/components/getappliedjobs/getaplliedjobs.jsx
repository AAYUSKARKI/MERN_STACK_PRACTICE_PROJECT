import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'


const Getaplliedjobs = () => {

    const [jobs, setjobs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            axios.defaults.withCredentials = true;
            const response = await axios.get('http://localhost:8000/api/v1/jobs/getappliedjobs');
            toast.success(response.data.message);
            console.log('the response is', response.data.data);
            setjobs(response.data.data);
          
            // Handle success
          } catch (error) {
            // Handle error
            // toast.error(error.response.data.message);
            console.log('the error is', error);
          }
        };
    
        fetchData();
      }, []); 
      console.log('the jobs are', jobs);
  return (
    <>
    {
        jobs.map((job)=>(
            <div key={job._id} className='bg-gray-200 p-6 rounded '>
                <h1>{job.title}</h1>
                <p>{job.description}</p>
                <img src={job.thumbnail} alt="Applied Jobs Thumbnail here" />
            </div>
        ))
    }
</>

  )
}

export default Getaplliedjobs