'use client'
import { creditCountState, userState } from '@/state/atoms/userState'

import { ArrowDownIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import { useRecoilValue } from 'recoil'


import React, { useState } from 'react'

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


const MinigatorHeader = ({ id, name, journey }) => {
    const user = useRecoilValue(userState)


    return (
        <header>
            <div className='flex flex-col lg:flex-row items-center justify-between '>
                <h1 className='text-[28px] font-[700] w-full'>
                    Workspace
                </h1>
            </div>
        </header>
    )
}

export default MinigatorHeader