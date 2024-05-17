import React, {useContext} from 'react'
import { Link ,Navigate } from 'react-router-dom'
import {useState} from 'react'
import {Context} from '../main'
import toast from 'react-hot-toast'
import axios from 'axios'
import { server } from '../main'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context)
 
  const submitHandler = async (e) => {
    try {
     e.preventDefault();
     setLoading(true)
     console.log( email, password);
 
     const { data }= await axios.post(`${server}/users/login`, {
      
       email,
       password,
     },
     {
       headers: {
         "Content-Type": "application/json",
       },
       withCredentials: true,
 
     }) ;
 
      toast.success(data.message)
      setIsAuthenticated(true)
      setLoading(false)
    } 
    catch (error) {
         toast.error(error.response.data.message)
        console.log(error)
        setIsAuthenticated(false)
    }

   };


  if(isAuthenticated) return <Navigate to="/" />



  return (
    <div className="login">
    <section>
        <form action="" onSubmit={submitHandler}>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button disabled={loading} type = "submit">Login</button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
    </section>
     </div>
  )
}

export default Login