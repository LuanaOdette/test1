import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import axios from '../axios'
import Swal from 'sweetalert2'

export default function AddStatus({ setBugs, bugId, setAddStatus }) {

    const [status, setStatus] = useState('')
    const [commitLink, setCommitLink] = useState('')
    const { loading } = useContext(UserContext)
    const { user } = useContext(UserContext)


    const { project_team } = user[0]
    const handleAddStatus = async () => {

        
        if (!status) return
        if (!project_team) return
        if (!commitLink) return

        const { data } = await axios.post('addstatus', {
            bugId, status, project_team, commitLink
        })

        const { rows } = data

        setBugs(rows)

        Swal.fire({
            title: 'Status Added',
            icon: 'success'
        })
        setAddStatus(false)
    }

    return (
        <div className='flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60'>

            <div className='flex flex-col w-full sm:w-96 mx-1 sm:mx-0 space-y-3 bg-white p-3 rounded-md'>
                <div className='flex justify-between items-center'>
                    <span className='text-lg font-semibold'>Add Bug</span>
                    <button onClick={() => setAddStatus(false)} className='p-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <input
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Status"
                    value={status}
                    onChange={({ target }) => setStatus(target.value)}
                />
                <input
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Commit Link"
                    value={commitLink}
                    onChange={({ target }) => setCommitLink(target.value)}
                />
                <button
                    disabled={loading}
                    className={`cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 ${loading === true ? 'bg-opacity-50' : 'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                    onClick={handleAddStatus}
                >
                    {
                        loading ? <div className=" flex justify-center items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-l-2 border-white"></div>
                        </div>
                            : 'Add'
                    }

                </button>
            </div>
        </div>
    )
}
