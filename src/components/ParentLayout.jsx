"use client"

import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Inter, Urbanist } from "next/font/google";
import classNames from "classnames";
import { useAuth, useUser } from '@clerk/nextjs';
import { useRecoilState } from 'recoil';
import { getUserData } from '@/services/user';
import { userState } from '@/state/atoms/userState';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const ParentLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false)
    // const [userData, setUserState] = useRecoilState(userState);
    // const { getToken, isSignedIn, isLoaded } = useAuth()
    const [pageLoading, setPageLoading] = useState(true)

    // let searchParams = useSearchParams()

    // // const pathname = usePathname()

    // const router = useRouter()


    // const getData = async () => {
    //     let token = await getToken()
    //     let code = searchParams.get("invitecode")
    //     let user = await getUserData(token, code)
    //     setUserState({
    //         ...user,
    //         isLoaded: true
    //     })

    //     if (code) {
    //         router.replace("/");
    //     }
    // }

    useEffect(() => {
        if (typeof window !== "undefined") {
            setPageLoading(false)
        }
    }, [])

    // useEffect(() => {
    //     if (isSignedIn && !pageLoading) {
    //         getData()
    //     }
    // }, [isSignedIn, pageLoading]);



    // let success = searchParams.get("success")
    // let cancelled = searchParams.get("cancelled")

    // success = Boolean(success);
    // cancelled = Boolean(cancelled);

    // useEffect(() => {
    //     if (success) {
    //         toast.success("Payment Successful");
    //         setTimeout(() => {
    //             router.push("/")

    //         }, 2000)
    //     }

    //     if (cancelled) {
    //         toast.error("Payment Failed");
    //         setTimeout(() => {
    //             router.push("/");
    //         }, 2000)
    //     }

    // }, [success, cancelled])


    // console.log(userData, "userData");

    return (
        <>
            {
                !pageLoading && <div
                    className={classNames({
                        "grid h-screen overflow-hidden": true,
                        "grid-cols-sidebar": !collapsed,
                        "grid-cols-sidebar-collapsed": collapsed,
                        "transition-[grid-template-columns] duration-300 ease-in-out": true,
                        [`${urbanist.className}`]: true,
                    })}>
                    {
                        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} isLoaded={true} user={""} />
                    }

                    <section className="max-w-7xl w-full mx-auto transition-all duration-1000 py-10 px-5 h-screen overflow-y-scroll scrollbar-hide">
                        {children}
                    </section>
                </div>
            }

        </>
    )
}

export default ParentLayout