import React,{useState} from 'react'
import axios from 'axios'

//fullname, username, email, password ,role , category 'client','tradeperson'
function signup() {
  const [user, setUser] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    role: '',
    category: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const response = await axios.post('http://localhost:8000/api/v1/users/signup', user)
      setLoading(false)
      console.log(response)
      setUser({ fullname: '', username: '', email: '', password: '', role: '', category: '' })
      alert('Signup Successful')
      window.location.href = '/login'
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    {loading? <p>loading...</p>:<p>TEST</p>}
    <section className='w-full container mx-auto p-1 mt-5'>
      <div className='w-full max-w-md bg-white shadow border p-4 mx-auto'>
        <p className='text-2xl font-bold text-center'>Welcome TO JoB Seeking WebApp</p>
        <form>
          <label htmlFor="fullname">FullName</label>
          <input
            type="text"
            name="fullname"
            value={user.fullname}
            placeholder='Enter your fullname'
            onChange={handleChange}
            disabled={loading}
            className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2 '
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            placeholder='Enter your username'
            onChange={handleChange}
            disabled={loading}
            className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2 '
          />
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
          <label htmlFor="role">Role</label>
          <select 
            className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2'
            name="role" 
            disabled={loading}
            value={user.role} 
            onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="client">client</option>
            <option value="tradeperson">tradeperson</option>
          </select>
          {
            user.role === 'tradeperson' && (
              <>
              <label htmlFor="category">Category</label>
              <input 
                type="text"
                name="category"
                value={user.category}
                placeholder='Enter your category'
                onChange={handleChange}
                disabled={loading}
                className='bg-slate-100 w-full py-2 focus:outline-blue-700 px-2 '
              />
              </>
            )
          }
          <button 
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className='w-full py-2 bg-blue-700 text-white hover:bg-blue-800'>
            Signup
          </button>
        </form>
      </div>
    </section>
    </>
  )
}

export default signup