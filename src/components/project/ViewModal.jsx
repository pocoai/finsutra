import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import ViewComponent from './ViewComponent'
import { Urbanist } from 'next/font/google'
import classNames from 'classnames'
import { XMarkIcon } from '@heroicons/react/24/solid'


const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});




const ViewModal = ({ isOpen, setIsOpen, title, journey, tab, data }) => {

    console.log(data, "in View modal")

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
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
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                                <div className={classNames({
                                    'flex flex-col gap-5 items-start justify-start': true,
                                    [`${urbanist.className}`]: true
                                })}>

                                    <XMarkIcon className="w-7 h-7 cursor-pointer text-[#808182] float-right absolute top-1 right-2" onClick={closeModal} />

                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-medium leading-6 text-brand  "
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <ViewComponent
                                        data={data}
                                        tab={tab}
                                        journey={journey}
                                        closeModal={closeModal}

                                    />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ViewModal