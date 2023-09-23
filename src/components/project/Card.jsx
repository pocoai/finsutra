import { creditPricing, getCreditViaTab } from '@/utils/credits';
import { LockClosedIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ViewModal from './ViewModal';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { toast } from 'react-toastify';

import { LockOpenIcon } from '@heroicons/react/24/solid';
import "animate.css"


const Card = ({ title, description, tab, data, selected, loading, journey, id, locked }) => {
    const [cardLoading, setCardLoading] = useState(loading)
    const [openModal, setOpenModal] = useState(false)

    const { getToken } = useAuth()

    useEffect(() => {
        setCardLoading(loading)
    }, [loading])


    const getTab = (tab) => {
        if (tab === 7) {
            return 9
        }
        else {
            return tab
        }
    }

    const api = process.env.NEXT_PUBLIC_URL;
    const handleApiCall = async () => {

        let currentab;

        // console.log("api here");
        let token = await getToken();

        setCardLoading(true)
        try {
            let res = await axios.post(`${api}/api/project/${id}?journey=${journey}&tab=${getTab(tab)}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })


            if (res.data.success) {

                window.location.reload()
            }
            else {
                toast.error("Internal Server Error")
            }


        } catch (error) {
            console.log(error);
            toast.error("Internal Server Error")
        }
        setCardLoading(false)
    }

    return (
        <div className={classNames({
            "card w-[279px] h-[190px] shadow-md animate__animated animate__fadeInLeft": true,
            "bg-[#FFF0DF]": selected,
            "bg-[#F1F2F4]": !selected
        })}

        >
            <div className="card-body px-4 py-6">
                {selected ? null : locked ? (
                    <LockClosedIcon className="w-5 h-5 text-[#808182]" />
                ) : (
                    <LockOpenIcon className="w-5 h-5 text-[#808182]" />
                )}


                <h2 className={classNames({
                    "card-title text-[17px] w-full": true,
                    "whitespace-nowrap": title.length < 27,
                    " max-w-full": title.length > 27,
                    "text-brand": selected
                })}>{title}</h2>
                <p className='text-[13px]'>{
                    String(description).substring(0, 30) + "..."
                }</p>
                <div className="card-actions justify-start">


                    {
                        cardLoading ? <span className="loading loading-bars loading-sm"></span> : <button

                            onClick={() => {
                                if (selected) {
                                    setOpenModal(!openModal)
                                }
                                else {
                                    return
                                }
                            }}

                            className={classNames({
                                " rounded-full px-4 py-2 text-white text-[13px]": true,
                                "bg-brand": selected,
                                "bg-[#808182]": !selected
                            })}>{selected ? "View Details" : (
                                <div className='flex items-center gap-2 w-full' onClick={handleApiCall}>

                                    <Image src="/images/whitecoin.svg" height={20} width={20} alt="coin" />

                                    <p>
                                        {getCreditViaTab(journey, tab)} credits
                                    </p>
                                </div>
                            )}  </button>
                    }

                </div>
            </div>

            {openModal && <ViewModal isOpen={openModal} setIsOpen={setOpenModal} title={title} data={data} journey={journey} tab={getTab(tab)} />}


        </div>
    )
}

export default Card