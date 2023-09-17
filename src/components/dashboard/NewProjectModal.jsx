import { PlusSmallIcon } from '@heroicons/react/24/outline'
import React from 'react'

const NewProjectModal = () => {
    return (
        <div> <dialog id="my_modal_2" className="modal">
            <div className="modal-box bg-white">
                <h3 className="font-bold text-lg">Enter project name</h3>
                {/* <p className="py-4">Press ESC key or click outside to close</p> */}
                <form action="" className='flex flex-col justify-center items-center gap-5 my-5'>
                    <input type="text" placeholder="Your business idea" className="input w-full max-w-md border-none" />
                    <button className='bg-[#FFF0DF] rounded-full px-4 py-2 text-brand flex items-center gap-1 hover:bg-brand hover:text-white transition-colors duration-300'>
                        <PlusSmallIcon className='w-5 h-5' />
                        Create
                    </button>
                </form>
            </div>




            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog></div>
    )
}

export default NewProjectModal