import React from 'react';
import { FaBell, FaBookmark, FaHistory, FaSearch } from "react-icons/fa";
import Hamburger from "@/app/components/hamburger";

const TopNavbar = () => {
    return (
        <nav className="flex items-center justify-between w-full  shadow-md px-6 bg-smooth_darkblue">
            {/* Logo & App Name */}
            <div className="flex items-center space-x-10">
                {/* Logo or Title */}
                <Hamburger />
                <div className="p-4 text-white border-b-2 border-white  font-bold text-lg">
                    <a className="w-full flex items-center justify-center text-center space-x-2">
                        <p className="w-[50px] h-[50px] rounded-full bg-white text-blue-900">MX</p>
                        <h1 className="text-2xl" >MovieX</h1>
                    </a>
                    {/*<p>loremkdoppkfsjfops;fodofj;oajdsojfo</p>*/}
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-6">
                <div className="relative">
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="Search for something..."
                    />
                    <FaSearch className="absolute right-3 top-2.5 text-gray-600 w-5 h-5" />
                </div>
            </div>

            {/* User Options */}
            <div className="flex items-center space-x-6 text-gray-700">
                <FaBell className="cursor-pointer text-gray-200 block  hover:scale-105 hover:text-white w-4 h-4" />
                <FaBookmark className="cursor-pointer text-gray-200 block  hover:scale-105 hover:text-white w-4 h-4" />
                <FaHistory className="cursor-pointer text-gray-200 block  hover:scale-105 hover:text-white w-4 h-4" />
                <div className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer overflow-hidden">
                    <img
                        src="/user-profile.jpg"
                        alt="User Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;