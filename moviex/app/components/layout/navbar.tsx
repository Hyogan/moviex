'use client'
import React from 'react';
import Link from "next/link";
import {linkItemProps} from "@/app/interfaces/common";
import {FaDownload, FaHome} from 'react-icons/fa';
import {FaChartBar} from "react-icons/fa6";
import {MdCategory} from "react-icons/md";
import { BsBookmarkFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineHistory } from "react-icons/ai";
import {useSidebar} from "@/context/sidebarContext";
import {usePathname} from "next/navigation";
import { useAuth } from '@/context/AuthContext';
// import {usePathname, useRouter} from 'next/navigation';

const Navbar = ()=>  {
    const { isOpen, toggleSidebar } = useSidebar();
    const { user } = useAuth();
    const navLinks : Record<string,linkItemProps[]> = {
        generals: [
                {
                    id: 1,
                    link: '/home',
                    name: 'Home',
                    icon: FaHome
                },
                {
                id: 2,
                link: 'f',
                name: 'Trending',
                icon: FaChartBar

            },
               {
                   id: 3,
                   link: 'f',
                   name: 'Categories',
                   icon: MdCategory

               }
            ],
        savings: [
            {
                id: 4,
                link: 'f',
                name: 'History',
                icon: AiOutlineHistory
            },
            {
                id: 5,
                link: 'f',
                name: 'Saved',
                icon: BsBookmarkFill
            },
            {
                id: 6,
                link: 'f',
                name: 'Downloads',
                icon: FaDownload
            },
            ],
        user: [
            {
                id: 7,
                link: 'f',
                name: 'Settings',
                icon: FiSettings
            },
            {
                id: 8,
                link: 'f',
                name: 'Your account',
                icon: FaUserCircle
            },
        ]

    }
    return (
        <>
            <div
                className={`h-full w-full static pt-8  bg-smooth_darkblue left-0 z-50  flex flex-col overflow-y-auto p-2 transition-transform duration-1000 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Navigation Links */}
                <nav className="flex-1">
                    <div>{user?.name}</div>
                    {Object.entries(navLinks).map(([category, links]) => (
                        <div key={category}>
                            <ul className="px-1 py-2 space-y-2 text-white border-b-2 border-b-white">
                                {/*<h2 className="font-bold underline capitalize">{category}</h2>*/}
                                {links.map((linkElement: linkItemProps) => (
                                    <LinkItem toggleSidebar={toggleSidebar}  key={linkElement.id} linkItem={linkElement}/>
                                ))}
                            </ul>
                        </div>
                    ))}

                </nav>
                {/* Footer */}
                <div className="p-4 text-sm text-blue-300 bg-red-500 border-t border-blue-700">
                    © 2025 My Website
                </div>
            </div>
        </>
    );
};

type LinkItemComponentProps = {
    linkItem: linkItemProps;
    toggleSidebar: ()=> void;
};
const LinkItem: React.FC<LinkItemComponentProps> = ({linkItem, toggleSidebar}) => {
    // const router = useRouter();
    const pathname = usePathname();
    // alert(pathname);
    return (
        <li className={`${pathname === linkItem.link ? 'text-blue-600 border-r-2 border-r-blue-600' : ''}` }>
            <Link
                onClick={toggleSidebar}
                href={linkItem.link}
                className="flex gap-2 justify-start items-center px-2 py-2 space-x-2 w-full text-sm rounded-md transition hover:bg-high_darkblue"
            >
                <linkItem.icon/>
                {linkItem.name}
            </Link>
        </li>
    )
}
export default Navbar;