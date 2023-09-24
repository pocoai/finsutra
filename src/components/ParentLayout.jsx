"use client"

import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Inter, Urbanist } from "next/font/google";
import classNames from "classnames";
import { useAuth, useUser } from '@clerk/nextjs';
import { useRecoilState } from 'recoil';
import { getUserData } from '@/services/user';
import { userState } from '@/state/atoms/userState';
import { usePathname, useRouter } from 'next/navigation';

const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const ParentLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(true)
    const [userData, setUserState] = useRecoilState(userState);
    const { getToken } = useAuth()

    const pathname = usePathname()


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
    }, [pathname]);



    return (
        <div
            className={classNames({
                "grid min-h-screen": true,
                "grid-cols-sidebar": !collapsed,
                "grid-cols-sidebar-collapsed": collapsed,
                "transition-[grid-template-columns] duration-300 ease-in-out": true,
                [`${urbanist.className}`]: true,
            })}>
            {
                <SideBar collapsed={collapsed} setCollapsed={setCollapsed} isLoaded={userData.isLoaded} user={userData} />
            }

            <section className="max-w-7xl w-full mx-auto transition-all duration-1000 py-10 px-5 h-screen">
                {children}
            </section>
        </div>
    )
}

export default ParentLayout