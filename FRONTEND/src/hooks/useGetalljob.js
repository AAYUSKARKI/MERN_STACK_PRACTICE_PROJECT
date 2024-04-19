import { useEffect } from "react";
import axios from "axios"
import { seterror,setjobs,setloading } from "../redux/jobslice";
import { useDispatch } from "react-redux"

const useGetalljob = ()=>{

  const dispatch = useDispatch()
   
   const getalljobs = async()=>{
    try {
      dispatch(setloading(true))
      const response = await axios.get('http://localhost:8000/api/v1/jobs/getalljobs')
      console.log(response.data.data)
      dispatch(setjobs(response.data.data))
      dispatch(setloading(false))
    } catch (error) {
      dispatch(seterror(error.message))
      dispatch(setloading(false))
    }
   }
   useEffect(()=>{
    getalljobs()
   },[])

}

export default useGetalljob