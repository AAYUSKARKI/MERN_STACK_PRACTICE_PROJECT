import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import about from './components/about/about'
import home from './components/home/home'
import contact from './components/contact/contact'
import signin from './components/signin/signin'
import signup from './components/signup/signup'
import notfound from './components/notfound/notfound'
import profile from './components/profile/profile'
import TradePersonDashboard from './components/TradePersonDashboard/TradePersonDashboard'
import ClientDashboard from './components/ClientDashboard/ClientDashboard'
import { useSelector } from 'react-redux'
function App() {
  const authuser = useSelector((store) => store.user.authuser)
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={home}/>
      <Route path="/about" Component={about}/>
      {
        authuser?.role === 'client' ? 
        <Route path='/clientdashboard' Component={ClientDashboard}/> 
        : 
        <Route path='/tradepersondashboard' Component={TradePersonDashboard}/>
      }
      {/* <Route path='/tradepersondashboard' Component={TradePersonDashboard}/>
      <Route path='/clientdashboard' Component={ClientDashboard}/> */}
      <Route path="/contact" Component={contact}/>
      <Route path="/login" Component={signin}/>
      <Route path="/signup" Component={signup}/>
      <Route path="/profile" Component={profile}/>
      <Route path='*' Component={notfound}/>
    </Routes>  
    </BrowserRouter>
    </>
  )
}

export default App