
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const UserProfile = async ({ userData }) => {

    let user = await currentUser();






    return (
        <div className='w-[320px] h-[470px] flex items-center justify-evenly gap-5 flex-col border rounded-2xl'>
            <h1 className='font-bold text-center'>
                Your Profile
            </h1>
            <Image
                src={user.imageUrl}
                height={100}
                width={100}
                alt="logo"
                className='rounded-full'
            />

            <div className='space-y-3 w-full px-10'>
                <p className='grid grid-cols-2 place-content-start'>
                    <span className='font-semibold'>
                        Name:
                    </span>

                    <span>
                        {user.firstName} {user.lastName}
                    </span>
                </p>
                <p className='grid grid-cols-2 place-content-start'>
                    <span className='font-semibold'>
                        Designation :
                    </span>

                    <span className='whitespace-nowrap'>
                        {userData?.interests?.designation || (<p className="text-red-500"> N/A </p>)}
                    </span>
                </p>
                <p className='grid grid-cols-2 place-content-start'>
                    <span className='font-semibold'>
                        Goal:
                    </span>

                    <span>
                        {userData?.interests?.goal || (<p className="text-red-500"> N/A </p>)}
                    </span>
                </p>
                <p className='grid grid-cols-2 place-content-start'>
                    <span className='font-semibold'>
                        Organisation:
                    </span>

                    <span>
                        {userData?.interests?.work || (<p className="text-red-500"> N/A </p>)}
                    </span>
                </p>
                <p className='grid grid-cols-2 place-content-start'>
                    <span className='font-semibold'>
                        Skill:
                    </span>

                    <span>
                        {userData?.interests?.skill || (<p className="text-red-500"> N/A </p>)}
                    </span>
                </p>
            </div>
            <button className='bg-brand rounded-full px-4 py-2 font-semibold text-white'>
                Edit Profile
            </button>
        </div>
    )
}

export default UserProfile