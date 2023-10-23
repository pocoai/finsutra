"use client"


import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { currentUser, auth, useAuth } from "@clerk/nextjs";
import "animate.css"
import axios from 'axios';
import { getUserData } from '@/services/user';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import InviteModal from './InviteModal';
import { useRecoilValue } from 'recoil';
import { userState } from '@/state/atoms/userState';




const TopBar = () => {
    // const user = await currentUser()

    // let { getToken } = auth()

    // let token = await getToken()

    // let user = await getUserData(token)

    const [openModal, setOpenModal] = useState(false)

    const user = useRecoilValue(userState)

    return (
        <div className='flex justify-start w-full items-end'>
            {
                !user.firstName && <div className='flex items-start flex-col w-full justify-start space-y-6'> <p className="w-32 bg-gray-100 h-7 rounded-sm animate-pulse duration-75 mr-1"></p> <p className="w-72 bg-gray-100 h-5 rounded-sm animate-pulse duration-75 mr-1"></p></div>
            }

            {
                user?.firstName && <div className='w-full space-y-6'> <h2 className='text-4xl font-medium animate__animated animate__fadeInDown flex  items-center gap-2'>
                    Hello {user?.firstName}
                </h2>
                    <p className='text-[16px] text-primary animate__animated animate__fadeInDown'>
                        You’re almost there! Complete your tasks to realize your entrepreneurial journey.
                    </p>
                </div>
            }

            <div className='flex items-center justify-end w-full gap-4  px-6'>


                {user?.credits ? (
                    <div className='flex items-center justify-center text-brand gap-2 animate__animated animate__fadeInDown'>
                        <Image
                            src={`/images/orangecoin.svg`}
                            height={40}
                            width={40}
                            alt="logo"
                            className="w-auto h-auto"
                        />
                        <p className='whitespace-nowrap'>
                            Remaining Credits: {user?.credits}
                        </p>
                    </div>
                ) : (
                    <p className="inline-flex w-32 bg-gray-100 h-5 rounded-md animate-pulse mr-1"></p>
                )}
                {/* <p>
                        Remaining Credits: {user?.credits}
                    </p> */}

                <Link href={"/pricing"} prefetch={false} className='bg-brand rounded-full px-4 py-2 text-white animate__animated animate__fadeInDown'>
                    Buy Credits
                </Link>

                <button

                    onClick={() => setOpenModal(true)}
                    className='bg-[#FFF0DF] rounded-full px-4 py-2 text-brand flex items-center gap-2 whitespace-nowrap animate__animated animate__fadeInDown'>
                    Invite Colleagues
                </button>
            </div>

            {openModal && (<InviteModal isOpen={openModal} setIsOpen={setOpenModal} />)}
        </div>
    )
}

export default TopBar