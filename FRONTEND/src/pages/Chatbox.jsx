import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

const Chatbox = () => {
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
  
    useEffect(() => {
      const newSocket = io.connect('http://localhost:8000');
      setSocket(newSocket);
  
      // Clean up function to close the socket connection when the component unmounts
      return () => {
        newSocket.disconnect();
      };
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      socket.emit('message', message);
      setMessage(''); // Clear the input field after sending the message
    }
    
  return (
    <>
     <div className="flex flex-col h-screen">
     <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <div className="chat-header">
    Obi-Wan Kenobi
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">message here</div>
  <div className="chat-footer opacity-50">
    Delivered
  </div>
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <div className="chat-header">
    Anakin
    <time className="text-xs opacity-50">12:46</time>
  </div>
  <div className="chat-bubble">I hate you!</div>
  <div className="chat-footer opacity-50">
    Seen at 12:46
  </div>
</div>
<div className='flex justify-center items-center mt-auto mb-3 p-3 gap-2'>
<input 
type="text" 
value={message}
onChange={(e)=>setMessage(e.target.value)}
placeholder="Type here" 
className="input input-bordered input-primary w-full max-w-xs" />
<button className="btn btn-outline btn-success" type='submit' onClick={handleSubmit}>Send</button>
</div>
</div>
    </>
  )
}
export default Chatbox