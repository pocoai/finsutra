"use client"

import { journey2 } from '@/app/project/[id]/page'
import { getCreditViaTab } from '@/utils/credits'
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useState } from 'react'

const ChapterCard = ({ selected, name, loading, locked, description, chapter, setCurrentChapter, tabsCompleted }) => {

    const [cardLoading, setCardLoading] = useState(loading);

    const getChapterCredits = (id) => {
        let credits = 0;

        journey2
            .filter((item) => item.chapter === id)
            .map((chapters) => {
                credits += getCreditViaTab(2, chapters.tab);
            });

        return credits;
    };

    return (
        <div className={classNames({
            "card w-[280px] h-[210px] shadow-md animate__animated animate__fadeInLeft": true,
            "bg-[#FFF0DF]": selected,
            "bg-[#F1F2F4]": !selected
        })}

        >
            <div className="card-body px-4 py-6">
                {selected ? null : locked ? (
                    <LockClosedIcon className="w-5 h-5 text-[#808182]" />
                ) : (
                    <LockOpenIcon className="w-5 h-5 text-[#808182]" />
                )}


                <h2 className={classNames({
                    "card-name text-[17px] w-full": true,
                    "whitespace-nowrap": name?.length < 27,
                    " max-w-full": name?.length > 27,
                    "text-brand": selected
                })}>{name}</h2>
                <p className='text-[15px]'>{
                    //  String(description).substring(0, 30) + "..."
                    description
                }</p>
                <div className="card-actions justify-start">


                    {
                        cardLoading ? <span className="loading loading-bars loading-sm"></span> : <p
                            className={classNames({
                                " rounded-full px-4 text-center py-2 text-white text-[13px]": true,
                                "bg-brand": selected,
                                "bg-[#808182]": !selected
                            })}>{selected ? <button onClick={() => setCurrentChapter(tabsCompleted)}>
                                View Details
                            </button> : (
                                <div className='flex items-center gap-2 w-full'>

                                    <Image src="/images/whitecoin.svg" height={20} width={20} alt="coin" />

                                    <p>
                                        {getChapterCredits(chapter)} credits
                                    </p>
                                </div>
                            )}  </p>
                    }

                </div>
            </div>


        </div>
    )
}

export default ChapterCard