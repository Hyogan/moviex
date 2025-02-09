'use client'
import React from "react";


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="text-4xl">Here is the layout{children}</div>
    );
};

export default Layout;