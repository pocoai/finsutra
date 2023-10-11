'use client'
import { creditCountState, userState } from '@/state/atoms/userState'

import { ArrowDownIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import { useRecoilValue } from 'recoil'


import React, { useState } from 'react'
import PdfDisplay from '../PdfDisplay'
import PdfViewModal from '../PdfModal'
import { ShareIcon } from '@heroicons/react/24/solid'
import ShareModal from './shareModal'

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
        name: "Zero-to-Seed",
    },
    {
        id: 2,
        name: "Favcy Venture Manual",
    },
    {
        id: 3,
        name: "Favcy Jobs To be done",
    },
    // {
    //     id: 4,
    //     name: "Post-Product Growth",
    // }
]

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


const Header = ({ id, name, journey }) => {
    const user = useRecoilValue(userState)
    const credits = useRecoilValue(creditCountState)
    const [shareModal, setShareModal] = useState(false)


    const [showPdf, setShowPdf] = useState(false);

    const handleClick = () => {
        setShowPdf(prev => !prev)
    }
    return (
        <header>
            <div className='flex flex-col lg:flex-row items-center w-full justify-between mb-10'>
                <div className='text-[20px] font-[700] w-full flex items-center justify-start'>
                    <Link href={'/'} prefetch={false} className='flex items-center gap-1' >
                        {user.isLoaded ? <p className='whitespace-nowrap'>{`${capitalize(user.firstName)}\'s`} </p> : <p className="w-16 bg-gray-100 h-5 rounded-sm animate-pulse mr-1"></p>}

                        <p>
                            Workspace /&nbsp;
                        </p>

                    </Link>
                    <p className='whitespace-nowrap'>
                        {name || <div className="w-16 bg-gray-100 h-5 rounded-sm animate-pulse mr-1"></div>}
                    </p>
                </div>
                <div className='flex flex-col lg:flex-row items-center justify-end w-full gap-8'>
                    <div className='flex items-center justify-center text-brand gap-2'>
                        <Image
                            src={`/images/orangecoin.svg`}
                            height={40}
                            width={40}
                            alt="logo"
                            className="h-auto w-auto"
                        />
                        <p className='whitespace-nowrap'>
                            Remaining Credits: {credits || <p className=" inline-flex w-3 bg-gray-100 h-3 rounded-sm animate-pulse mr-1"></p>}
                        </p>
                    </div>
                    <Link href="/pricing" prefetch={false} className='bg-brand rounded-full px-4 py-2 text-white whitespace-nowrap'>
                        Buy Credits
                    </Link>
                    <button className='bg-[#FFF0DF] rounded-full px-4 py-2 text-brand flex items-center gap-2 whitespace-nowrap' onClick={() => setShareModal(true)}>
                        <ShareIcon className='w-5 h-5' />
                        Share
                    </button>
                    <button className='bg-[#FFF0DF] rounded-full px-4 py-2 text-brand flex items-center whitespace-nowrap gap-2' onClick={handleClick}>
                        <ArrowDownTrayIcon className='w-5 h-5' />
                        Download Playbook
                    </button>
                </div>
            </div>
            <div className='flex flex-col items-start justify-center w-full lg:flex-row lg:items-center lg:justify-start gap-3'>
                {journeys.map((j) => (
                    <Journey key={j.id} {...j} selected={journey} projectId={id} />
                ))}
            </div>
            {showPdf && <PdfDisplay setShowPdf={setShowPdf} showPdf={showPdf} id={id} />}
            {shareModal && <ShareModal isOpen={shareModal} setIsOpen={setShareModal} id={id} journey={journey} title={name} />}
        </header>
    )
}

export default Header