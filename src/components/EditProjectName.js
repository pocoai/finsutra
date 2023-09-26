import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { PlusSmallIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@clerk/nextjs'

const EditProjectName = ({name, _id, getProjects, setIsEditing}) => {
    const [loading, setLoading] = useState(false);
    let { getToken } = useAuth();
    const api = process.env.NEXT_PUBLIC_URL;

    const [ value, setValue ] = useState(name);
    console.log('am in',name, value, _id)

    const editprojectName = async () => {

      let res;
      console.log(name, value, _id)

      if (value === "") {
          toast.error("Project name is required", {
              position: "bottom-center"
          })
          return
      }

      setLoading(true)
      try {

          let token = await getToken();

          console.log(token)

          res = await axios.patch(`${api}/api/project/${_id}/editProjectName`, {
              value
          }, {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          })

          if (res.data.success) {
              toast.success("Project Name Edited Sucessfully");
          }

      } catch (error) {
          console.log(error)
          toast.error("Something went wrong")
          return;
      }
      setLoading(false)
      setValue('')
      // document.getElementById("my_modal_2").checked = false  
      setIsEditing(false)
      getProjects();

  }

    return (
        <div className="inset-0 fixed flex justify-center items-center">
            {/* <input type="checkbox" id="my_modal_3" className="modal-toggle" /> */}
            <div >
                <div className="modal-box bg-white">
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <span className="loading loading-ring loading-md"></span>
                        </div>
                    ) : (
                        <div className="w-full h-full">
                          <div className="flex justify-around">
                            <h3 className="font-bold text-lg">Edit project name</h3>
                            <span onClick={()=>setIsEditing(false)} className="text-red-500 font-bold">X</span>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-5 my-5">
                                <input
                                    type="text"
                                    placeholder='Enter New name'
                                    className="input w-full border outline-none"
                                    onChange={(e) => setValue(e.target.value)}
                                    value={value}
                                />
                                <button
                                    onClick={editprojectName}
                                    onKeyDown={async (e) => {
                                        if (e.key === "Enter") {
                                            await editprojectName();
                                        }
                                    }}
                                    className="bg-[#FFF0DF] rounded-full px-4 py-2 text-brand flex items-center gap-1 hover:bg-brand hover:text-white transition-colors duration-300"
                                >
                                    <PlusSmallIcon className="w-5 h-5" />
                                    Edit
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <label className="modal-backdrop" htmlFor="my_modal_3">
                    Close
                </label>
            </div>
        </div>
    );
};

export default EditProjectName;
