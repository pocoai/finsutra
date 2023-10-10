import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Urbanist } from 'next/font/google'
import classNames from 'classnames'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'react-toastify'


const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});




const ShareModal = ({ isOpen, setIsOpen, id, title, journey, }) => {

    // console.log(data, tab, journey, "in View modal")
    const { getToken } = useAuth()
    const [loading, setLoading] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const api = process.env.NEXT_PUBLIC_URL;

    const shareLink = async () => {

        setLoading(true);
        const token = await getToken();


        try {
            let res = await axios.post(`${api}/api/project/${id}/share`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            // console.log(res.data, "res.data");
            if (res.data.success && res.data.sharable) {
                navigator.clipboard.writeText(`${api}/share/${id}?journey=${journey}`);
                toast.success("Link Copied to Clipboard", {
                    position: "top-center",
                });
            }
            else {
                toast.error("Something went wrong", {
                    position: "bottom-center",
                });
            }

        } catch (error) {
            toast.error("Something went wrong", {
                position: "bottom-center",
            })
        }

        setLoading(false);
        closeModal()
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg transform overflow-y-scroll scrollbar-thin  rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all h-[200px]">
                                <div className={classNames({
                                    'flex flex-col gap-5 items-start justify-start': true,
                                    [`${urbanist.className}`]: true
                                })}>


                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl w-full font-medium leading-6 text-brand  "
                                    >

                                        <div className='flex w-full items-center justify-between'>
                                            <p>
                                                Share Journey to Chat
                                            </p>
                                            <XMarkIcon className="w-7 h-7 cursor-pointer text-[#808182]" onClick={closeModal} />

                                        </div>
                                    </Dialog.Title>

                                    <p>
                                        Anyone with the URL will be able to view the shared journey.
                                    </p>

                                    <button className=' float-right absolute bottom-3 right-3 hover:bg-brand bg-[#FFF0DF] border-brand text-brand rounded-full px-4 py-2 hover:text-white whitespace-nowrap flex items-center justify-center gap-2'

                                        onClick={shareLink}

                                    >
                                        {
                                            loading ? (<span className="loading loading-spinner loading-xs"></span>) : (
                                                <><ClipboardIcon className="w-5 h-5" />
                                                    Generate Link </>)
                                        }
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ShareModal