"use client";
import React from "react";
import { links } from "@/helpers";
import Link from "next/link";
import Icon from "./icon";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <footer className="h-[4.625rem] md:hidden bg-[#201f24] fixed bottom-0 w-screen px-6">
      <div className="flex items-end justify-center h-full">
        <ul className="flex justify-around">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${
                    isActive
                      ? "bg-[#f8f4f0] text-[#201f24] border-b-4 border-[#277c78]"
                      : "text-[#b3b3b3] hover:text-[#f2f2f2]"
                  } h-[3.25rem] sm:h-[4.125rem] w-[4.2875rem] sm:w-[6.5rem] flex flex-col items-center justify-center rounded-t-lg`}
                >
                  <Icon
                    currentColor={isActive ? "#277c78" : "#b3b3b3"}
                    path={link.icon}
                  />
                  <span className="hidden sm:block text-[0.75rem] font-bold">
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

export default Header;
