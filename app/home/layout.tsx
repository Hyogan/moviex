'use client'
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import TopNavbar from "@/app/components/top-navbar";
import {SidebarProvider, useSidebar} from "@/context/sidebarContext";
import React from "react";

const LayoutContent = ({children} : {children: React.ReactNode}) => {
    const { isOpen } = useSidebar();
    return (
            <div className="relative w-full min-h-screen  rounded-xl">
                {/*Background Image */}
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/images/spiderman.png" // Ensure this file is in the `public/images` folder
                        alt="Background"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="bg-red-500/10 backdrop-blur-[15px] w-full h-full rounded-xl  p-8">
                        {/*<h1 className="text-white text-2xl font-bold">Hi sir</h1>*/}
                    </div>
                </div>
                <div className="absolute inset-0 z-30 overflow-y-hidden">
                    <TopNavbar/>
                    <div className="gap-6 w-full h-full max-w-full flex ">
                        <aside
                            className={`${isOpen? "w-48" : "w-0 bg-red-500"
                            } transition-all duration-300`}
                        >
                            <Navbar/>
                        </aside>
                        <div className="w-full max-w-full pt-4 overflow-y-auto pr-6 flex-1 transition-all duration-300">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
    );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <LayoutContent>{children}</LayoutContent>
        </SidebarProvider>
    );
};

export default Layout;