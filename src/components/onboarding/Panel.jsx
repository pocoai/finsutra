import Image from 'next/image'
import React from 'react'

const Panel = () => {
    return (
        <div className='w-full h-screen bg-brand flex flex-col items-center justify-center gap-8 relative'>
            <div className='w-[50%]'>
                <p className='text-[28px] font-bold text-white  text-center'>
                    Build ideas for your business with us
                </p>
            </div>

            <div>
                <Image
                    width={460}
                    height={280}
                    src="/images/panel.png"
                    alt='panel'
                />
                <div className='absolute top-0 left-0 z-50 h-screen w-full' >
                    <Image
                        fill
                        src="/images/overlay.png"
                        alt='overlay'
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Panel
