import React from 'react'
import { useSelector } from 'react-redux'

function profile() {
  const authuser = useSelector((store) => store.user.authuser)
  console.log(authuser)
  return (
    <div>
     <h1 className='text-3xl bold text-green-500'>Hi {authuser.fullname}</h1>
    </div>
  )
}

export default profile