"use client"

import React, { useEffect, useReducer, useState } from 'react';
import { EllipsisVerticalIcon, MagnifyingGlassIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import { useAuth } from "@clerk/nextjs";
import { ToastContainer, toast } from 'react-toastify';
import EditProjectName from '../EditProjectName';
import InputModal from '../project/InputIdeaModal';
import Swal from 'sweetalert2';

const api = process.env.NEXT_PUBLIC_URL;

const Project = ({ _id, name, updatedAt, createdAt, getProjects }) => {
    // const [editOpen, setEditOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    // const handleEdit = () => {
    //     console.log('editing ')
    //     setEditOpen(prevState => !prevState)
    // }

    const { getToken } = useAuth();
    const handleDelete = async (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#FD8A09',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (ProjectDelete()) {
                    getProjects();
                    Swal.fire({
                        title: 'Deleted',
                        text: 'Your file has been deleted.',
                        confirmButtonColor: '#FD8A09',
                        confirmButtonText: 'Ok'
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                }
            }
        })

        const ProjectDelete = async () => {
            let token = await getToken();
            const res = await axios.delete(`${api}/api/project/${id}/deleteProject`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.success) {
                return true;
            } else {
                return false;
            }
        }
    }

    const handleEdit = () => {
        // console.log('Editing ', _id);
        setIsEditing(true);
    }

    return (
        <>
            <tr className='w-full my-2'>
                <Link href={`/project/${_id}?journey=1`} prefetch={false} ><td className='col-span-2 py-3'>{name}</td></Link>
                <td className='py-3'>{formatDistance(new Date(updatedAt), new Date(), { addSuffix: true })}</td>
                <td className='py-3'>{formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}</td>
                <td className="dropdown dropdown-end">
                    <label tabIndex={0} className="">
                        <EllipsisVerticalIcon className='w-5 h-5 cursor-pointer text-black' />
                    </label>
                    <span tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow bg-base-200 rounded-box w-fit">
                        <span className='w-[100px] flex items-start justify-start gap-2 px-3 py-1 cursor-pointer hover:bg-[#F1F2F4] rounded-lg ' onClick={() => handleDelete(_id)}>
                            <TrashIcon className='w-5 h-5 text-black' />
                            <p>
                                Delete
                            </p>
                        </span>

                        <span className='w-[100px] flex items-start justify-start gap-2 px-3 py-1 cursor-pointer hover:bg-[#F1F2F4] rounded-lg ' >
                            <PencilSquareIcon className='w-5 h-5 text-black' />
                            <p onClick={handleEdit}>
                                {/* <label htmlFor="my_modal_3"> */}
                                Edit
                                {/* </label> */}
                            </p>
                        </span>
                    </span>
                    {isEditing && (
                        <EditProjectName name={name} _id={_id} getProjects={getProjects} setIsEditing={setIsEditing} />
                    )}
                </td >
            </tr >
            {/* <EditProjectName name={name} _id={_id} getProjects={getProjects}/> */}
        </>
    )
}


const INITIAL_STATE = {
    loading: false,
    error: "",
    projects: []
}

const ACTION_TYPES = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
    SEARCH_PROJECT: "SEARCH_PROJECT"
}

const projectReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_START:
            return {
                ...state,
                loading: true,
                error: ""
            }
        case ACTION_TYPES.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: action.payload
            }
        case ACTION_TYPES.FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case ACTION_TYPES.SEARCH_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => {
                    return project.name.toLowerCase().includes(action.payload.toLowerCase())
                })
            }
        default:
            return state
    }
}


const ProjectDashboard = () => {


    const [state, dispatch] = useReducer(projectReducer, INITIAL_STATE)
    const [search, setSearch] = useState("")
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);



    let { getToken, isSignedIn, isLoaded } = useAuth()
    const api = process.env.NEXT_PUBLIC_URL;

    const getProjects = async () => {
        dispatch({ type: "FETCH_START" })
        try {
            // let token = await getToken()

            // console.log(token, "token while getting")

            let res = await axios.get(`${api}/api/project`, {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success) {
                dispatch({ type: "FETCH_SUCCESS", payload: res.data.data })
                setFilteredProjects(res.data.data);

                if (res.data.data.length === 0) {
                    dispatch({ type: "FETCH_ERROR", payload: "No projects found" })
                }
            }


        } catch (error) {
            // console.log(error)
            dispatch({ type: "FETCH_ERROR", payload: "Something went wrong" })
            return;
        }
    }


    useEffect(() => {
        if (isSignedIn && isLoaded) {
            getProjects()
        }
    }, [isSignedIn, isLoaded])


    useEffect(() => {
        if (search === "") {
            // If the search input is empty, show all projects
            setFilteredProjects(state.projects);
        } else {
            // Otherwise, filter the projects based on the search input
            const filtered = state.projects.filter((project) =>
                project.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProjects(filtered);
        }
    }, [search, state.projects]);







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
                        value={search}
                        onChange={(e) => {

                            setSearch(e.target.value)
                        }}
                    />
                    <MagnifyingGlassIcon className='w-8 h-8 text-[#808182]' />
                </div>
                <label htmlFor="my_modal_2" className='bg-[#FFF0DF] cursor-pointer rounded-full px-4 py-2 text-brand flex items-center gap-1' onClick={() => setShowModal(true)}>
                    <PlusIcon className='w-5 h-5' />
                    New Project
                </label>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}



            <div className='h-[60vh] overflow-y-scroll scrollbar-hide w-full '>


                {
                    state.loading ? (
                        <>
                            <table className=' w-full'>
                                <thead className='w-full'>
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
                            </table>
                            <div className="flex flex-col">
                                {Array(10).fill(0).map((_, index) => (
                                    <div className="flex my-2 gap-5" key={index}>
                                        <div className="w-2/3 bg-gray-100 rounded h-6"></div>
                                        <div className="w-1/3 bg-gray-100 rounded animate-pulse"></div>
                                        <div className="w-1/3 bg-gray-100 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>

                        </>

                    ) : (
                        <table className='table-auto w-full'>
                            <thead className='w-full'>
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
                            {state.error && (
                                <tr>
                                    <td className='col-span-3 py-3 text-red-500'>
                                        {state.error}
                                    </td>
                                </tr>
                            )}
                            <tbody className='w-full '>
                                {
                                    filteredProjects.map((project, index) => (
                                        <Project key={index} {...project} getProjects={getProjects} />
                                    ))
                                }

                            </tbody>

                        </table>


                    )

                }


            </div>


            {/* <NewProjectModal /> */}
            {showModal && <InputModal isOpen={showModal} setIsOpen={setShowModal} />}

        </div>
    )
}

export default ProjectDashboard