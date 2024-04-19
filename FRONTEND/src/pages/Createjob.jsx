import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';

function Createjob() {
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState({
    title: '',
    category: '',
    description: '',
    status: 'posted'
  });
  const [thumbnail, setThumbnail] = useState(null); // State to store the selected thumbnail file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);  // Set the selected thumbnail file
  };

  useEffect(() => {
    console.log(thumbnail, 'is the thumbnail');
  }, [thumbnail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // const requestData = {
    //   thumbnail: thumbnail,
    //   title: job.title,
    //   category: job.category,
    //   description: job.description,
    //   status: job.status
    // };

    // console.log(requestData,'is the requestdata')


    const formData = new FormData();
    formData.append('thumbnail', thumbnail); 
    formData.append('title', job.title);
    formData.append('category', job.category);
    formData.append('description', job.description);
    formData.append('status', job.status);

    console.log('form data is here', formData);

    axios.defaults.withCredentials = true;



    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/jobs/createjob',
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accesstoken')}`,
            // 'Content-Type': 'application/json;charset=UTF-8',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.message);
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
              className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2'
            />
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              value={job.category}
              placeholder='Enter job category'
              onChange={handleChange}
              disabled={loading}
              className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2'
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={job.description}
              placeholder='Enter job description'
              onChange={handleChange}
              disabled={loading}
              className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2'
            />
            <label htmlFor="thumbnail">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              onChange={handleThumbnailChange}
              disabled={loading}
              className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2'
            />
            <label htmlFor="status">Status</label>
            <select
              name="status"
              value={job.status}
              onChange={handleChange}
              disabled={loading}
              className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2'
            >
              <option value="posted">posted</option>
              <option value="inprogress">inprogress</option>
            </select>
            <button
              type="submit"
              disabled={loading || !thumbnail} // Disable button if no thumbnail is selected
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
