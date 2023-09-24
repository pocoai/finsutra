'use client'

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

import { journeyState } from "@/state/atoms/tabState";
import { useRecoilState, useSetRecoilState } from "recoil";


const Card = ({ title, description, tab, data, selected, loading, journey, id, locked }) => {
    // nir
    const [journeyData, setJourneyData] = useRecoilState(journeyState);
    // nir
    const [cardLoading, setCardLoading] = useState(loading)
    const [openModal, setOpenModal] = useState(false)

    const { getToken } = useAuth()

    useEffect(() => {
        setCardLoading(loading)
    }, [loading])


    const getTab = (tab) => {

        return tab

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

                // window.location.reload() //nir
                const updatedData = {
                    ...res.data.data,
                    selected: true,
                };
                console.log('first',updatedData)

                setJourneyData(prevState => {
                    return prevState.map(item => {
                        if (item.title === title) {
                            return {
                                ...item,
                                ...updatedData, // Update the specific tab with new data
                            };
                        } else {
                            return item;
                        }
                    });
                });
                console.log('second',journeyData)
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
                    "whitespace-nowrap": title?.length < 27,
                    " max-w-full": title?.length > 27,
                    "text-brand": selected
                })}>{title}</h2>
                <p className='text-[13px]'>{
                    selected?'Click to view...' :String(description).substring(0, 30) + "..."
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