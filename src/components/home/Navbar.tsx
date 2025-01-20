"use client";

import Link from "next/link";
import { GrTechnology } from 'react-icons/gr';
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { links } from '@/utils/index';
import { useState } from "react";

interface NavbarProps {
    isAdmin: boolean;
}

const Navbar = ({ isAdmin }: NavbarProps) => {

    const [toggle, setToggle] = useState(false);
    const handleToggle = () => {
        setToggle(prev => !prev)     
    }

  return (
    <nav className="flex items-center gap-5">
        <div>
            <Link 
                className="hidden lg:flex items-center text-2xl font-medium text-[rgb(176,15,176)]" 
                href='/'>
                    Cloud<GrTechnology />Hosting
            </Link>
            <div className="lg:hidden text-4xl font-bold text-[#202121] cursor-pointer">
                {toggle 
                ? (<IoMdClose onClick={handleToggle} />) 
                : (<AiOutlineMenu onClick={handleToggle} />)
                }
            </div>
        </div>
        <div 
            style={{clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" || ""}}
            className="close max-lg:absolute top-full left-0 w-full bg-[rgb(227,225,255)] z-[100] transition-all duration-500">
            <ul className="flex items-center gap-2 max-lg:flex-col max-lg:items-start max-lg:justify-center max-lg:pl-8 max-lg:pb-3">
                {links.map((link, index) => (
                    isAdmin === false 
                    ? link.path !== '/admin' &&
                    (
                        <Link 
                            key={index} 
                            className="text-xl font-semibold" 
                            href={link.path}
                            onClick={() => setToggle(false)}
                        >{link.label}</Link>
                    )    
                    : 
                    (   
                        <Link 
                            key={index} 
                            className="text-xl font-semibold" 
                            href={link.path}
                            onClick={() => setToggle(false)}
                        >{link.label}</Link>
                    )
                ))}
            </ul>
        </div>
    </nav>
  );
}

export default Navbar;