import { LockClosedIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

const Card = ({ title, description, data, selected }) => {
    return (
        <div className={classNames({
            "card w-[279px] h-[190px] shadow-md": true,
            "bg-[#FFF0DF]": selected,
            "bg-[#F1F2F4]": !selected
        })}>
            <div className="card-body py-6">
                {!selected && (
                    <LockClosedIcon className="w-5 h-5 text-[#808182]" />
                )}
                <h2 className={classNames({
                    "card-title text-[17px] w-full": true,
                    "whitespace-nowrap": title.length < 27,
                    " max-w-[270px]": title.length > 27,
                    "text-brand": selected
                })}>{title}</h2>
                <p className='text-[13px]'>{String(description).substring(0, 60) + "..."}</p>
                <div className="card-actions justify-start">
                    <button className={classNames({
                        " rounded-full px-4 py-2 text-white text-[13px]": true,
                        "bg-brand": selected,
                        "bg-[#808182]": !selected
                    })}>
                        {selected ? "View Details" : (
                            <div className='flex items-center gap-2 w-full '>

                                <Image src="/images/whitecoin.svg" height={20} width={20} alt="coin" />

                                <p>
                                    5 credits
                                </p>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card