import React from 'react'
import ReactMarkdown from 'react-markdown'


const Accordian = ({ name, data, checked }) => {
    return (<div className="collapse collapse-arrow join-item border">
        <input type="radio" name="my-accordion-1" checked={checked} />
        <div className="collapse-title text-xl font-medium">
            {name}
        </div>
        <div className="collapse-content">
            <ReactMarkdown className='prose px-6 py-2'>
                {data}
            </ReactMarkdown>
        </div>
    </div>)
}

const Display = ({ tabsCompleted }) => {
    return (
        <div className=" h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-brand">
            {
                tabsCompleted.map((item, index) => {
                    return (
                        <div key={index} className="join join-vertical w-full">
                            <Accordian name={item.name} data={item.data} checked={item.selected} />
                            <hr className="mt-2" />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Display