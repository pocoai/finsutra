"use client";
import "animate.css";
import { useRecoilValue } from "recoil";
import Typewriter from "typewriter-effect";

import React, { useState } from "react";

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

function trimString(str) {
    if (str.length > 20) {
        return str.substring(0, 20) + "...";
    }
    return str;
}

const MinigatorHeader = ({ name, title }) => {

    return (
        <header className="flex flex-row px-6 justify-between items-center w-full">
            <div className="text-[20px] font-[700] w-full flex items-center justify-start ">
                {true ? (
                    <p className="whitespace-nowrap animate__animated animate__fadeInLeft">
                        Minigator &nbsp;{" "}
                        {/* {`${capitalize(user.firstName)}\'s`} */}
                    </p>
                ) : (
                    <p
                        className="w-32 bg-gray-100 h-5 rounded-sm relative 
                                before:absolute before:inset-0
                                before:-translate-x-full
                                before:animate-[shimmer_1s_infinite]
                                before:bg-gradient-to-r
                                before:from-transparent before:via-gray-100/10 before:to-transparent  isolate
                                overflow-hiddenmr-1"
                    >
                    </p>
                )}

                <div className="max-w-2xl">
                    {
                        name && (
                            <Typewriter
                                options={{
                                    cursor: "_",
                                }}
                                onInit={(typewriter) => {
                                    typewriter
                                        .changeDelay(70)
                                        .typeString(`${trimString(name)}`)
                                        .start()
                                        .callFunction((state) => {
                                            state.elements.cursor.remove();
                                        });
                                }}
                            />
                        )
                    }
                </div>
            </div>
        </header>
    );
};

export default MinigatorHeader;
