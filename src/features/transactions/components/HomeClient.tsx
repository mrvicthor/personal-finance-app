"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { logout } from "@/app/actions/auth";
import Button from "@/components/button";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import AddTransaction from "./AddTransaction";

const HomeClient = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section aria-label="Transactions" className="px-4 sm:px-10">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <h1 className="text-[2rem] font-bold capitalize">transactions</h1>
        <Button
          title="add transaction"
          testId="add-transaction"
          handleModal={() => setShowModal(true)}
        />
        <FaArrowRightFromBracket
          className="md:hidden"
          size={24}
          onClick={() => logout()}
        />
      </div>
      {showModal &&
        createPortal(
          <AddTransaction
            onClose={() => setShowModal(false)}
            closeButtonTestId="close-button"
          />,
          document.body
        )}
      {children}
    </section>
  );
};

export default HomeClient;
