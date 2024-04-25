import React, { useState } from 'react'
import axios from'axios'

const Searchtry = () => {
    const [search,setSearch]= useState('')
    const handleChange = ()=>setSearch(e.target.value)

    const handleSubit=async(e)=>{
        try {
            const response = await axios.get('http://localhost:8000/api/v1/jobs/searchjobs/?:query')
            console.log(response)
        } catch (error) {
            console.log('error is',error)
        }
            }
  return (
    <>
    <div>Searchtry</div>

    <input type='text' value={search} placeholder='search here...' onChange={handleChange} onSubmit={handleSubmit}/>


    </>
    

  )
}

export default Searchtry

