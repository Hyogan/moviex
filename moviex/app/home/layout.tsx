'use client'
import Image from "next/image";
import Navbar from "@/app/components/layout/navbar";
import TopNavbar from "@/app/components/top-navbar";
import {SidebarProvider, useSidebar} from "@/context/sidebarContext";
import React from "react";
import ProtectedRoute from "../components/shared/protectedRoutes";

const LayoutContent = ({children} : {children: React.ReactNode}) => {
    const { isOpen } = useSidebar();
    return (
        <ProtectedRoute>
            <div className="relative w-full min-h-screen rounded-xl">
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
                <div className="flex absolute inset-0 z-20 justify-center items-center">
                    <div className="bg-red-500/10 backdrop-blur-[15px] w-full h-full rounded-xl  p-8">
                        {/*<h1 className="text-2xl font-bold text-white">Hi sir</h1>*/}
                    </div>
                </div>
                <div className="overflow-y-hidden absolute inset-0 z-30">
                    <TopNavbar/>
                    <div className="flex gap-6 w-full max-w-full h-full">
                        <aside
                            className={`${isOpen? "w-48" : "w-0 bg-red-500"
                            } transition-all duration-300`}
                        >
                            <Navbar/>
                        </aside>
                        <div className="overflow-y-auto flex-1 pt-4 pr-6 w-full max-w-full transition-all duration-300">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
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