import React from "react";
import Image from "next/image";
import Link from "next/link";
import arrowRight from "../../public/assets/images/icon-caret-right.svg";

type SubheaderProps = {
  title: string;
  description: string;
  href: string;
};

const Subheader = ({ title, description, href }: SubheaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="capitalize text-[#201f24] text-xl font-bold">{title}</h2>
      <Link href={`${href}`} className="capitalize flex gap-3">
        <span className="text-sm text-[#696868]">{description}</span>
        <Image src={arrowRight} alt="arrow right" />
      </Link>
    </div>
  );
};

export default Subheader;
