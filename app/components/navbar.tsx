import React from 'react';
import Link from "next/link";
import {linkItemProps} from "@/app/interfaces/common";
import { FaHome } from 'react-icons/fa';
import {FaChartBar} from "react-icons/fa6";

const Navbar = ()=>  {
    const navLinks : linkItemProps[] = [
        {
            id: 1,
            link: 'f',
            name: 'Home',
            icon: FaHome
        },
        {
            id: 1,
            link: 'f',
            name: 'Trending',
            icon: FaChartBar

        }
    ]
    return (
        <div className="h-full bg-blue-900 fixed left-0 z-50 w-fit flex flex-col overflow-y-auto p-2">
            {/* Logo or Title */}
            <div className="p-4 text-white border-b-2 border-white text-center font-bold text-lg">
                <a className="w-full flex items-center justify-center space-x-2">
                    <p className="w-[50px] h-[50px] rounded-full bg-white text-blue-900">MX</p>
                    <h1 className="text-2xl">MovieX</h1>
                </a>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1">
                <ul className="text-white space-y-2 p-4">
                    {navLinks.map((linkElement: linkItemProps) => (
                        <LinkItem key={linkElement.id}  linkItem={linkElement} />
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 text-sm text-blue-300 border-t border-blue-700">
                © 2025 My Website
            </div>
        </div>
    );
};

type LinkItemComponentProps = {
    linkItem: linkItemProps;
};
const LinkItem: React.FC<LinkItemComponentProps> = ({linkItem}) => {

    return (
        <li>
            <Link
                href={linkItem.link}
                className="flex items-center justify-start gap-2 text-2xl space-x-2 w-full px-3 py-2 rounded-md hover:bg-blue-700 transition"
            >
                <linkItem.icon />
                {linkItem.name}
            </Link>
        </li>
    )
}
export default Navbar;