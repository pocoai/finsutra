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
    const [charCount, setCharCount] = useState(0);
    const [charLimitExceeded, setCharLimitExceeded] = useState(false);
    const [loading, setLoading] = useState(false);
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
        setLoading(true)
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

        setLoading(false)

    }

    // console.log(charCount, "charcount")


    useEffect(() => {
        if (charCount > 300) {
            setCharLimitExceeded(true)
        }
        else {
            setCharLimitExceeded(false)
        }
    }, [charCount])


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

                                            <div className='flex flex-col justify-center items-center gap-5 my-5 '>
                                                <textarea
                                                    type="text"
                                                    placeholder="Your business idea"
                                                    className={`border-2 h-[100px] p-2 rounded-md w-full outline-none scrollbar-none ${charLimitExceeded && "border-red-500"}`}
                                                    value={query}
                                                    onChange={(e) => {
                                                        setQuery(e.target.value)
                                                        setCharCount(e.target.value.length)

                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            createNewproject()
                                                        }
                                                    }}
                                                />
                                                <div className='w-full flex justify-end items-end text-sm'>
                                                    <span className={`${charCount > 100 && "text-red-500"}`}> {charCount}</span>/300
                                                </div>
                                                <button
                                                    className='bg-[#FFF0DF] rounded-full px-4 py-2 flex items-center text-brand hover:bg-brand hover:text-white transition-colors duration-300 disabled:bg-gray-100 disabled:text-red-500 disabled:cursor-not-allowed'
                                                    onClick={createNewproject}
                                                    disabled={charLimitExceeded || query.trim().length < 15}
                                                >
                                                    {loading ? (<span className="loading loading-spinner loading-xs"></span>) : (<p className=' flex items-center gap-1'>Ask Navigator
                                                        <Image
                                                            src="/images/pointer.png"
                                                            height={15}
                                                            width={15}
                                                            alt="logo"
                                                            style={{ objectFit: 'contain' }}
                                                            className="ml-1"
                                                        /></p>)}
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


