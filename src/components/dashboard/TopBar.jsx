import Image from 'next/image'
import React from 'react'
import { currentUser, auth, useAuth } from "@clerk/nextjs";
import "animate.css"
import axios from 'axios';


async function getUserData() {
    try {
        const { getToken } = auth();

        const token = await getToken();

        let response = await axios.get(`http://localhost:3000/api/auth`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",

            }
        })

        if (response.data.success) {
            return response.data.data;
        }
    } catch (error) {

        return error
    }

}




const TopBar = async () => {
    // const user = await currentUser()
    let user = await getUserData()
    return (
        <div className='flex justify-start w-full items-end'>
            <div className='w-full space-y-6'>
                <h2 className='text-4xl font-medium animate__animated animate__fadeInDown'>
                    Hello {user.firstName}
                </h2>
                <p className='text-[16px] text-primary animate__animated animate__fadeInDown'>
                    You’re almost there! Complete your tasks to realize your entrepreneurial journey.
                </p>
            </div>
            <div className='flex items-center justify-end w-full gap-4 animate__animated animate__fadeInDown px-6'>
                <div className='flex items-center justify-center text-brand gap-2'>
                    <Image
                        src={`/images/orangecoin.svg`}
                        height={20}
                        width={20}
                        alt="logo"
                        className=""
                    />
                    <p>
                        Remaining Credits: {user?.credits}
                    </p>
                </div>
                <button className='bg-brand rounded-full px-4 py-2 text-white'>
                    Buy Credits
                </button>
            </div>
        </div>
    )
}

export default TopBar