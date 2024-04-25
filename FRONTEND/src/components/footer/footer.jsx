import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <nav>
        <h6 className="footer-title">Services</h6> 
        <Link to="/dashboard" className="link link-hover">Dashboard</Link>
        <Link to="/clientdashboard" className="link link-hover">Client Dashboard</Link>
        <Link to="/tradepersondashboard" className="link link-hover">Trade Person Dashboard</Link>
        <Link to="/profile" className="link link-hover">Profile</Link>
      </nav> 
      <nav>
        <h6 className="footer-title">Company</h6> 
        <Link to="/createjobs" className="link link-hover">Create Jobs</Link>
        <Link to="/mypostedjobs" className="link link-hover">My Posted JOBS</Link>
        <Link to="/filteredjobs" className="link link-hover">Filtered Jobs</Link>
        <Link to="/getappliedjobs" className="link link-hover">Get Applied Jobs</Link>
        <Link to="/getalljobs" className="link link-hover">Get All Jobs</Link>
      </nav> 
      <nav>
        <h6 className="footer-title">Legal</h6> 
        <Link to="/login" className="link link-hover">Signin</Link>
        <Link to="/signup" className="link link-hover">SignUp</Link>
        <Link to="/contact" className="link link-hover">Contact</Link>
        <Link to="/mypostedjobs" className="link link-hover">My posted Jobs</Link>
      </nav> 
      <form>
        <h6 className="footer-title">Newsletter</h6> 
        <fieldset className="form-control w-80">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label> 
          <div className="join">
            <input type="text" placeholder="username@site.com" className="input input-bordered join-item" /> 
            <button className="btn btn-primary join-item" onClick={(e) => {e.preventDefault(); console.log("clicked")}}>Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
}

export default Footer;
