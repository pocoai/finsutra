
const ViewComponent = ({
    data,
    tab,
    journey,
    closeModal,
}) => {


    if (journey === 1) {
        if (tab === 9) {
            return (
                <div>
                    <table id="bizcanvas" cellspacing="0" border="1">
                        <tr className="">
                            <td colSpan="2" rowSpan="2" className="divCont">
                                <h4>Key Partners</h4>
                                {data[0].value["Key Partners"].map((item, index) => (
                                    <p
                                        className={`
                ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md text-white"
                                                : " bg-[#f9ece0] shadow-md text-black"
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
                                {data[0].value["Key Activities"].map((item, index) => (
                                    <p
                                        className={`
                ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md text-white"
                                                : " bg-[#f9ece0] shadow-md text-black"
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
                                {data[0].value["Value Propositions"].map((item, index) => (
                                    <p
                                        className={`
                ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md text-white"
                                                : " bg-[#f9ece0] shadow-md text-black"
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
                                {data[0].value["Customer Relationships"].map((item, index) => (
                                    <p
                                        className={`
                 ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md text-white"
                                                : " bg-[#f9ece0] shadow-md text-black"
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
                                {data[0].value["Customer Segments"].map((item, index) => (
                                    <p
                                        className={`
                 ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md text-white"
                                                : " bg-[#f9ece0] shadow-md text-black"
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
                                {data[0].value["Key Resources"].map((item, index) => (
                                    <p
                                        className={`
                 ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md text-white"
                                                : " bg-[#f9ece0] shadow-md text-black"
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
                                {data[0].value["Channels"].map((item, index) => (
                                    <p
                                        className={`
                 ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md text-white"
                                                : " bg-[#f9ece0] shadow-md text-black"
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
                                {data[0].value["Cost Structure"].map((item, index) => (
                                    <p
                                        className={`
                ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md text-white"
                                                : " bg-[#f9ece0] shadow-md text-black"
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
                                {data[0].value["Revenue Streams"].map((item, index) => (
                                    <p
                                        className={`
                  ${index % 2 === 0
                                                ? "bg-[#f69e53] shadow-md text-white"
                                                : " bg-[#f9ece0] shadow-md text-black"
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
                        <h1>Summary :</h1>
                        <p className="text-md my-1 text-left leading-5 ">{data[0].value["BMC_summary"]}</p>
                    </div>
                </div>
            );
        }

        if (tab === 8) {
            return (
                <div className="flex flex-col items-start justify-start space-y-4 ">
                    {/* <h1 className="text-lg">{data[0]?.key}</h1> */}
                    <p className="text-sm text-center text-red-500">
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
                    {data[0].value?.competitors && (
                        <div className="flex flex-col items-start justify-start space-y-2 ">
                            {/* <h2 className="text-xl font-semibold text-gray-800">Competitors : </h2> */}
                            <table className="table-auto ">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border border-gray-500">
                                            Sr. No <span className="text-red-500">*</span>
                                        </th>
                                        <th className="px-4 py-2 border border-gray-500">
                                            Website <span className="text-red-500">*</span>
                                        </th>
                                        {process.env.NEXT_PUBLIC_ENV === "test" && (
                                            <th className="px-4 py-2 border border-gray-500">
                                                Type <span className="text-red-500">*</span>
                                            </th>
                                        )}

                                        <th className="px-4 py-2 border border-gray-500">
                                            Description <span className="text-red-500">*</span>
                                        </th>
                                    </tr>
                                </thead>
                                {data &&
                                    data[0]?.value?.competitors.map((item, index) => (
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
                                                {process.env.NEXT_PUBLIC_ENV === "test" && (
                                                    <td className=" px-4 py-2 border border-gray-500">{item?.type}</td>
                                                )}
                                                <td className=" px-4 py-2 border border-gray-500">
                                                    <Markdown className="prose text-black">{item?.description}</Markdown>
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
                        {data?.length > 0 && (
                            // <ReactMarkdown remarkPlugins={[breaks]} components={renderers} >
                            //   {data[0].value}
                            // </ReactMarkdown>
                            <Markdown className="prose text-black">{data[0].value}</Markdown>
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
                    {data && data[0]?.value["Positioning"] && (
                        <div className="flex flex-col items-start justify-start space-y-2 ">
                            <p>
                                <span className="font-semibold">Positioning: </span>
                                {data[0].value["Positioning"]}
                            </p>
                        </div>
                    )}
                    {data && data[0]?.value["USPs"] && (
                        <div className="flex flex-col items-start justify-start space-y-2 ">
                            <h1 className="text-2xl font-semibold text-gray-800">USPs</h1>
                            {data[0]?.value["USPs"]?.map((item, index) => (
                                <p key={index}>
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
                                <th className="px-4 py-2 border border-gray-500">
                                    Sr. No <span className="text-red-500">*</span>
                                </th>
                                <th className="px-4 py-2 border border-gray-500">
                                    Feature <span className="text-red-500">*</span>
                                </th>
                                <th className="px-4 py-2 border border-gray-500">
                                    Value Proposition <span className="text-red-500">*</span>
                                </th>
                                <th className="px-4 py-2 border border-gray-500">
                                    Benefit <span className="text-red-500">*</span>
                                </th>
                            </tr>
                        </thead>
                        {data &&
                            data[0]?.value["Favcy_Venture_builder_framework"].map((item, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td className=" px-4 py-2 border border-gray-500">{index + 1}</td>
                                        <td className=" px-4 py-2 border border-gray-500">{item.Feature}</td>
                                        <td className=" px-4 py-2 border border-gray-500">{item.Value_Proposition}</td>
                                        <td className=" px-4 py-2 border border-gray-500">{item.Benefit}</td>
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
                            data[0]?.value &&
                            Object.entries(data[0]?.value).map((item, index) => (
                                // <div key={index} className="flex justify-start items-start space-x-2 ">
                                //   {/* <p className="font-semibold">{item[0]}</p>:<p>{item[1]}</p> */}
                                // </div>
                                <tbody key={index}>
                                    <tr>
                                        <td className=" px-4 py-2 border border-gray-500 w-[200px]">{item[0]}</td>
                                        <td className=" px-4 py-2 border border-gray-500">{item[1]}</td>
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
                            <span className="font-semibold">Problem Solution Fit: {data["Executive Summary"]}</span>:
                        </p>
                    )}
                    <table className="table-auto ">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border border-gray-500">
                                    Problem <span className="text-red-500">*</span>
                                </th>
                                <th className="px-4 py-2 border border-gray-500">
                                    Solution <span className="text-red-500">*</span>
                                </th>
                            </tr>
                        </thead>
                        {data["ps_list"].map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td className=" px-4 py-2 border border-gray-500">{item?.Problem}</td>
                                    <td className=" px-4 py-2 border border-gray-500">{item?.Solution}</td>
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
                                    Title <span className="text-red-500">*</span>
                                </th>
                                <th className="px-4 py-2 border border-gray-500">
                                    Description <span className="text-red-500">*</span>
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
                    {/* {currentProject?.queryResults?.content?.length > 0 && (
              <p
                className="text-center text-md w-full text-red-600 cursor-pointer"
                onClick={async () => {
                  await handleReselection();
                  closeModal();
                }}
              >
                Continue with a different option ?
              </p>
            )} */}
                </div>
            );
    } else if (journey === "2") {
        if (tab === 3) {
            return (
                <>
                    {data && (
                        <div>
                            <table className="table-auto ">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border border-gray-500">
                                            Pillars <span className="text-red-500">*</span>
                                        </th>
                                        <th className="px-4 py-2 border border-gray-500">
                                            Inbound <span className="text-red-500">*</span>
                                        </th>
                                        <th className="px-4 py-2 border border-gray-500">
                                            Outbound <span className="text-red-500">*</span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data[0].value?.reach_pillar && (
                                        <tr>
                                            <td className=" px-4 py-2 border border-gray-500">Reach</td>
                                            <td className=" px-4 py-2 border border-gray-500">
                                                {data[0].value?.reach_pillar?.inbound}
                                            </td>
                                            <td className=" px-4 py-2 border border-gray-500">
                                                {data[0].value?.reach_pillar?.outbound}
                                            </td>
                                        </tr>
                                    )}
                                    {data[0].value?.nurture_pillar && (
                                        <tr>
                                            <td className=" px-4 py-2 border border-gray-500">Nurture</td>
                                            <td className=" px-4 py-2 border border-gray-500">
                                                {data[0].value?.nurture_pillar?.inbound}
                                            </td>
                                            <td className=" px-4 py-2 border border-gray-500">
                                                {data[0].value?.nurture_pillar?.outbound}
                                            </td>
                                        </tr>
                                    )}
                                    {data[0].value?.commitment_pillar && (
                                        <tr>
                                            <td className=" px-4 py-2 border border-gray-500">Commitment</td>
                                            <td className=" px-4 py-2 border border-gray-500">
                                                {data[0].value?.commitment_pillar?.inbound}
                                            </td>
                                            <td className=" px-4 py-2 border border-gray-500">
                                                {data[0].value?.commitment_pillar?.outbound}
                                            </td>
                                        </tr>
                                    )}
                                    {data[0].value?.customer_success_pillar && (
                                        <tr>
                                            <td className=" px-4 py-2 border border-gray-500">Customer Success</td>
                                            <td className=" px-4 py-2 border border-gray-500">
                                                {data[0].value?.customer_success_pillar?.inbound}
                                            </td>
                                            <td className=" px-4 py-2 border border-gray-500">
                                                {data[0].value?.customer_success_pillar?.outbound}
                                            </td>
                                        </tr>
                                    )}

                                    {data[0].value?.product_pillar && (
                                        <tr>
                                            <td className=" px-4 py-2 border border-gray-500">Product</td>
                                            <td className=" px-4 py-2 border border-gray-500">
                                                {data[0].value?.product_pillar?.inbound}
                                            </td>
                                            <td className=" px-4 py-2 border border-gray-500">
                                                {data[0].value?.product_pillar?.outbound}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            );
        }
    } else if (journey === "3") {
        if (tab === 1) {
            return (
                <>
                    {typeof data[0].value === "object" ? (
                        <div>
                            <table className="table-auto ">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border border-gray-500">
                                            Title <span className="text-red-500">*</span>
                                        </th>
                                        <th className="px-4 py-2 border border-gray-500">
                                            Description <span className="text-red-500">*</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className=" px-4 py-2 border border-gray-500">Introduction</td>
                                        <td className=" px-4 py-2 border border-gray-500">{data[0].value["intro"]}</td>
                                    </tr>
                                    <tr>
                                        <td className=" px-4 py-2 border border-gray-500">Direct Sales</td>
                                        <td className=" px-4 py-2 border border-gray-500">
                                            {data[0].value["Direct Sales"]}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className=" px-4 py-2 border border-gray-500">Referral Program</td>
                                        <td className=" px-4 py-2 border border-gray-500">
                                            {data[0].value["Referral Program"]}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className=" px-4 py-2 border border-gray-500">Strategic Partnerships</td>
                                        <td className=" px-4 py-2 border border-gray-500">
                                            {data[0].value["Strategic Partnerships"]}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className=" px-4 py-2 border border-gray-500">Digital Marketing</td>
                                        <td className=" px-4 py-2 border border-gray-500">
                                            {data[0].value["Digital Marketing"]}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className=" px-4 py-2 border border-gray-500">Customer Support</td>
                                        <td className=" px-4 py-2 border border-gray-500">
                                            {data[0].value["Customer Support"]}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className=" px-4 py-2 border border-gray-500">B2B Marketplaces</td>
                                        <td className=" px-4 py-2 border border-gray-500">
                                            {data[0].value["B2B Marketplaces"]}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className=" px-4 py-2 border border-gray-500">Affiliate Marketing</td>
                                        <td className=" px-4 py-2 border border-gray-500">
                                            {data[0].value["Affiliate Marketing"]}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className=" px-4 py-2 border border-gray-500">Closing thoughts</td>
                                        <td className=" px-4 py-2 border border-gray-500">
                                            {data[0].value["Closing thoughts"]}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-start justify-start space-y-4 ">
                            <p>
                                {/* {data?.length > 0 &&
                data[0]?.value.split("\n").map((c, index) => {
                  return <p key={index}> {c} </p>;
                })} */}
                                {data?.length > 0 && (
                                    // <ReactMarkdown remarkPlugins={[breaks]} components={renderers} >
                                    //   {data[0].value}
                                    // </ReactMarkdown>

                                    <Markdown className="prose text-black">{data[0].value}</Markdown>
                                )}
                            </p>

                            <p className="text-sm font-medium">
                                * If you would like to detail out each of these sub tasks , please use the &nbsp;
                                <a
                                    href="https://minigator.vercel.app/"
                                    className="text-orange-500 outline-none border-none"
                                    target="_blank"
                                >
                                    Favcy Minigator
                                </a>
                            </p>
                        </div>
                    )}
                </>
            );
        }
    }

    return (
        <div className="flex flex-col items-start justify-start space-y-4 ">
            <p>
                {/* {data?.length > 0 &&
        data[0]?.value.split("\n").map((c, index) => {
          return <p key={index}> {c} </p>;
        })} */}
                {data?.length > 0 && (
                    // <ReactMarkdown remarkPlugins={[breaks]} components={renderers} >
                    //   {data[0].value}
                    // </ReactMarkdown>

                    <Markdown className="prose text-black">{data[0].value}</Markdown>
                )}
            </p>

            <p className="text-sm font-medium">
                * If you would like to detail out each of these sub tasks , please use the &nbsp;
                <a
                    href="https://minigator.vercel.app/"
                    className="text-orange-500 outline-none border-none"
                    target="_blank"
                >
                    Favcy Minigator
                </a>
            </p>
        </div>
    );
};


export default ViewComponent