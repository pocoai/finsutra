import { EllipsisVerticalIcon, MagnifyingGlassIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

const Project = ({ id, name, updatedAt, createdAt }) => {
    return (<tr className='w-full my-2'>
        <Link href={`/${id}?journey=1`}><td className='col-span-2 py-3'>{name}</td></Link>
        <td className='py-3'>{updatedAt}</td>
        <td className='py-3'>{createdAt}</td>
        <td className="dropdown dropdown-end">
            <label tabIndex={0} className="">
                <EllipsisVerticalIcon className='w-5 h-5 cursor-pointer text-black' />
            </label>
            <div tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow bg-base-200 rounded-box w-fit">
                <span className='w-[100px] flex items-start justify-start gap-2 px-3 py-1 cursor-pointer hover:bg-[#F1F2F4] rounded-lg '>
                    <TrashIcon className='w-5 h-5 text-black' />
                    <p>
                        Delete
                    </p>
                </span>
                <span className='w-[100px] flex items-start justify-start gap-2 px-3 py-1 cursor-pointer hover:bg-[#F1F2F4] rounded-lg '>
                    <PencilSquareIcon className='w-5 h-5 text-black' />
                    <p>
                        Edit
                    </p>
                </span>
            </div>

        </td >
    </tr >)
}


let projects = [
    {
        name: "Cloud Kitchen idea 2",
        updatedAt: "2 days ago",
        createdAt: "2 days ago"
    },
    {
        name: "Online Food Delivery For Homemakers",
        updatedAt: "2 days ago",
        createdAt: "2 days ago"
    },
    {
        name: "Cloud Kitchen idea 2",
        updatedAt: "2 days ago",
        createdAt: "2 days ago"
    },
    {
        name: "Cloud Kitchen idea 2",
        updatedAt: "2 days ago",
        createdAt: "2 days ago"
    },
    {
        name: "Cloud Kitchen idea 2",
        updatedAt: "2 days ago",
        createdAt: "2 days ago"
    },
    {
        name: "Online Food Delivery For Homemakers",
        updatedAt: "2 days ago",
        createdAt: "2 days ago"
    },
    {
        name: "Cloud Kitchen idea 2",
        updatedAt: "2 days ago",
        createdAt: "2 days ago"
    },
    {
        name: "Cloud Kitchen idea 2",
        updatedAt: "2 days ago",
        createdAt: "2 days ago"
    },
    {
        name: "Cloud Kitchen idea 2",
        updatedAt: "2 days ago",
        createdAt: "2 days ago"
    },
    {
        name: "Online Food Delivery For Homemakers",
        updatedAt: "2 days ago",
        createdAt: "2 days ago"
    },
    {
        name: "Cloud Kitchen idea 2",
        updatedAt: "2 days ago",
        createdAt: "2 days ago"
    },
    {
        name: "Cloud Kitchen idea 2",
        updatedAt: "2 days ago",
        createdAt: "2 days ago"
    },
]


const ProjectDashboard = () => {
    return (
        <div className='my-10'>
            <h2 className='font-bold text-[20px]'>
                Projects
            </h2>
            <div className='flex items-center justify-between py-5'>
                <div className='bg-[#F1F2F4] w-[430px] rounded-full flex items-center justify-between px-4 py-1'>
                    <input type="text" placeholder='Search Projects'
                        className={classNames({
                            "outline-none px-4 w-full bg-[#F1F2F4] ": true
                        })}
                    />
                    <MagnifyingGlassIcon className='w-8 h-8 text-[#808182]' />
                </div>
                <button className='bg-[#FFF0DF] rounded-full px-4 py-2 text-brand flex items-center gap-1'>
                    <PlusIcon className='w-5 h-5' />
                    New Project
                </button>
            </div>


            <div className='h-[60vh] overflow-y-scroll scrollbar-thin'>
                <table className='table-auto w-full'>
                    <thead>
                        <tr className='text-left text-primary font-thin'>
                            <td className='col-span-2 py-3'>
                                Name
                            </td>
                            <td className='py-3'>
                                Last Modified
                            </td>
                            <td className='py-3'>
                                Created
                            </td>
                        </tr>

                    </thead>
                    <tbody className='w-full '>
                        {
                            projects.map((project, index) => (
                                <Project key={index} {...project} id={index} />
                            ))
                        }
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default ProjectDashboard