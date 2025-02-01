import React from 'react';
import {useSidebar} from "@/context/sidebarContext";

const Hamburger = () => {
    const { isOpen, toggleSidebar } = useSidebar();
    return (

        <div className="bg-primary absolute rounded-full z-40 left-8">
            <button
                onClick={() => toggleSidebar()}
                className={`hamburger menu-btn-side ${isOpen ? 'open' : ''}`}
                id="menu-btn-side"
            >
                <span className="hamburger-top"></span>
                <span className="hamburger-middle"></span>
                <span className="hamburger-bottom"></span>
            </button>
        </div>
    );
};

export default Hamburger;