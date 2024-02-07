"use client"

import React from 'react'
import ReactPlayer from 'react-player'

const Demo = () => {
    return ( 
        <div>
            <h1 className="text-2xl font-bold">Overview of Finsutra</h1>
            <div className='w-full h-screen flex justify-center items-center'>
                <div className='bg-red-300 min-w-[500px] min-h-[500px]'>
                    <iframe className='w-full h-[500px]' src="https://www.loom.com/embed/1ce077d6286348cc8cd549a484bc326e?sid=40588d91-b993-4932-a1b4-f1cca1983318" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </div>
            </div>
        </div>
     );
}
 
export default Demo;