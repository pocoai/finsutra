import { useAuth } from '@clerk/nextjs'
import { PlusSmallIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'




const NewProjectModal = () => {

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    let { getToken } = useAuth()

    const createNewproject = async () => {

        if (name === "") {
            toast.error("Project name is required", {
                position: "bottom-center"
            })
            return
        }

        setLoading(true)
        try {

            let token = await getToken();

            console.log(token)

            let res = await axios.post(`http://localhost:3000/api/project`, {
                name
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success) {
                toast.success("Project created Sucessfully")
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
            return;
        }
        setLoading(false)
        setName("")
        document.getElementById("my_modal_2").checked = false
    }


    return (
        <div>
            <input type="checkbox" id="my_modal_2" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box bg-white">
                    {loading ? (<div className='flex items-center justify-center'>
                        <span className="loading loading-ring loading-md"></span>
                    </div>) : (
                        <div className='w-full'>

                            <h3 className="font-bold text-lg">Enter project name</h3>

                            <div className='flex flex-col justify-center items-center gap-5 my-5'>
                                <input type="text" placeholder="Your business idea" className="input w-full border outline-none"

                                    onChange={(e) => setName(e.target.value)}


                                />
                                <button onClick={createNewproject}
                                    onKeyDown={
                                        async (e) => {
                                            if (e.key === "Enter") {
                                                await createNewproject()
                                            }
                                        }
                                    }

                                    className='bg-[#FFF0DF] rounded-full px-4 py-2 text-brand flex items-center gap-1 hover:bg-brand hover:text-white transition-colors duration-300'>
                                    <PlusSmallIcon className='w-5 h-5' />
                                    Create
                                </button>

                            </div>

                        </div>)}
                </div>




                <label className="modal-backdrop" htmlFor="my_modal_2">Close</label>

            </div></div>
    )
}

export default NewProjectModal