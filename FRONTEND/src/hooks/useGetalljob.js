import { useEffect } from "react";
import axios from "axios"

const useGetalljob = ()=>{
    useEffect(()=>{

       try {
         const getalljob = async()=>{
             const response = await axios.get('http://localhost:8000/api/v1/jobs/getalljobs')
             console.log(response.data.data)
         }
         getalljob()
       } catch (error) {

        console.log(error)
        
       }

    },[])
}

export default useGetalljob