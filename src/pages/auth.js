import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie';
export const Auth = () => {
  return (
    <div className='auth'>
      <Login/>
      <Register/>
    </div>
  )
}
const Login=()=>{
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const[_,setCookies]=useCookies(["access_token"])
  const navigate=useNavigate();
  const onSubmit=async(event)=>{
    event.preventDefault();
    try{
      const response=await axios.post("https://recipeapp-backend-rkvm.onrender.com/auth/login",{username,password})
      setCookies("access_token",response.data.token)
      window.localStorage.setItem("userID",response.data.userID)
      navigate("/")
    }catch(err)
    {
      console.log(err);
    }
  }
  return(
    <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={"LOGIN"} onSubmit={onSubmit}/>
  );
}
const Register=()=>{
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")

  const onSubmit=async(event)=>{
    event.preventDefault();
    try{
      await axios.post("https://recipeapp-backend-rkvm.onrender.com/auth/register",{username,password})
      alert('Registration Completed! Now Login')
    }
    catch(err){
      console.log(err)
    }
  }

  return(
  <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={"REGISTER"} onSubmit={onSubmit}/>
  );
}
const Form=({username,setUsername,password,setPassword,label,onSubmit})=>{
  return(
    <div className='auth-container'>
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
        </div>
        <button className='register-button' type='submit'>{label}</button>
      </form>
    </div>
  );
}
