import React from "react";
import Image from "next/image";
import bannerImage from "../../../public/assets/images/illustration-authentication.svg";

const Page = () => {
  return (
    <div>
      <div>
        <Image src={bannerImage} alt="illustration authentication" />
      </div>
      <div>
        <form></form>
      </div>
    </div>
  );
};

export default Page;
