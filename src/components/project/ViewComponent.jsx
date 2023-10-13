import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Markdown from 'react-markdown'


const ViewComponent = ({
    data,
    tab,
    journey,
    closeModal,

}) => {


    const router = useRouter();
    const pathname = usePathname();
    const handleReselection = () => {
        const query = `?journey=${journey}&reselect=true`;
        router.push(`${pathname}${query}`);
        closeModal()
    }


    if (journey === 1) {
        if (tab === 9) {
            return (
                <div>
                    <table id="bizcanvas" cellspacing="0" border="1">
                        <tr className="">
                            <td colSpan="2" rowSpan="2" className="divCont">
                                <h4>Key Partners</h4>
                                {data["Key Partners"].map((item, index) => (
                                    <p
                                        className={`
                ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md p-2 text-white"
                                                : " bg-[#f9ece0] shadow-md p-2 text-black"
                                            }
                text-xs cards
                
                `}
                                        key={index}
                                    >
                                        {item}
                                    </p>
                                ))}
                            </td>
                            <td colspan="2" className="divCont">
                                <h4>Key Activities</h4>
                                {data["Key Activities"].map((item, index) => (
                                    <p
                                        className={`
                ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md p-2 text-white"
                                                : " bg-[#f9ece0] shadow-md p-2 text-black"
                                            }
                text-xs cards
                
                `}
                                        key={index}
                                    >
                                        {item}
                                    </p>
                                ))}
                            </td>
                            <td colspan="2" rowspan="2" className="divCont">
                                <h4>Value Proposition</h4>
                                {data["Value Propositions"].map((item, index) => (
                                    <p
                                        className={`
                ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md p-2 text-white"
                                                : " bg-[#f9ece0] shadow-md p-2 text-black"
                                            }
                text-xs cards
                
                `}
                                        key={index}
                                    >
                                        {item}
                                    </p>
                                ))}
                            </td>
                            <td colspan="2" className="divCont">
                                <h4>Customer Relationship</h4>
                                {data["Customer Relationships"].map((item, index) => (
                                    <p
                                        className={`
                 ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md p-2 text-white"
                                                : " bg-[#f9ece0] shadow-md p-2 text-black"
                                            }
                 text-xs cards
                 
                 `}
                                        key={index}
                                    >
                                        {item}
                                    </p>
                                ))}
                            </td>
                            <td colspan="2" rowspan="2" className="divCont">
                                <h4>Customer Segments</h4>
                                {data["Customer Segments"].map((item, index) => (
                                    <p
                                        className={`
                 ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md p-2 text-white"
                                                : " bg-[#f9ece0] shadow-md p-2 text-black"
                                            }
                 text-xs cards
                 
                 `}
                                        key={index}
                                    >
                                        {item}
                                    </p>
                                ))}
                            </td>
                        </tr>

                        <tr>
                            <td colspan="2" className="divCont">
                                <h4>Key Resources</h4>
                                {data["Key Resources"].map((item, index) => (
                                    <p
                                        className={`
                 ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md p-2 text-white"
                                                : " bg-[#f9ece0] shadow-md p-2 text-black"
                                            }
                 text-xs cards
                 
                 `}
                                        key={index}
                                    >
                                        {item}
                                    </p>
                                ))}
                            </td>
                            <td colspan="2" className="divCont">
                                <h4>Channels</h4>
                                {data["Channels"].map((item, index) => (
                                    <p
                                        className={`
                 ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md p-2 text-white"
                                                : " bg-[#f9ece0] shadow-md p-2 text-black"
                                            }
                 text-xs cards
                 
                 `}
                                        key={index}
                                    >
                                        {item}
                                    </p>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="5" className="divCont">
                                <h4>Cost Structure</h4>
                                {data["Cost Structure"].map((item, index) => (
                                    <p
                                        className={`
                ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md p-2 text-white"
                                                : " bg-[#f9ece0] shadow-md p-2 text-black"
                                            }
                text-xs cards
                
                `}
                                        key={index}
                                    >
                                        {item}
                                    </p>
                                ))}
                            </td>
                            <td colspan="5" className="divCont">
                                <h4>Revenue Streams</h4>
                                {data["Revenue Streams"].map((item, index) => (
                                    <p
                                        className={`
                  ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md p-2 text-white"
                                                : " bg-[#f9ece0] shadow-md p-2 text-black"
                                            }
                  text-xs cards
                  
                  `}
                                        key={index}
                                    >
                                        {item}
                                    </p>
                                ))}
                            </td>
                        </tr>
                    </table>
                    <div className="flex flex-col items-start mt-5 p-2">
                        <h1 className='text-lg font-medium'>Summary :</h1>
                        <p className="text-md my-1 text-left leading-8 ">{data["BMC_summary"]}</p>
                    </div>
                </div>
            );
        }

        if (tab === 8) {
            return (
                <div className="flex flex-col items-start justify-start space-y-4 ">
                    {/* <h1 className="text-lg">{data[0]?.key}</h1> */}
                    <p className="text-sm text-center font-semibold text-red-500">
                        Disclaimer: Research Tab is in private beta, it may not give accurate results all the
                        time and is prone to hallucinations. We are working on it
                    </p>
                    <div className="flex flex-col items-start justify-start space-y-2 ">
                        <p className="text-gray-700 text-lg">
                            Research and Knowledge Bank provides the best resources that we could curate for you.
                            {/* <br /> */}&nbsp; They include data banks, competitior showcasing or just more
                            information that we believe should be useful for you as a founder.
                        </p>
                    </div>
                    {data?.competitors && (
                        <div className="flex flex-col items-start justify-start space-y-2 ">
                            {/* <h2 className="text-xl font-semibold text-gray-800">Competitors : </h2> */}
                            <table className="table-auto ">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border border-gray-500">
                                            Sr. No
                                        </th>
                                        <th className="px-4 py-2 border border-gray-500">
                                            Website
                                        </th>
                                        {process.env.NEXT_PUBLIC_NODE_ENV === "test" && (
                                            <th className="px-4 py-2 border border-gray-500">
                                                Type
                                            </th>
                                        )}

                                        <th className="px-4 py-2 border border-gray-500">
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                {data &&
                                    data.competitors.map((item, index) => (
                                        <tbody key={index}>
                                            <tr>
                                                <td className=" px-4 py-2 border border-gray-500">{index + 1}</td>
                                                <td className=" px-4 py-2 border border-gray-500 w-[200px]">
                                                    <a
                                                        href={item?.url?.includes("http") ? item?.url : `https://${item?.url}`}
                                                        target="_blank"
                                                        className="text-orange-500 font-medium outline-none border-none"
                                                        style={{ width: "200px", whiteSpace: "nowrap" }}
                                                    >
                                                        {/* {item?.url}
                               */}

                                                        {item?.domain || getTitleFromUrl(item?.url)}

                                                        {/* {item?.url?.includes("http") ? item?.url : `https://${item?.url}`} */}
                                                    </a>
                                                </td>
                                                {process.env.NEXT_PUBLIC_NODE_ENV === "test" && (
                                                    <td className=" px-4 py-2 border border-gray-500">{item?.type}</td>
                                                )}
                                                <td className=" px-4 py-2 border border-gray-500">
                                                    <Markdown className="prose w-full text-lg text-black">{item?.description}</Markdown>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                            </table>
                        </div>
                    )}
                    {/* {data[0].value?.keywords && (
              <div className="flex flex-col items-start justify-start space-y-2 ">
                <h2 className="text-xl font-semibold text-gray-800">SEO Keywords : </h2>
                <p className="text-orange-600 text-lg">{data[0].value?.keywords}</p>
              </div>
            )} */}
                </div>
            );
        }

        if (tab >= 5 && tab <= 7) {
            // console.log(data, "data in prod ");
            return (
                <div className="flex flex-col items-start justify-start space-y-4 ">
                    <p>
                        {/* {data?.length > 0 &&
                data[0]?.value.split("\n").map((c, index) => {
                  return <p key={index}> {c} </p>;
                })} */}
                        {data && (
                            // <ReactMarkdown remarkPlugins={[breaks]} components={renderers} >
                            //   {data[0].value}
                            // </ReactMarkdown>
                            <Markdown className="prose w-full text-lg">{data}</Markdown>
                        )}
                    </p>
                    {/* <p className="text-sm font-medium">
              * If you would like to detail out each of these sub tasks , please use the &nbsp;
              <a
                href="https://minigator.vercel.app/"
                className="text-orange-500 outline-none border-none"
              >
                Favcy Minigator
              </a>
            </p> */}
                </div>
            );
        }

        if (tab === 4) {
            // console.log(data, "data i n prod ");
            return (
                <div className="flex flex-col items-start justify-start space-y-4 ">
                    {data && (
                        <h1 className="text-2xl font-semibold text-gray-800">Positioning Statement field</h1>
                    )}
                    {data && data["Positioning"] && (
                        <div className="flex flex-col items-start justify-start space-y-2 ">
                            <p className='font-medium text-lg'>
                                {/* <span className="font-semibold">: </span> */}
                                {data["Positioning"]}
                            </p>
                        </div>
                    )}
                    {data && data["USPs"] && (
                        <div className="flex flex-col items-start justify-start space-y-2 ">
                            <h1 className="text-2xl font-semibold text-gray-800">Favcy USPs framework</h1>
                            {data["USPs"]?.map((item, index) => (
                                <p key={index} className='font-medium text-lg'>
                                    <span className="text-red-500">{index + 1}&#41;</span> &nbsp;
                                    {item}
                                </p>
                            ))}
                        </div>
                    )}
                    {data && (
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Favcy Venture builder framework
                        </h1>
                    )}
                    <table className="table-auto ">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b-2 font-medium text-brand">
                                    Sr. No
                                </th>
                                <th className="px-4 py-2 border-b-2 border-l-2  font-medium text-brand">
                                    Feature
                                </th>
                                <th className="px-4 py-2 border-b-2 border-l-2  font-medium text-brand">
                                    Value Proposition
                                </th>
                                <th className="px-4 py-2 border-b-2 border-l-2  font-medium text-brand">
                                    Benefit
                                </th>
                            </tr>
                        </thead>
                        {data &&
                            data["Favcy_Venture_builder_framework"].map((item, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td className=" px-4 py-2 border-b-2 font-medium">{index + 1}</td>
                                        <td className=" px-4 py-2 border-b-2 border-l-2 font-medium">{item.Feature}</td>
                                        <td className=" px-4 py-2 border-b-2 border-l-2 font-medium">{item.Value_Proposition}</td>
                                        <td className=" px-4 py-2 border-b-2 border-l-2 font-medium">{item.Benefit}</td>
                                    </tr>
                                </tbody>
                            ))}
                    </table>
                </div>
            );
        }

        if (tab === 3) {
            return (
                <div className="flex flex-col items-start justify-start space-y-4 ">
                    {/* {data[0].value} */}

                    <table className="table-fixed ">
                        {data &&
                            Object.entries(data).map((item, index) => (
                                // <div key={index} className="flex justify-start items-start space-x-2 ">
                                //   {/* <p className="font-semibold">{item[0]}</p>:<p>{item[1]}</p> */}
                                // </div>
                                <tbody key={index}>
                                    <tr>
                                        <td className="px-4 py-2 text-brand border-b-2 font-medium w-[200px]" style={{ verticalAlign: 'top' }}>{item[0]}</td>
                                        <td className=" px-4 py-2 border-b-2 border-l-2 font-medium">{item[1]}</td>
                                    </tr>
                                </tbody>
                            ))}
                    </table>
                </div>
            );
        } else if (tab === 2) {
            return (
                <div className="flex flex-col items-start justify-start space-y-4 ">
                    {data && (
                        <p>
                            <span className="font-semibold">{data["Executive Summary"]}</span>:
                        </p>
                    )}
                    <table className="table-auto ">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-brand whitespace-nowrap">
                                    Problems
                                </th>
                                <th className="px-4 py-2 text-brand whitespace-nowrap">
                                    Solutions
                                </th>
                            </tr>
                        </thead>
                        {data["ps_list"]?.map((item, index) => (
                            <tbody key={index}>
                                <tr>

                                    <td className=" px-4 py-2 border-b-2 font-medium">

                                        {/* {index + 1}) &nbsp; */}
                                        {item?.Problem}</td>
                                    <td className=" px-4 py-2 text-brand border-b-2 border-l-2 font-medium">{item?.Solution}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            );
        } else if (tab === 1)
            return (
                <div className="flex flex-col items-start justify-start space-y-4 ">
                    <table className="table-auto ">
                        {/* <thead>
                            <tr>
                                <th className="px-4 py-2 border border-gray-500">
                                    Title 
                                </th>
                                <th className="px-4 py-2 border border-gray-500">
                                    Description 
                                </th>
                            </tr>
                        </thead> */}
                        {data?.map((item, index) => {
                            return (
                                // <div
                                //   key={index}
                                //   className="flex justify-start items-start space-x-2 "
                                // >
                                //   <p className="font-semibold">{item.key}</p>:<p>{item.value}</p>
                                // </div>

                                <tbody key={index}>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold text-brand whitespace-nowrap" style={{ verticalAlign: 'top' }}>
                                            {item.key}
                                        </td>
                                        <td className="px-4 py-2" style={{ verticalAlign: 'top' }}>
                                            {item.value}
                                        </td>
                                    </tr>
                                </tbody>

                            );
                        })}
                    </table>


                    {
                        !pathname.includes("/share") && <p
                            className="text-center text-md w-full text-red-600 cursor-pointer"
                            onClick={handleReselection}
                        >
                            Continue with a different option ?
                        </p>
                    }


                </div>
            );
    }
    else if (journey === 3) {
        return (
            <div className="flex flex-col items-start justify-start space-y-4 ">

                <table className="table-auto ">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-brand whitespace-nowrap">
                                Objectives
                            </th>
                            <th className="px-4 py-2 text-brand whitespace-nowrap flex justify-between items-center ">
                                <p className='ml-10'>Tasks</p>


                                <p>Priority</p>
                            </th>
                            <th className="px-4 py-2 text-brand whitespace-nowrap">
                                Outcomes
                            </th>
                        </tr>
                    </thead>
                    {data?.map((item, index) => (
                        <tbody key={index}>
                            <tr>

                                <td className=" px-4 py-2 border-b-2 font-semibold text-brand" style={{ verticalAlign: 'top' }}>
                                    {index + 1}. {item?.Objective}</td>
                                <td className="px-4 py-2 max-w-xl border-b-2 border-l-2 font-medium" style={{ verticalAlign: 'top' }}>
                                    <ul className='list-none px-4'>
                                        {item?.Tasks.map((task, index) => {
                                            const priority = item["Priorities"] && item["Priorities"][index];
                                            return (
                                                <li className='my-3' key={index}>

                                                    <div className='flex items-start justify-start gap-2'>
                                                        <div>
                                                            <input type="checkbox" id={`task-${index}`} name={`task-${index}`} className='accent-brand text-white w-3 h-3' defaultChecked />
                                                            <label htmlFor={`task-${index}`} className="ml-2">{task}</label>
                                                        </div>
                                                        {
                                                            priority &&
                                                            <span className='text-brand text-xl font-bold '>
                                                                [{priority}]
                                                            </span>
                                                        }
                                                    </div>
                                                </li>
                                            );
                                        })}

                                    </ul>
                                </td>


                                <td className=" px-4 py-2 border-b-2 border-l-2 font-medium" style={{ verticalAlign: 'top' }}>
                                    <ul className='list-decimal  px-4'>
                                        {item["Desired Outcomes"].map((task) => {
                                            return <li className='my-3'>
                                                {task}
                                            </li>


                                        })}
                                    </ul>

                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        )
    }



    return (
        // <div className="flex flex-col  w-full items-start justify-start space-y-4 ">

        <Markdown className="prose w-full text-lg text-black">{data}</Markdown>

        // </div>
    );
};


export default ViewComponent