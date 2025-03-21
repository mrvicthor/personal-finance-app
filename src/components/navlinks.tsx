import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./icon";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { links } from "@/helpers";
import { logout } from "@/app/actions/auth";

type NavProps = {
  isMinimized: boolean;
};

// create still and use transition to add opacity to link
const Navlinks = ({ isMinimized }: NavProps) => {
  const pathname = usePathname();

  return (
    <div className="mt-6">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              isActive
                ? "bg-[#f8f4f0] text-[#201f24] border-l-4 border-[#277c78]"
                : "text-[#b3b3b3] hover:text-[#f2f2f2]"
            } h-[3.5rem] flex items-center pl-6 gap-4 mr-6 rounded-r-lg`}
          >
            <Icon
              currentColor={isActive ? "#277c78" : "#b3b3b3"}
              path={link.icon}
            />

            {!isMinimized ? <span>{link.label}</span> : null}
          </Link>
        );
      })}
      <button
        onClick={() => logout()}
        className="ml-6 text-[#b3b3b3] mt-4 hover:text-[#f2f2f2] flex items-center gap-2"
      >
        <FaArrowRightFromBracket />
        <span className="block">Sign Out</span>
      </button>
    </div>
  );
};

export default Navlinks;
