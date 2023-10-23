"use client";

import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Urbanist } from "next/font/google";
import classNames from "classnames";
import Lottie from "lottie-react";
import animationData from "../../public/lottie/offline.json";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const OfflineModal = ({ isOpen, setIsOpen, isOnline }) => {
  function closeModal() {
    setIsOpen(false);
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
              <Dialog.Panel className="w-full max-w-xl transform overflow-y-scroll scrollbar-thin  rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all h-[300px]">
                <div
                  className={classNames({
                    "flex flex-col gap-5 items-center justify-start": true,
                    [`${urbanist.className}`]: true,
                  })}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-2xl text-center w-full font-medium leading-6 text-brand  "
                  >
                    Oops! You are offline
                  </Dialog.Title>
                  {typeof window !== "undefined" && (
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      style={{
                        width: "200px",
                        height: "200px",
                      }}
                    />
                  )}
                  ;
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OfflineModal;
