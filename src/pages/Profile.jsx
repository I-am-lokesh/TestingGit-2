import React from 'react'
import { useContext } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader'

const Profile = () => {

  const {user, isAuthenticated, loading} = useContext(Context)
    
      console.log(user) ;
  return (

      <> 
      

    <div>Profile
         { loading ?  <Loader /> : 
          <>
      <h1>{user && user.user.name} </h1>
      <h1>{ user && user.user.email} </h1>
      </>    }

    </div>
    </>
  )
}

export default Profile