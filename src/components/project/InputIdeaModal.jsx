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

const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});


const InputModal = ({ id, isOpen, setIsOpen }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const { getToken } = useAuth()

    const api = process.env.NEXT_PUBLIC_URL;

    function closeModal() {
        if (query.trim() === '') {
            alert('Please enter some text before closing.');
            return;
        }

        if (loading) {
            alert('Please wait...')
            return;
        }

        if (!isSelected) {
            toast.error('Please select an option')
            return;
        }


        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [swiper, setSwiper] = useState(null)

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '</span>';
        },
    };

    const handleInput = async () => {

        if (query === "") {
            return;
        }
        setLoading(true);
        let token = await getToken();
        try {
            let res = await axios.get(`${api}/api/query?q=${query}&id=${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success) {
                // setResults(res.data.data);
                let data = res.data.data;
                let arr = []
                for (let i = 0; i < data.length; i++) {
                    let element = data[i];
                    let arrayOfObjects = Object.keys(element).map((key) => {
                        return {
                            key: key,
                            value: element[key],
                        };
                    });

                    if (arr.length === data.length) {
                        break;
                    } else {
                        arr.push(arrayOfObjects);
                    }
                }
                setResults(arr);
            }

            setLoading(false);


        } catch (error) {
            console.log(error);
            setLoading(false);
            setResults([]);
        }
    }

    // console.log(results, "res")

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
                                        {loading ? (
                                            <div className='flex items-center justify-center w-full '>
                                                <span className="loading loading-spinner text-primary loading-lg"></span>
                                            </div>
                                        ) : (
                                            results.length > 0 ? (
                                                <div className='w-full'>
                                                    <Swiper
                                                        onSwiper={(swiper) => setSwiper(swiper)}
                                                        pagination={pagination}
                                                        navigation={false}
                                                        modules={[Navigation, Pagination]}
                                                        spaceBetween={50}
                                                        slidesPerView={1}
                                                        style={{
                                                            "--swiper-pagination-color": "#FD8A09",
                                                            "--swiper-pagination-bullet-inactive-color": "#999999",
                                                            "--swiper-pagination-bullet-inactive-opacity": "1",
                                                            "--swiper-pagination-bullet-size": "16px",
                                                            "--swiper-pagination-bullet-horizontal-gap": "6px",
                                                            "--swiper-button-prev": "#FD8A09",
                                                            "--swiper-button-next": "#FD8A09",
                                                        }}
                                                    >
                                                        {/* // <div className="carousel w-full"> */}
                                                        {results.map((item, index) => {
                                                            return (
                                                                <SwiperSlide
                                                                    key={index}

                                                                >

                                                                    <div
                                                                        className=" relative w-full flex flex-col "
                                                                        id={`slide${index}`}
                                                                        key={index}
                                                                    >
                                                                        <CardComponent
                                                                            data={item}
                                                                            id={id}
                                                                            isSelected={isSelected}
                                                                            setIsSelected={setIsSelected}
                                                                            closeModal={closeModal}
                                                                        // handleClick={handleClick}
                                                                        />
                                                                    </div>
                                                                </SwiperSlide>
                                                            );
                                                        })}

                                                    </Swiper>
                                                </div>
                                            ) : (<div className='w-full'>

                                                {/* <h3 className="font-bold text-lg">Enter Business idea</h3> */}

                                                <div className='flex flex-col justify-center items-center gap-5 my-5'>
                                                    <input
                                                        type="text"
                                                        placeholder="Your business idea"
                                                        className="input w-full border outline-none"
                                                        value={query}
                                                        onChange={(e) => setQuery(e.target.value)}
                                                    />
                                                    <button
                                                        className='bg-[#FFF0DF] rounded-full px-4 py-2 text-brand flex items-center gap-1 hover:bg-brand hover:text-white transition-colors duration-300'
                                                        onClick={handleInput}
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
                                            </div>)
                                        )}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default InputModal;


