import React, { useEffect, useState } from 'react'
import axios from '../axios'
import AddBugModal from '../components/AddBug'

export default function Projects() {


    const [projects, setProjects] = useState([])
    const [addBug, setAddBug] = useState(false)
    const [projectId, setProjectId] = useState(null)


    useEffect(() => {
        const getProjects = async () => {
            const { data } = await axios.get('/projects')
            setProjects(data)
        }
        getProjects()

    }, [])


    const handleBug = (id) => {
        setAddBug(true)
        setProjectId(id)
    }



    return (
        <div className='mx-auto'>
            {
                addBug && <AddBugModal setAddBug={setAddBug} projectId={projectId} />
            }
            <div className="flex flex-col mt-5 md:mt-15">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="border shadow overflow-hidden  border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            description
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            repository
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            project team
                                        </th>
                                        <th scope="col">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        projects.map((p, i) => (
                                            <tr key={i} >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    {p.description}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {p.repository}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {p.project_team}
                                                </td>
                                                <td className="items-start justify-center space-y-1 whitespace-nowrap text-sm text-gray-600">
                                                    <button
                                                        onClick={() => handleBug(p.id)}
                                                        className='font-semibold text-indigo-500 hover:text-indigo-600'
                                                    >
                                                        Add Bug
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
