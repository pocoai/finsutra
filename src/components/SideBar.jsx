"use client"
import { useClerk } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import classNames from 'classnames'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, RectangleGroupIcon, RectangleStackIcon, } from "@heroicons/react/24/outline";
import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Skeleton from "react-loading-skeleton";




const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


const SideCard = ({ image, name, selected, id, collapsed, link }) => {
    return (

        <Link href={link} prefetch={false} className={classNames({
            "flex items-center gap-3 text-lg w-full rounded-xl cursor-pointer ": true,
            "bg-[#F1F2F4]": selected === id,
            "justify-start  px-4 py-2": !collapsed,
            "justify-center p-3": collapsed,
            "min-w-0 ": true, // Ensure a minimum width of 0
        })}>
            {/* <div > */}
            <Image
                src={image}
                height={20}
                width={20}
                alt="logo"

                className=""
            />
            <span className={classNames({
                " text-[16px] transition-all overflow-hidden whitespace-no-wrap": true,
                "hidden": collapsed,
                "font-medium": selected === id

            })}>
                {capitalize(name)}
            </span>

            {/* </div> */}
        </Link>


    )
}

const ProfileButtons = ({ collapsed, onClick, image, name, link }) => {
    if (link) {
        return (


            <Link href={link} target="_blank" prefetch={false} className={classNames({
                "flex items-center gap-3 text-lg w-full rounded-xl cursor-pointer ": true,
                "justify-start  px-4 py-2 ": !collapsed,
                "justify-center p-3": collapsed,
                "min-w-0": true, // Ensure a minimum width of 0
            })}

            >
                <Image
                    src={image}
                    height={20}
                    width={20}
                    alt="logo"

                    className="text-primary"
                />
                <span className={classNames({
                    " text-[16px] transition-all overflow-hidden w-full whitespace-no-wrap": true,
                    "hidden": collapsed,

                })}>
                    {capitalize(name)}
                </span>


            </Link>)
    }

    return (<div className={classNames({
        "flex items-center gap-3 text-lg w-full rounded-xl cursor-pointer ": true,
        "justify-start  px-4 py-2 ": !collapsed,
        "justify-center p-3": collapsed,
        "min-w-0": true, // Ensure a minimum width of 0
    })}
        onClick={onClick}
    >
        <Image
            src={image}
            height={20}
            width={20}
            alt="logo"

            className="text-primary"
        />
        <span className={classNames({
            " text-[16px] transition-all overflow-hidden w-full whitespace-no-wrap": true,
            "hidden": collapsed,

        })}>
            {capitalize(name)}
        </span>

    </div>)
}


const sidecards = [
    {
        id: 1,
        name: "Projects",
        image: "/images/project.svg",
        link: "/"
    }, {
        id: 2,
        name: "Credits",
        image: "/images/coins.svg",
        link: "/pricing"
    }, {
        id: 3,
        name: "Minigator",
        image: "/images/minigator.svg",
        link: "https://minigator.vercel.app/"
    }
]


const profilebuttons = [
    {
        image: "/images/profile.svg",
        name: "My Profile",
        link: "/profile",

    },
    {
        image: "/images/release.svg",
        name: "Release Notes",
        link: "https://favcynavigator.canny.io/changelog/"

    },
    {
        image: "/images/roadmap.svg",
        name: "Product Roadmap",
        link: "https://favcynavigator.canny.io/",

    },
    // {
    //     image: "/images/about.svg",
    //     name: "About Us",

    // },
    {
        image: "/images/logout.svg",
        name: "Logout",
        link: false
    }
]



const SideBar = ({ collapsed, setCollapsed, isLoaded, user }) => {
    const [selected, setSelected] = useState(1);
    const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
    const { signOut } = useClerk();

    const { user: ClerkUser } = useUser()

    // console.log("user", user)

    const route = usePathname();

    useEffect(() => {
        // console.log("route", route)
        if (route === "/" || route.includes("/project")) {
            setSelected(1)
        }
        else if (route.includes("/pricing")) {
            setSelected(2)
        }

    }, [route])

    return (
        (<div
            className={classNames({
                " text-primary relative border-r border-[#F1F2F4] w-[248px] flex flex-col items-end h-screen overflow-y-hidden max-h-screen": true,
                "transition-all  duration-700 ease-in-out": true,
                "translate-x-0 ": !collapsed,
                "-translate-x-[70%]": collapsed,


                // "-translate-x-full": !shown,
            })}
        >
            <div className={classNames({
                "flex  flex-col items-center relative": true,
                "w-[73px]": collapsed,
                "w-full": !collapsed


            })}>
                <div
                    className={classNames({
                        "flex flex-col justify-center h-screen sticky w-full": true,




                    })}
                >
                    {/* logo and collapse button */}
                    <div
                        className={classNames({
                            "flex items-center transition-none": true,
                            "p-4 justify-between flex-row": !collapsed,
                            "py-4 justify-center flex-col": collapsed,
                        })}
                    >
                        <Link href={"/"}>
                            {!collapsed ?
                                <div className="relative">
                                    <Image
                                        src="/images/logo.png"
                                        height={30}
                                        width={107}
                                        alt="logo"
                                        style={{ objectFit: 'contain' }}
                                        className=""
                                    />
                                    <span className="absolute right-0 -bottom-5">
                                        <sub className="text-xs font-bold">
                                            v 1.0
                                        </sub>
                                    </span>
                                </div>

                                : (
                                    <Image
                                        src="/images/pointer.png"
                                        height={31}
                                        width={22}
                                        alt="logo"
                                        style={{ objectFit: 'contain' }}
                                        className=""
                                    />
                                )
                            }
                        </Link>

                        <button
                            className="p-1 my-2 outline-none"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            <Icon className="w-5 h-5" />
                        </button>
                    </div>


                    <div className={classNames({
                        "flex flex-col justify-between gap-2 h-screen sticky inset-0": true,
                        "p-4 items-start": !collapsed,
                        "items-center px-2": collapsed,
                        "overflow-hidden": true
                    })}>
                        {
                            isLoaded ? (
                                <Link href={"/profile"}>
                                    <div className={classNames({
                                        "flex items-center gap-2": true


                                    })}>
                                        <Image
                                            src={user?.image || ClerkUser?.imageUrl || "/images/user.png"}
                                            height={40}
                                            width={40}
                                            alt="logo"
                                            style={{ objectFit: 'contain' }}
                                            className="rounded-full"
                                        />
                                        <div className={classNames({
                                            "font-medium transition-all overflow-hidden": true,
                                            "hidden": collapsed
                                        })}>
                                            <p className='text-[#373D41] text-[16px]'>
                                                {user?.firstName}
                                            </p>
                                            <span className='text-[#ADB0B6] text-[14px]'>
                                                {user?.interests?.work}
                                            </span>
                                        </div>


                                    </div>
                                </Link>
                            ) : (
                                <Skeleton width={40} height={40} circle={true} baseColor="#ADB0B6" highlightColor="#F1F2F4" />
                            )
                        }


                        <div className='w-full flex flex-col items-center justify-center gap-3 '>
                            {sidecards.map((card, index) => (
                                <SideCard key={index} {...card} selected={selected} collapsed={collapsed} />
                            ))}


                        </div>


                        <div className='w-full flex flex-col items-center justify-center gap-3 '>
                            {profilebuttons.map((card, index) => (
                                <ProfileButtons key={index} {...card} collapsed={collapsed} onClick={
                                    () => signOut()
                                } />
                            ))}


                        </div>


                    </div>




                </div>
            </div>
        </div>)


    )
}

export default SideBar