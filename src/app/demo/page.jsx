"use client"

import React from 'react'
import ReactPlayer from 'react-player'

const Demo = () => {
    return ( 
        <div>
            <h1 className="text-2xl font-bold">Overview of Finsutra</h1>
            <div className='w-full h-screen flex justify-center items-center'>
                <ReactPlayer url='https://www.loom.com/share/1ce077d6286348cc8cd549a484bc326e?sid=0cac6257-f12e-4ef3-b4bf-4cfc7e52e757' />
            </div>
        </div>
     );
}
 
export default Demo;