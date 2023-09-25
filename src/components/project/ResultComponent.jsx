import { journeyState } from "@/state/atoms/tabState";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

const CardComponent = ({ data, id, closeModal }) => {

    const { getToken } = useAuth()
    const setJourneyData = useSetRecoilState(journeyState)

    const router = useRouter()


    console.log(data, "data")

    const api = process.env.NEXT_PUBLIC_URL;
    const handleClick = async () => {


        let token = await getToken()
        try {

            let res = await axios.post(`${api}/api/project/${id}?journey=1&tab=1`, {
                data
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })


            console.log(res, "res")

            if (res.data.success) {
                let state = {
                    ...res.data.data,
                    selected: true
                }

                setJourneyData(prevState => {
                    return prevState.map((item, index) => {
                        if (index + 1 === 1) {
                            return {
                                ...item,
                                ...state, // Update the specific tab with new data
                            };
                        }
                        else if (index + 1 === 2) {
                            return {
                                ...item,
                                locked: false,
                            };
                        }
                        else {
                            return item;
                        }
                    });

                });
                closeModal()
                router.refresh()
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="flex flex-col items-center justify-center space-y-4 w-full h-[500px] ">
            {data.map((item, index) => {
                return (
                    <>
                        <div key={index} className="flex justify-start items-start space-x-2 ">
                            <div className=" font-bold w-[190px] text-brand lg:pl-7">{item.key}</div>
                            {":"}
                            <div className="w-[700px]">{item.value}</div>

                        </div>
                    </>
                );
            })}
            <div className="w-full flex justify-center mb-4">
                <button
                    style={{ zIndex: 50 }}
                    className="lg:my-2 bg-brand rounded-md p-4 w-[200px] hover:bg-brand cursor-pointer 
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 text-white"
                    onClick={async () => await handleClick()}
                // disabled={currentProject?.idea_articulation?.data[1]?.value === data[1].value}
                >
                    Choose Option
                </button>
            </div>
        </div>
    );
};


export default CardComponent