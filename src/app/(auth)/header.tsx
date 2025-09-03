import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="h-[4.36rem] md:hidden bg-[#201f24] fixed top-0 w-screen px-6 flex items-center justify-center rounded-b-lg">
      <Image
        src="/assets/images/logo-large.svg"
        alt="finance logo"
        priority
        height={21.76}
        width={121.45}
      />
    </header>
  );
};

export default Header;
