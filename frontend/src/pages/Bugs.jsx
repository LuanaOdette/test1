import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import axios from '../axios'
import Swal from 'sweetalert2'
import AddStatus from '../components/AddStatus'


export default function Bugs() {


    const { user } = useContext(UserContext)
    const [bugs, setBugs] = useState([])

    const [addStatus, setAddStatus] = useState(false)
    const [bugId, setBugId] = useState(null)

    const { id, project_team } = user[0]

    useEffect(() => {
        const getBugs = async () => {
            const { data } = await axios.post('/getbugs', {
                project_team
            })
            const { rows } = data
            setBugs(rows)
            console.log(rows)
        }
        getBugs()
    }, [project_team])


    const selfAlocate = async (bugId, action) => {

        if (!id) return
        if (!bugId) return
        if (!project_team) return
        if (!action) return

        const { data } = await axios.post('/selfalocate', {
            id, bugId, project_team, action
        })
        const { rows } = data
        Swal.fire({
            title: action === 'add' ? 'Self Alocated' : 'Self Alocation Removed',
            icon: 'success'
        })
        setBugs(rows)
    }


    const handleAddStatus = (bug_id, pmId) => {
        if (pmId !== id) return Swal.fire({
            title: 'This Bug is not allocated to you',
            icon: 'error'
        })

        setAddStatus(true)
        setBugId(bug_id)
    }

    return (
        <div className='mx-auto'>
            {
                addStatus && <AddStatus setBugs={setBugs} bugId={bugId} setAddStatus={setAddStatus} />
            }
            <div className="flex flex-col mt-5 md:mt-15">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="border shadow overflow-hidden  border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            severity
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            description
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            commit link
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            status
                                        </th>
                                        <th scope="col">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        bugs.map((b, i) => (
                                            <tr key={i}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    {b.severity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {b.description}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {b.commit_link}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {b.status}
                                                </td>
                                                <td className="items-start justify-center space-y-1 whitespace-nowrap text-sm text-gray-600">
                                                    {
                                                        user[0].type === 'pm'
                                                            ? <>
                                                                {
                                                                    b.pmId === null
                                                                        ? <button
                                                                            onClick={() => selfAlocate(b.id, 'add')}
                                                                            className='font-semibold text-indigo-500 hover:text-indigo-600'
                                                                        >
                                                                            Self Allocate
                                                                        </button>
                                                                        :
                                                                        b.pmId === id ?
                                                                            <button
                                                                                onClick={() => selfAlocate(b.id, 'remove')}
                                                                                className='font-semibold text-red-500 hover:text-red-600'
                                                                            >
                                                                                Remove Self Allocation
                                                                            </button>
                                                                            : <button
                                                                                className='font-semibold text-red-500 hover:text-red-600'
                                                                            >
                                                                                Allocated to another user
                                                                            </button>

                                                                }
                                                                <br />
                                                                <button
                                                                    onClick={() => handleAddStatus(b.id, b.pmId)}
                                                                    className='font-semibold text-green-500 hover:text-green-600'
                                                                >
                                                                    Add Status
                                                                </button>
                                                            </>
                                                            : <>
                                                                <button
                                                                    className='font-semibold text-indigo-500 hover:text-indigo-600'
                                                                >
                                                                    Add Bug
                                                                </button>
                                                            </>
                                                    }
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

        </div >
    )
}
