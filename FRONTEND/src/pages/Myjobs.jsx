import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import DashboardCards from './DashoboardCards';


const Getpostedjobs = () => {

    const [jobs, setjobs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            axios.defaults.withCredentials = true;
            const response = await axios.get('http://localhost:8000/api/v1/jobs/getmyjobs');
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
        jobs&&jobs.map((job)=> <DashboardCards key={job._id} job={job}/>)
    }
</>

  )
}

export default Getpostedjobs