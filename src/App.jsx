import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { server } from "./main";
import axios from "axios";
import { useContext } from "react";
import { Context } from "./main";

function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated, setLoading } =
    useContext(Context);

  useEffect(() => { 
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log(err);
        setUser({});
        setIsAuthenticated(false);
      });
      setLoading(false);
  }, []);

 

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
