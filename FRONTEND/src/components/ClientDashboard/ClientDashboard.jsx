import React, { useState } from 'react';
import Createjob from '../../pages/Createjob';
import { Link } from 'react-router-dom';

function ClientDashboard() {
  const [showCreateJobPopup, setShowCreateJobPopup] = useState(false);

  const toggleCreateJobPopup = () => {
    setShowCreateJobPopup(!showCreateJobPopup);
  };

  return (
    <>
      <div className='flex gap-6'>
        <button onClick={toggleCreateJobPopup}>Create Job</button>


        {showCreateJobPopup && <Createjob onClose={toggleCreateJobPopup} />}

        <button>
        <Link to="/mypostedjobs">  ViewMyJobs</Link>
        </button>
      </div>
    </>
  );
}

export default ClientDashboard;
