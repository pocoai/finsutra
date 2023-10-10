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
        <Link href={`/share/${projectId}?journey=${id}`}>
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
]

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


const SharedHeader = ({ id, name, journey, user }) => {


    return (
        <header>
            <div className='flex flex-col lg:flex-row items-center w-full justify-between mb-10'>

                <div className='flex flex-col lg:flex-row items-center justify-between w-full gap-8'>
                    <div className='flex items-center justify-center text-brand gap-2'>
                        <Image
                            src={`/images/logo.png`}
                            height={100}
                            width={100}
                            alt="logo"
                            className="h-auto w-auto"
                        />
                    </div>
                    <Link href="/sign-up" prefetch={false} className="bg-[#FFF0DF] rounded-full px-4 py-2 text-brand flex items-center gap-2 whitespace-nowrap">
                        Sign Up  <Image
                            src="/images/pointer.png"
                            height={15}
                            width={15}
                            alt="logo"
                            style={{ objectFit: 'contain' }}
                            className=""
                        />
                    </Link>

                </div>
            </div>
            <h1 className='text-[20px] font-[700] w-full my-5'>
                <Link href={'/'} prefetch={false}>
                    {`${capitalize(user)}\`s`} Shared Space </Link> / {name}
            </h1>
            <div className='flex flex-col items-start justify-center w-full lg:flex-row lg:items-center lg:justify-start gap-3'>
                {journeys.map((j) => (
                    <Journey key={j.id} {...j} selected={journey} projectId={id} />
                ))}
            </div>

        </header>
    )
}

export default SharedHeader