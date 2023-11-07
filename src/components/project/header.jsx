'use client'
import { creditCountState, userState } from '@/state/atoms/userState'

import { ArrowDownIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import { useRecoilValue } from 'recoil'


import React, { useEffect, useState } from 'react'
import PdfDisplay from '../PdfDisplay'
import PdfViewModal from '../PdfModal'
import { ShareIcon } from '@heroicons/react/24/solid'
import ShareModal from './shareModal'
import Typewriter from 'typewriter-effect';




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
    const [journeyStates, setJourneyStates] = useState({
        journey1: false,
        journey2: false,
        journey3: false,
    });
    const [showPdf, setShowPdf] = useState(false);


    const handleCheckboxChange = (journeyName) => {
        setJourneyStates({
            ...journeyStates,
            [journeyName]: !journeyStates[journeyName],
        });
    };

    // console.log(journeyStates, 'journeyStates');





    function trimString(str) {
        if (str.length > 20) {
            return str.substring(0, 20) + "...";
        }
        return str;
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
                    <div className='max-w-2xl'>

                        {// add `cursor` as a prop if you want the cursor effect
                            name && (
                                <Typewriter
                                    options={{
                                        cursor: "_"
                                    }}
                                    onInit={(typewriter) => {
                                        typewriter
                                            .changeDelay(70)
                                            .typeString(`${trimString(name)}`)
                                            .start()
                                            .callFunction((state) => {
                                                state.elements.cursor.remove()
                                            })
                                    }}
                                />

                            )

                            || <div className="w-16 bg-gray-100 h-5 rounded-sm animate-pulse mr-1"></div>}
                    </div>
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
                        <div className='whitespace-nowrap'>
                            Remaining Credits: {credits || <p className=" inline-flex w-3 bg-gray-100 h-3 rounded-sm animate-pulse mr-1"></p>}
                        </div>
                    </div>
                    <Link href="/pricing" prefetch={false} className='bg-brand rounded-full px-4 py-2 text-white whitespace-nowrap'>
                        Buy Credits
                    </Link>
                    <button className='bg-[#FFF0DF] rounded-full px-4 py-2 text-brand flex items-center gap-2 whitespace-nowrap' onClick={() => setShareModal(true)}>
                        <ShareIcon className='w-5 h-5' />
                        Share
                    </button>

                    <div className="dropdown bg-white z-10">
                        <label tabIndex={0} className="">
                            <button className='bg-[#FFF0DF] rounded-full px-4 py-2 text-brand flex items-center whitespace-nowrap gap-2' >
                                <ArrowDownTrayIcon className='w-5 h-5' />
                                Download Playbook
                            </button>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu gap-3 shadow bg-white rounded-box w-full">
                            <div className="form-control w-fit mx-auto">
                                <label className="cursor-pointer label space-x-4">

                                    <input
                                        type="checkbox"
                                        checked={journeyStates.journey1}
                                    
                                        onChange={() => handleCheckboxChange('journey1')}
                                        className="accent-brand text-white w-5 h-5"
                                    />
                                    <span className="label-text text-lg">Journey 1</span>
                                </label>
                            </div>
                            <div className="form-control w-fit mx-auto">
                                <label className="cursor-pointer label space-x-4">
                                    <input
                                        type="checkbox"
                                        checked={journeyStates.journey2}
                                       
                                        onChange={() => handleCheckboxChange('journey2')}
                                        className="accent-brand text-white w-5 h-5"
                                    />
                                    <span className="label-text text-lg">Journey 2</span>
                                </label>
                            </div>
                            <div className="form-control w-fit mx-auto">
                                <label className="cursor-pointer label space-x-4">
                                    <input
                                        type="checkbox"
                                        checked={journeyStates.journey3}
                                      
                                        onChange={() => handleCheckboxChange('journey3')}
                                        className="accent-brand text-white w-5 h-5"
                                    />
                                    <span className="label-text text-lg">Journey 3</span>
                                </label>
                            </div>
                            <button className='bg-[#FFF0DF] text-center rounded-full px-4 py-2 text-brand flex justify-center items-center whitespace-nowrap gap-2'

                                onClick={() => {
                                    if (!journeyStates.journey1 && !journeyStates.journey2 && !journeyStates.journey3) {
                                        return
                                    }
                                    setShowPdf(true)
                                }}


                            >
                                <ArrowDownTrayIcon className='w-5 h-5' />
                                <p>Download</p>
                            </button>
                        </ul>

                    </div>

                </div>
            </div>
            <div className='flex flex-col items-start justify-center w-full lg:flex-row lg:items-center lg:justify-start gap-3'>
                {journeys.map((j) => (
                    <Journey key={j.id} {...j} selected={journey} projectId={id} />
                ))}
            </div>
            {showPdf && <PdfDisplay setShowPdf={setShowPdf} showPdf={showPdf} id={id} journeyStates={journeyStates} />}
            {shareModal && <ShareModal isOpen={shareModal} setIsOpen={setShareModal} id={id} journey={journey} title={name} />}
        </header>
    )
}

export default Header