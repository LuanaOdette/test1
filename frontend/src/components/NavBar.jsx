import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'

export default function NavBar() {

    const [menu, setMenu] = useState(false)

    const { user, setUser } = useContext(UserContext)

    const logout = () => {
        setUser([])
        localStorage.removeItem('user')
    }


    return (

        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        <button onClick={() => setMenu(!menu)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <Link to='/' className="flex-shrink-0 flex space-x-3 items-center">
                            <img className="mx-auto h-9 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                            <span className='text-white font-bold text-xl'>Bug Tracking</span>
                        </Link>
                        <div className="hidden sm:block sm:ml-6">
                            {
                                user?.length && <div className="flex space-x-3">
                                    {
                                        user[0]?.type === 'pm'
                                            ? <>
                                                <Link to="/addproject" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Project</Link>
                                                <Link to="/bugs" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Bugs</Link>
                                            </>
                                            : <Link to="/projects" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</Link>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className="hidden sm:flex absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {
                            !user?.length
                                ? <div className="flex space-x-4">
                                    <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                                    <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                                </div>
                                : <div className='flex space-x-2'>
                                    <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        {user[0].email}
                                    </span>

                                    <button
                                        className="text-white bg-indigo-600 hover:bg-indigo-700 hover:text-white px-2  rounded-md text-sm font-medium"
                                        onClick={logout}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                        }

                    </div>
                </div>
            </div>

            <div className={`${menu ? 'block h-full' : 'hidden h-0'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1">

                    {
                        user?.length
                            ? <>
                                <Link to="/addproject" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Add Project</Link>
                                <Link to="/bugs" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Bugs</Link>
                                <div className='h-2'></div>
                                <button
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white block p-2 rounded-md text-base font-medium"
                                    onClick={logout}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </>
                            : <>
                                <Link to="/login" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                                <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Register</Link>
                            </>
                    }

                </div>
            </div>
        </nav>
    )
}
