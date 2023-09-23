import React from 'react'

const page = ({ searchParams }) => {

    const success = Boolean(searchParams?.success);
    const cancelled = Boolean(searchParams?.cancelled);


    return (
        <div className='flex flex-col items-center justify-center w-full h-screen text-6xl'>
            {success && <h1 className='text-green-500 '>Payment Successful</h1>}
            {cancelled && <h1 className='text-red-500'>Payment Cancelled</h1>}
        </div>
    )
}

export default page