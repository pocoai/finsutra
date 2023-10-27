import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Urbanist } from "next/font/google";
import classNames from "classnames";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-toastify";
import axios from "axios";

const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const InviteModal = ({ isOpen, setIsOpen }) => {
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState("");

    const { getToken } = useAuth();

    let api = process.env.NEXT_PUBLIC_URL;


    const handleInviteUser = async () => {

        if (email === "" || !email) {
            toast.error("Please enter email", {
                position: "top-center",
            });
            return;
        }

        setLoading(true);
        const token = await getToken();
        try {
            let res = await axios.post(`${api}/api/generateInviteLink`, {
                email: email
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            // console.log(res.data, "res.data");
            if (res.data.success) {
                toast.success("Invite sent", {
                    position: "top-center",
                });
            }
        }
        catch (err) {
            console.log(err, "err");
            if (err.response.status === 409) {
                toast.error(err.response.data.message || "Something went wrong", {
                    position: "top-center",
                });
            }
        }
        setLoading(false);
        closeModal()
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform overflow-y-scroll scrollbar-thin  rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all h-fit">
                                <div
                                    className={classNames({
                                        "flex flex-col gap-5 items-center justify-start": true,
                                        [`${urbanist.className}`]: true,
                                    })}
                                >
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl text-center w-full font-medium leading-6 text-brand  "
                                    >
                                        Invite your colleagues and earn 10 credits
                                    </Dialog.Title>

                                    <div className=" flex w-full flex-col items-center justify-center gap-10">

                                        <input type="email" placeholder="Enter email" className="input focus:outline-none input-warning w-full max-w-full"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}

                                        />

                                        <button

                                            onClick={handleInviteUser}
                                            className='bg-brand w-[100px] rounded-lg px-4 py-2 text-white whitespace-nowrap text-center'>
                                            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Invite"}
                                        </button>
                                    </div>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default InviteModal;
