import React from 'react';
import Navbar from '../navbar/navbar';
import Image from '../home/aayus.jpg';
import { useSelector } from 'react-redux';
function Home() {
  const authuser = useSelector((store) => store.user.authuser)
  return (
    <>
     <div style={{border: '18px solid #4a5568', borderRadius: '21px'}}>
     <Navbar />
      <div className='flex flex-col w-full h-screen justify-between items-center'>
        <p className='text-5xl font-bold text-slate-700'>HI, {authuser?.fullname} Welcome to Job Seeking Platform</p>
        <div className='flex flex-col gap-6justify-center items-center w-full h-screen'>
        <h1 className='text-5xl font-bold text-slate-700 mt-32'>
          Connecting <br/> empowering the <br/> opportunities
        </h1>
        <img src={Image} alt="Description of the image" style={{ marginTop: '3rem' }} />
        </div> 
        </div>
      </div> 
    </>
  );
}

export default Home;
