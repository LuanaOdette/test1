import React, { useContext, useState } from 'react'
import axios from '../axios'
import { UserContext } from '../context/userContext'
import Swal from 'sweetalert2'

export default function AddProject() {

    const [desc, setDesc] = useState('')
    const [repo, setRepo] = useState('')


    const { loading, setLoading, user } = useContext(UserContext)
    const { id, project_team } = user[0]

    const [pTeam, setPTeam] = useState(project_team)

    const addproject = async () => {
        if (!desc) return
        if (!repo) return
        if (!pTeam) return

        setLoading(true)

        const { data } = await axios.post('/addproject', {
            desc, repo, pTeam, id
        })

        setLoading(false)

        if (data) Swal.fire({
            title: 'Project Added',
            icon: 'success'
        })

        setDesc('')
        setRepo('')
    }


    return (
        <div>
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
                Add a project
            </h2>

            <div className='addproejct mx-auto flex flex-col mt-5 space-y-3'>
                <textarea
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Description"
                    rows={4}
                    value={desc}
                    onChange={({ target }) => setDesc(target.value)}
                />
                <input
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Repository"
                    value={repo}
                    onChange={({ target }) => setRepo(target.value)}
                />
                <input
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Project Team"
                    value={pTeam}
                    onChange={({ target }) => setPTeam(target.value)}
                />


                <button
                    disabled={loading}
                    className={`cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 ${loading === true ? 'bg-opacity-50' : 'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                    onClick={addproject}
                >
                    {
                        loading ? <div className=" flex justify-center items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-l-2 border-white"></div>
                        </div>
                            : 'Add Project'
                    }
                </button>

            </div>
        </div>
    )
}
