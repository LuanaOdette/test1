import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'

import axios from '../axios'


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setUser, loading, setLoading, error, setError } = useContext(UserContext)


    useEffect(() => {
        setError('')
    }, [setError])


    const signin = async () => {
        if (!email) return
        if (!password) return

        setLoading(true)
        const { data } = await axios.post('/login', {
            email, password
        })
        setLoading(false)


        const { user } = data
        if (!user.length) return setError('Incorrect email or password')

        setUser(user)
        setError('')
        localStorage.setItem('user', JSON.stringify(user))


    }

    return (
        <div className='min-h-screen'>
            <div className="mt-5 md:mt-20 w-full mx-auto md:w-96 max-w-md space-y-8 bg-white shadow-lg rounded-md p-3 py-5 ">
                <div>
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="rounded-md shadow-sm space-y-2">
                    <input
                        className={`${error && 'border-red-400'} appearance-none rounded-none relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                        placeholder="Email address"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                    />
                    <input
                        className={`${error && 'border-red-400'} appearance-none rounded-none relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                        placeholder="Password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <button
                        disabled={loading}
                        className={`cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 ${loading === true ? 'bg-opacity-50' : 'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                        onClick={signin}
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                        {
                            loading ? <div className=" flex justify-center items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-l-2 border-white"></div>
                            </div>
                                : 'Sign in'
                        }

                    </button>
                </div>
                {
                    error && <span className='mt-2 text-sm font-medium text-red-500'> {error} </span>
                }
            </div>
        </div>
    )
}
