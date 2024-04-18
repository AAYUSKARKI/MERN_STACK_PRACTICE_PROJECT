import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';

// const cookie = Cookies.get('accesstoken');
// console.log("cookie",cookie)
function Createjob() {
  const [loading, setLoading] = useState(false);

  const [job, setJob] = useState({
    title: '',
    category: '',
    description: '',
    status: 'posted'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      axios.defaults.withCredentials = true;
      const response = await axios.post('http://localhost:8000/api/v1/jobs/createjob', job, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accesstoken')}`
        },
      });
      setLoading(false);
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    //   toast.error(error.response.data.message);
    }
  };

  return (
    <> 
    
      {loading ? <p>loading...</p> : <p>TEST</p>}
      <section className='w-full container mx-auto p-1 mt-5'>
        <div className='w-full max-w-md bg-white shadow border p-4 mx-auto'>
          <p className='text-2xl font-bold text-center'>Welcome TO Job Seeking WebApp</p>
          <form>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={job.title}
              placeholder='Enter job title'
              onChange={handleChange}
              disabled={loading}
              className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2 '
            />
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              value={job.category}
              placeholder='Enter job category'
              onChange={handleChange}
              disabled={loading}
              className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2 '
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={job.description}
              placeholder='Enter job description'
              onChange={handleChange}
              disabled={loading}
              className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2 '
            />
            <label htmlFor="status">Status</label>
            <select
              name="status"
              value={job.status}
              onChange={handleChange}
              disabled={loading}
              className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2 '
            >
              <option value="posted">posted</option>
              <option value="inprogress">inprogress</option>
            </select>
            <button 
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className='w-full py-2 bg-blue-700 text-white hover:bg-blue-800'>
              Create Job
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Createjob;
