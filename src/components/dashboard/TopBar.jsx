import Image from 'next/image'
import React from 'react'
import { currentUser, auth } from "@clerk/nextjs";


// async function getUserData() {
//     let data = await fetch("http://localhost:3000/api/auth", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",

//         },
//     })

//     return data.json()
// }




const TopBar = async () => {
    const user = await currentUser()

    // let userData = await getUserData()

    // console.log(userData, "userData")


    return (
        <div className='flex justify-start w-full items-end'>
            <div className='w-full space-y-6'>
                <h2 className='text-4xl font-medium'>
                    Hello {user.firstName}
                </h2>
                <p className='text-[16px] text-primary'>
                    You’re almost there! Complete your tasks to realize your entrepreneurial journey.
                </p>
            </div>
            <div className='flex items-center justify-end w-full gap-4'>
                <div className='flex items-center justify-center text-brand gap-2'>
                    <Image
                        src={`/images/orangecoin.svg`}
                        height={20}
                        width={20}
                        alt="logo"
                        className=""
                    />
                    <p>
                        Remaining Credits: 100
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