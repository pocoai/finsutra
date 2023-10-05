import React from 'react'
import ReactMarkdown from 'react-markdown'

const Display = ({ tabsCompleted }) => {
    return (
        <div className="bg-white border-2 rounded-md h-full overflow-y-scroll scrollbar-thumb-brand">
            {
                tabsCompleted.map((item, index) => {
                    return (
                        <div key={index}>
                            <ReactMarkdown>
                                {item.data}
                            </ReactMarkdown>
                            <hr className="mt-2" />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Display