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
    const [userData, setUserState] = useRecoilState(userState);
    const { getToken } = useAuth()

    // const pathname = usePathname()

    const router = useRouter()


    const getData = async () => {
        let token = await getToken()
        let user = await getUserData(token)
        setUserState({
            ...user,
            isLoaded: true
        })
    }

    useEffect(() => {
        getData()
    }, []);

    let searchParams = useSearchParams()

    let success = searchParams.get("success")
    let cancelled = searchParams.get("cancelled")

    success = Boolean(success);
    cancelled = Boolean(cancelled);

    useEffect(() => {
        if (success) {
            toast.success("Payment Successful");
            setTimeout(() => {
                router.push("/")

            }, 2000)
        }

        if (cancelled) {
            toast.error("Payment Failed");
            setTimeout(() => {
                router.push("/");
            }, 2000)
        }

    }, [success, cancelled])


    // console.log(userData, "userData");

    return (
        <div
            className={classNames({
                "grid h-screen overflow-hidden": true,
                "grid-cols-sidebar": !collapsed,
                "grid-cols-sidebar-collapsed": collapsed,
                "transition-[grid-template-columns] duration-300 ease-in-out": true,
                [`${urbanist.className}`]: true,
            })}>
            {
                <SideBar collapsed={collapsed} setCollapsed={setCollapsed} isLoaded={userData.isLoaded} user={userData} />
            }

            <section className="max-w-7xl w-full mx-auto transition-all duration-1000 py-10 px-5 h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-brand scrollbar-track-gray-300">
                {children}
            </section>
        </div>
    )
}

export default ParentLayout