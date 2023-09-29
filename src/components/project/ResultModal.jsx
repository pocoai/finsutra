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


const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

// try {

//     let res = await axios.get(`${api}/api/query?q=${query}&id=${project._id}`, {
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//     })

//     if (res.data.success) {
//         setChoices(res.data.data);
//         // closeModal();
//     }
//     setLoading(false);
// } catch (error) {
//     console.log(error);
//     setLoading(false);

// }


const ResultModal = ({ id, isOpen, setIsOpen, choices, query }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const { getToken } = useAuth()

    let api = process.env.NEXT_PUBLIC_URL

    const FetchResults = async () => {

        const token = await getToken()
        setLoading(true);
        let res = await axios.get(`${api}/api/query?q=${query}&id=${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.data.success) {
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
    }


    useEffect(() => {
        if (choices.length > 0) {
            let arr = []
            for (let i = 0; i < choices.length; i++) {
                let element = choices[i];
                let arrayOfObjects = Object.keys(element).map((key) => {
                    return {
                        key: key,
                        value: element[key],
                    };
                });

                if (arr.length === choices.length) {
                    break;
                } else {
                    arr.push(arrayOfObjects);
                }
            }
            setResults(arr);
        }
        else {
            FetchResults()
        }
    }, [choices])

    function closeModal() {


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
                                        Select Idea Articulation Results
                                    </Dialog.Title>

                                    {/* className={`${results.length > 0 ? "w-[1000px] p-5 rounded-md" : ""} bg-white`} */}

                                    {
                                        loading ? (

                                            <div className='w-full h-full flex items-center justify-center'>
                                                <span className="loading loading-spinner text-warning"></span>
                                            </div>

                                        ) : (<div className='w-full '>
                                            <Swiper
                                                onSwiper={(swiper) => setSwiper(swiper)}
                                                pagination={pagination}
                                                navigation={false}
                                                modules={[Navigation, Pagination]}
                                                spaceBetween={50}
                                                slidesPerView={1}
                                                className='my-1'
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
                                                                className=" relative w-full flex flex-col my-6 "
                                                                id={`slide${index}`}
                                                                key={index}
                                                            >
                                                                <CardComponent
                                                                    data={item}
                                                                    id={id}
                                                                    closeModal={closeModal}
                                                                // handleClick={handleClick}
                                                                />
                                                            </div>
                                                        </SwiperSlide>
                                                    );
                                                })}

                                            </Swiper>
                                        </div>)
                                    }


                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ResultModal;