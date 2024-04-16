import React,{useState} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import {setauthuser} from '../../redux/userslice'
//fullname, username, email, password ,role , category 'client','tradeperson'
function signin() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const response = await axios.post('http://localhost:8000/api/v1/users/login', user)
      setLoading(false)
      console.log(response)
      console.log(response.data.data.accesstoken)
      Cookies.set('accesstoken', response.data.data.accesstoken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.accesstoken}`;
      toast.success(response.data.message)
      dispatch(setauthuser(response.data.data.user))
      window.location.href = '/profile'
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  return (
    <>
    {loading? <p>loading...</p>:<p>TEST</p>}
    <section className='w-full container mx-auto p-1 mt-5'>
      <div className='w-full max-w-md bg-white shadow border p-4 mx-auto'>
        <p className='text-2xl font-bold text-center'>Welcome TO JoB Seeking WebApp</p>
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder='Enter your email'
            onChange={handleChange}
            disabled={loading}
            className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2 '
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder='Enter your password'
            onChange={handleChange}
            disabled={loading}
            className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2 '
          />
          <button 
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className='w-full py-2 bg-blue-700 text-white hover:bg-blue-800'>
            SignIn
          </button>
        </form>
      </div>
    </section>
    </>
  )
}

export default signin