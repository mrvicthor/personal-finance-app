"use client";
import React, { ReactNode, useState } from "react";
import Button from "@/components/button";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { logout } from "@/app/actions/auth";
import { createPortal } from "react-dom";
import AddPot from "./AddPot";

const PotClient = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <section className="px-4 sm:px-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[2rem] font-bold capitalize">pots</h1>
        <Button
          title="add new pot"
          handleModal={() => setShowModal(true)}
          testId="add-pot-btn"
        />
        <FaArrowRightFromBracket
          className="md:hidden"
          size={24}
          onClick={() => logout()}
        />
      </div>
      {showModal &&
        createPortal(
          <AddPot onClose={() => setShowModal(false)} />,
          document.body
        )}
      {children}
    </section>
  );
};

export default PotClient;
