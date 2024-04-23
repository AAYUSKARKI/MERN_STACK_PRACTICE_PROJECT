import useGetalljob from "../hooks/useGetalljob";
import Cards from "../components/Cards/Cards";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Fetchjobs() {

    useGetalljob()

    const {jobs,loading,error} = useSelector((store)=>store.job)

    return (
        <>
         <div>
                {loading && <h1>Loading...</h1>}
                {error && <h1>{error}</h1>}
            </div>
        {
            jobs&&jobs.map((job)=> <Cards key={job._id} job={job}/>)
        }
      
           
            {/* //</><div className="grid grid-cols-3 gap-4"> */}
                {/* {jobs && jobs.filter((job) => job.category === 'TEST').map((job) => (
                    <div className="bg-gray-200 p-6 rounded" key={job._id}>
                        <h1 className="text-xl text-gray-700">{job.title}</h1>
                        <p className="text-gray-500">{job.description}</p>
                        <p className="text-gray-500">{job.category}</p>
                        <p className="text-gray-500">{job.status}</p>
                       <img src={job.thumbnail} />
                    </div>
                ))} */}
                {/* {jobs && jobs.map((job) => (
                    <Link to={`/jobs/${job._id}`} key={job._id}>
                    <div className="bg-gray-200 p-6 rounded" key={job._id}>
                        <h1 className="text-xl text-gray-700">{job.title}</h1>
                        <p className="text-gray-500">{job.description}</p>
                        <p className="text-gray-500">{job.category}</p>
                        <p className="text-gray-500">{job.status}</p>
                       <img src={job.thumbnail} />
                    </div>
                    </Link>
                ))} 
            </div> */}
              </>
        
    )

}