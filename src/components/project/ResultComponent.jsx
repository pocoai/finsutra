import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-toastify";

const CardComponent = ({ data, isSelected, setIsSelected, id, closeModal }) => {

    const { getToken } = useAuth()

    const api = process.env.NEXT_PUBLIC_URL;
    const handleClick = async () => {

        setIsSelected(true)
        // console.log(data, "clicked")

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
                toast.success("Idea Saved")
                closeModal()
                window.location.reload()
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
                            {/* <p className="font-semibold"></p>:<p></p> */}
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