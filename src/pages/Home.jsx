import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); 
  const [tasks, setTasks] = useState([]); 


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/tasks/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setLoading(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/tasks/myTasks`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.allTasks) 
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="login">
        <section>
          <form action="" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />

            <input
              type="text"
              placeholder="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todoskeyword"></section>
      {
        tasks.map(
           i => (
            <div key={i._id}> {i.title }  </div>
            
           )
        )
      }
    </div>
  );
};

export default Home;
