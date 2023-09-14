"use client"

import React, { useState } from 'react'
import SideBar from './SideBar'
import { Inter, Urbanist } from "next/font/google";
import classNames from "classnames";

const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const ParentLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div
            className={classNames({
                "grid min-h-screen": true,
                "grid-cols-sidebar": !collapsed,
                "grid-cols-sidebar-collapsed": collapsed,
                "transition-[grid-template-columns] duration-300 ease-in-out": true,
                [`${urbanist.className}`]: true,
            })}>
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
            <section className="max-w-7xl w-full mx-auto transition-all duration-1000 py-10 px-5 h-screen">
                {children}
            </section>
        </div>
    )
}

export default ParentLayout