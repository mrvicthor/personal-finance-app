import React from "react";
import Image from "next/image";
import financeLogo from "../../../public/assets/images/logo-large.svg";

const Header = () => {
  return (
    <header className="h-[4.36rem] md:hidden bg-[#201f24] fixed top-0 w-screen px-6 flex items-center justify-center rounded-b-lg">
      <Image src={financeLogo} alt="finance logo" priority />
    </header>
  );
};

export default Header;
