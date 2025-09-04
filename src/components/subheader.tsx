import React from "react";
import Image from "next/image";
import Link from "next/link";

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
        <Image
          src="/assets/images/icon-caret-right.svg"
          alt="arrow right"
          height={4.5}
          width={8.25}
        />
      </Link>
    </div>
  );
};

export default Subheader;
