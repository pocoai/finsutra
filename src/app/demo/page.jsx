"use client"

import React from 'react'
import ReactPlayer from 'react-player'

const Demo = () => {
    return ( 
        <div>
            <h1 className="text-2xl font-bold">Overview of Finsutra</h1>
            <div className='w-full h-screen flex justify-center items-center'>
                <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
            </div>
        </div>
     );
}
 
export default Demo;