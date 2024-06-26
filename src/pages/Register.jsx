import  { useState, useContext } from "react";
import { Link , Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast"; 

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated,loading, setLoading} = useContext(Context)
  

  const submitHandler = async (e) => {
     try {
      e.preventDefault();
      setLoading(true)
      console.log(name, email, password);
  
      const { data }= await axios.post(`${server}/users/new`, {
        name,
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
            value={name}
            onChange={(e) => {setName(e.target.value)}}
              
            
            type="text"
            placeholder="Name"
            required
          />

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
          <button disabled={loading} type="submit">Register</button>
          <h4>Or</h4>
          <Link to="/login">Login</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
