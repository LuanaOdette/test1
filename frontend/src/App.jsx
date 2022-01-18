import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserContext } from './context/userContext'
import AddProject from './pages/AddProject';
import Bugs from './pages/Bugs';
import Projects from './pages/Projects';

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')





  useEffect(() => {

    const loggedInUser = localStorage.getItem('user')

    if (loggedInUser) setUser(JSON.parse(loggedInUser))


  }, [])



  return (
    <UserContext.Provider value={{
      user, setUser,
      loading, setLoading,
      error, setError
    }} >
      <div className='bg-gray-50'>

        <NavBar />
        <div className="container mx-auto px-3 md:px-0 min-h-screen w-full">
          <Routes>
            {
              !user?.length
                ? <>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
                : <>
                  <Route path="/" element={user[0]?.type === 'pm' ? < AddProject /> : <Projects />} />
                  {
                    user[0]?.type === 'pm'
                      ? <>
                        <Route path="/AddProject" element={<AddProject />} />
                        <Route path="/bugs" element={<Bugs />} />
                      </>
                      : <Route path="/projects" element={<Projects />} />
                  }
                </>
            }

            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </div>

      </div>
    </UserContext.Provider>

  );
}

export default App;