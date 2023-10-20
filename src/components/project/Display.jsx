import React from 'react'
import ReactMarkdown from 'react-markdown'


const Accordian = ({ name, data, checked, selected }) => {
    return (<div className="collapse collapse-arrow join-item border">
        <input type="radio" name="my-accordion-1" checked="checked" />
        <div className="collapse-title text-xl font-medium">
            {name}
        </div>
        <div className="collapse-content">
            {
                !selected && <p>
                    Tab is not processed yet
                </p>
            }
            <ReactMarkdown className='prose px-6 py-2'>
                {data}
            </ReactMarkdown>
        </div>
    </div>)
}

const Display = ({ tabsCompleted }) => {
    return (
        <div className=" h-full w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-brand">
            {
                tabsCompleted.length > 0 ? tabsCompleted.map((item, index) => {
                    return (
                        <div key={index} className="join join-vertical w-full">
                            <Accordian name={item.name} data={item.data} selected={item.selected} />
                            <hr className="mt-2" />
                        </div>
                    )
                }) : (
                    <div className='w-full h-fit flex items-center justify-center'>
                        <h1 className="px-4 text-black text-3xl font-medium">
                            Select a chapter to view
                        </h1>
                        <hr className="mt-2" />
                    </div>
                )
            }
        </div>
    )
}

export default Display