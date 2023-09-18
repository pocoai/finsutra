import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const UserProfile = async () => {

    let user = await currentUser()

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
                        Front-End Developer
                    </span>
                </p>
                <p className='grid grid-cols-2 place-content-start'>
                    <span className='font-semibold'>
                        Goal:
                    </span>

                    <span>
                        Build Website
                    </span>
                </p>
                <p className='grid grid-cols-2 place-content-start'>
                    <span className='font-semibold'>
                        Organisation:
                    </span>

                    <span>
                        POCO AI
                    </span>
                </p>
                <p className='grid grid-cols-2 place-content-start'>
                    <span className='font-semibold'>
                        Skill:
                    </span>

                    <span>
                        Nextjs
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