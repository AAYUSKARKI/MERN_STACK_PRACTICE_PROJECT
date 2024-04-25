import {useEffect, useState}from 'react';
import Navbar from '../navbar/navbar';
import Image from '../home/aayus.jpg';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
function Home() {
  const authuser = useSelector((store) => store.user.authuser)

  const[message, setMessage] = useState('')

  const [ServerMessage, setServerMessage] = useState('')

  useEffect(() => {
    const socket = io.connect('http://localhost:8000');

    // Function to emit message when component mounts
    const sendMessage = () => {
      socket.emit('message', message);
    };

    // Emit message when component mounts
    sendMessage();

    socket.on('message', (data) => {
      console.log(data);
      setServerMessage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const socket = io.connect('http://localhost:8000');
    socket.emit('message', message);
  };
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

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="message">Message</label>
          <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit">Send</button> {/* Add a submit button */}
        </form>
      </div>
      {ServerMessage && <div>{ServerMessage}</div>}
    </>
  );
}

export default Home;
