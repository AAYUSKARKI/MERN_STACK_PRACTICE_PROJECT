import React from "react";
import Cookie from 'js-cookie'
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'


function Navbar() {

    const authuser = useSelector((store) => store.user.authuser)

    const cookie = Cookie.get('accesstoken')

    console.log('cookie', cookie)

    return (
        <>
          <div className="navbar flex w-full  justify-between items-center p-4">
            <div className="flex items-center">
            <h1 className="text-2xl font-bold text-green-500 ">Job Seeking APP</h1>
            </div>
            <div className="text-slate-700 flex justify-between items-center">
                <ul className="flex gap-6">
                    <li>Jobs</li>
                    <li>About</li>
                    <li>Contact</li>
                    {authuser && (authuser.role === 'tradeperson' ? (
                        <li><Link to="/tradepersondashboard">Dashboard</Link></li>
                    ) : (
                        <li><Link to="/clientdashboard">Dashboard</Link></li>
                    ))}
                </ul>
            </div>
           <div className="flex gap-3">
            { cookie && authuser && <button className=" rounded-md  border-black text-slate-700">Profile</button>}
           {cookie && authuser && <button className=" rounded-md  border-black text-slate-700">Logout</button>}

           {!authuser || !cookie && <button className=" rounded-md  border-black text-slate-700">Sign Up</button>}
            {!authuser || !cookie && <button className=" rounded-md  border-black text-slate-700">Login</button>}
           </div>
          </div>
        </>
    )
}

export default Navbar