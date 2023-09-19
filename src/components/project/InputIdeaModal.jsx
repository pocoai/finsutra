import { useAuth } from '@clerk/nextjs';
import { PlusSmallIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import CardComponent from './ResultComponent';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const InputModal = ({ id }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [results, setResults] = useState([]);
    const { getToken } = useAuth()




    const closeModal = () => {
        if (query.trim() === '') {
            alert('Please enter some text before closing.');
        } else {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        document.querySelector("#idea_modal").checked = isModalOpen;
    }, [isModalOpen]);


    const handleInput = async () => {

        if (query === "") {
            return;
        }
        setLoading(true);


        let token = await getToken();



        try {
            let res = await axios.get(`http://localhost:3000/api/query?q=${query}&id=${id}`, {
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

    console.log(results, "res")

    return (
        <div className=''>

            <input type="checkbox" id="idea_modal" className="modal-toggle" />
            <div className={`modal ${isModalOpen ? 'active' : ''}`}>
                <div className={`${results.length > 0 ? "w-[1000px] p-5 rounded-md" : "modal-box"} bg-white`}>
                    {loading ? (
                        <div className='flex items-center justify-center'>
                            <span className="loading loading-spinner text-primary loading-lg"></span>
                        </div>
                    ) : (
                        results.length > 0 ? (
                            <div className='w-full'>
                                <Swiper
                                    navigation
                                    pagination={{ clickable: true }}
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={50}
                                    slidesPerView={1}
                                >
                                    {/* // <div className="carousel w-full"> */}
                                    {results.map((item, index) => {
                                        return (
                                            <SwiperSlide
                                                key={""}

                                            >

                                                <div
                                                    className=" relative w-full flex flex-col "
                                                    id={`slide${index}`}
                                                    key={index}
                                                >
                                                    <CardComponent
                                                        data={item}
                                                        id={id}
                                                    // handleClick={handleClick}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}

                                </Swiper>
                            </div>
                        ) : (<div className='w-full'>

                            <h3 className="font-bold text-lg">Enter Business idea</h3>

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
                <label className="modal-close" htmlFor="idea_modal" onClick={closeModal}>
                    Close
                </label>
            </div>
        </div>
    );
};

export default InputModal;
