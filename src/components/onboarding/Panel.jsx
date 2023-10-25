import Image from 'next/image'
import React from 'react'
import 'animate.css';

const Panel = () => {
    return (
        <div className='p-5 md:p-0 w-full h-full lg:h-screen bg-brand flex flex-col items-center justify-center gap-8 relative'>
            <div className='w-[50%] animate__animated animate__bounceIn'>
                <p className='text-xl md:text-[28px] font-bold text-white  text-center'>
                    Build ideas for your business with us
                </p>
            </div>

            <div className='w-[80%] h-[150px] lg:h-[300px] relative'>
                <Image
                    // width={460}
                    // height={280}
                    fill
                    src="/images/panel.png"
                    alt='panel'
                    style={{ objectFit: 'contain' }}
                    className='animate__animated animate__bounceIn z-100'
                />

            </div>

            <div className='hidden lg:inline absolute top-0 left-0 -z-5 h-full lg:h-screen w-full' >
                <Image
                    fill
                    src="/images/overlay.png"
                    alt='overlay'
                    style={{ objectFit: 'cover' }}
                    sizes='80vw'
                />
            </div>
        </div>
    )
}

export default Panel
