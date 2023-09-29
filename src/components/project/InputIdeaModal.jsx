import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react'
import React, { useEffect, useState, Fragment } from 'react'
import CardComponent from './ResultComponent';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import classNames from 'classnames';
import { Urbanist } from 'next/font/google'
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ResultModal from './ResultModal';

const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});


const InputModal = ({ isOpen, setIsOpen }) => {
    const [query, setQuery] = useState('');
    const { getToken } = useAuth()
    const router = useRouter()

    const api = process.env.NEXT_PUBLIC_URL;

    function closeModal() {
        // if (query.trim() === '') {
        //     alert('Please enter some text before closing.');
        //     return;
        // }
        // if (loading) {
        //     alert('Please wait...')
        //     return;
        // }
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    const createNewproject = async () => {
        const token = await getToken()
        try {
            let res = await axios.post(`${api}/api/project`, {
                name: query,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success) {
                toast.success("Project created successfully")
                router.push(`/project/${res.data.data._id}?journey=1`)
            }
            else {
                return new Error(res.data.message || "Something went wrong")
            }

        } catch (error) {
            // console.log(error)
            toast.error("Something went wrong")
            return;
        }

    }


    return (
        <>
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
                                <Dialog.Panel className="w-full max-w-5xl transform overflow-y-scroll scrollbar-thin  rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all h-full max-h-[650px]">
                                    <div className={classNames({
                                        'flex flex-col gap-5 items-start justify-start': true,
                                        [`${urbanist.className}`]: true
                                    })}>



                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl font-medium leading-6 text-brand  "
                                        >
                                            Enter Business Idea
                                        </Dialog.Title>

                                        {/* className={`${results.length > 0 ? "w-[1000px] p-5 rounded-md" : ""} bg-white`} */}

                                        <div className='w-full'>

                                            {/* <h3 className="font-bold text-lg">Enter Business idea</h3> */}

                                            <div className='flex flex-col justify-center items-center gap-5 my-5'>
                                                <input
                                                    type="text"
                                                    placeholder="Your business idea"
                                                    className="input w-full border outline-none"
                                                    value={query}
                                                    onChange={(e) => setQuery(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            createNewproject()
                                                        }
                                                    }}
                                                />
                                                <button
                                                    className='bg-[#FFF0DF] rounded-full px-4 py-2 text-brand flex items-center gap-1 hover:bg-brand hover:text-white transition-colors duration-300'
                                                    onClick={createNewproject}
                                                >
                                                    Ask Navigator
                                                    <Image
                                                        src="/images/pointer.png"
                                                        height={15}
                                                        width={15}
                                                        alt="logo"
                                                        style={{ objectFit: 'contain' }}
                                                        className="ml-1"
                                                    />
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>

            </Transition>
        </>
    );
};

export default InputModal;


