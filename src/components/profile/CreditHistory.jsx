import Link from 'next/link'
import React from 'react'



const CreditTab = ({ letter, date, tab, credits, purchase }) => {
    return (
        <div className='flex items-center justify-between w-full p-3'>
            <div className='flex items-center gap-5 w-full'>
                <div className='w-[36px] flex items-center justify-center h-[36px] rounded-full bg-[#FFF0DF] text-center text-brand'>
                    <p>
                        {letter}
                    </p>
                </div>
                <div className='flex flex-col items-start justify-start text-md '>
                    <p className='font-bold'>
                        {tab}
                    </p>

                    <p className='font-medium text-sm'>
                        {date}
                    </p>
                </div>
            </div>

            <div>
                {purchase ? (
                    <p className='text-green-500 whitespace-nowrap'>
                        + {credits} credits
                    </p>
                ) : (
                    <p className='text-red-500 whitespace-nowrap'>
                        - {credits} credits
                    </p>

                )}
            </div>
        </div>
    )
}

const data = [{
    letter: 'C',
    date: 'Today',
    tab: 'Standard Plan',
    credits: 500,
    purchase: true
}, {
    letter: 'P',
    date: '18 September 2022 at 10:00 AM',
    tab: 'Position & Messaging',
    credits: 10,
    purchase: false
}, {
    letter: 'C',
    date: 'Today',
    tab: 'Standard Plan',
    credits: 500,
    purchase: true
}, {
    letter: 'P',
    date: '18 September 2022 at 10:00 AM',
    tab: 'Position & Messaging',
    credits: 10,
    purchase: false
}, {
    letter: 'C',
    date: 'Today',
    tab: 'Standard Plan',
    credits: 500,
    purchase: true
}, {
    letter: 'P',
    date: '18 September 2022 at 10:00 AM',
    tab: 'Position & Messaging',
    credits: 10,
    purchase: false
}]


const CreditHistory = ({ credits, currentPlan, creditHistory }) => {
    return (
        <div className='w-[500px] h-[500px] flex items-start justify-start gap-2 flex-col border rounded-2xl p-3'>
            <h1 className='text-lg font-bold'>
                Credits Transaction History
            </h1>
            <div className='w-full flex items-center justify-between py-3 border-b'>

                <div>
                    <p className='text-sm text-[#808182]'>
                        Credits Remaining
                    </p>
                    <span className='text-lg font-bold'>
                        {credits}
                    </span>
                </div>
                <div>
                    <p className='text-sm text-[#808182]'>
                        Current Plan
                    </p>
                    <span className='text-lg font-bold'>
                        {currentPlan}
                    </span>
                </div>
                <div>
                    <Link prefetch={false} href={`/pricing`} className='bg-brand rounded-full px-4 py-2 font-semibold text-md text-white'>
                        Buy Credits
                    </Link>
                </div>
            </div>


            <div className='w-full h-full overflow-y-scroll scrollbar-thumb-gray-300 scrollbar-thin'>
                {data.map((item, index) => (
                    <CreditTab key={index} {...item} />
                ))}
            </div>

        </div>
    )
}

export default CreditHistory