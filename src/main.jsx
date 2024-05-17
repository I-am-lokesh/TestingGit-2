import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createContext, useState} from 'react'
import './styles/app.scss'

export const server = "https://simple-todo-app-06h7.onrender.com/api/v1"

export const Context = createContext({
    isAuthenticated : false
})


const Appwrapper = () =>{

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})


  return (
    <Context.Provider value = {{
      isAuthenticated, 
      setIsAuthenticated,
      loading, setLoading,
      user, setUser
    }}>
    <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Appwrapper />
  </React.StrictMode>,
)
