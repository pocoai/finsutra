<<<<<<< HEAD
import { creditCountState, userState } from '@/state/atoms/userState'
=======
'use client'

>>>>>>> ad9f2a06271eddff8aae8e92be9f536fbc5aec15
import { ArrowDownIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
<<<<<<< HEAD
import React from 'react'
import { useRecoilValue } from 'recoil'


=======
import React, { useState } from 'react'
import PdfDisplay from '../PdfDisplay'
import PdfViewModal from '../PdfModal'
>>>>>>> ad9f2a06271eddff8aae8e92be9f536fbc5aec15

const Journey = ({ selected, id, name, projectId }) => {
    return (
        <Link href={`/project/${projectId}?journey=${id}`}>
            <div className={classNames({
                "flex items-center gap-4 border w-fit p-2 rounded-full cursor-pointer": true,
                "border-brand text-brand": selected === id,
                "border-primary": selected != id
            })}

            >
                <p>
                    #{id}
                </p>
                <p>
                    {name}
                </p>
            </div>
        </Link>)
}

const journeys = [
    {
        id: 1,
        name: "Zero-to-Coming Soon",
    },
    {
        id: 2,
        name: "Favcy Venture Manual",
    },
    // {
    //     id: 3,
    //     name: "Brand Marketing and Venture Strategy",
    // },
    // {
    //     id: 4,
    //     name: "Post-Product Growth",
    // }
]


const Header = ({ id, name, journey }) => {
    // const user = useRecoilValue(userState)
    const credits = useRecoilValue(creditCountState)


    const [showPdf, setShowPdf] = useState(false);

    const handleClick = () => {
        setShowPdf(prev => !prev)
    }
    return (
        <header>
            <div className='flex flex-col lg:flex-row items-center justify-between mb-20'>
                <h1 className='text-[20px] font-[700] w-full'>
                    Projects / {name}
                </h1>
                <div className='flex flex-col lg:flex-row items-center justify-end w-full gap-4'>
                    <div className='flex items-center justify-center text-brand gap-2'>
                        <Image
                            src={`/images/orangecoin.svg`}
                            height={20}
                            width={20}
                            alt="logo"
                            className=""
                        />
                        <p>
                            Remaining Credits: {credits}
                        </p>
                    </div>
                    <button className='bg-brand rounded-full px-4 py-2 text-white'>
                        Buy Credits
                    </button>
                    <button className='bg-[#FFF0DF] rounded-full px-4 py-2 text-brand flex items-center gap-2'>
                        <ArrowDownTrayIcon className='w-5 h-5' onClick={handleClick} />
                        Download Playbook
                    </button>
                </div>
            </div>
            <div className='flex flex-col items-start justify-center w-full lg:flex-row lg:items-center lg:justify-start gap-3'>
                {journeys.map((j) => (
                    <Journey key={j.id} {...j} selected={journey} projectId={id} />
                ))}
            </div>
            {showPdf && <PdfViewModal open={showPdf} onClose={handleClick}><PdfDisplay setShowPdf={setShowPdf} showPdf={showPdf} id={id} /></PdfViewModal>}
        </header>
    )
}

export default Header