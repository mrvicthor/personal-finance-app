"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { logout } from "@/app/actions/auth";
import Button from "@/components/button";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import AddTransaction from "./AddTransaction";

const HomeClient = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <section aria-label="Transactions" className="px-4 sm:px-10">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <h1 className="text-[2rem] font-bold capitalize">transactions</h1>
        <Button
          title="add transaction"
          testId="add-transaction"
          handleModal={handleModalOpen}
        />
        <FaArrowRightFromBracket
          className="md:hidden"
          size={24}
          data-testid="logout-icon"
          onClick={() => logout()}
        />
      </div>
      {showModal && (
        <>
          {typeof document !== "undefined" ? (
            createPortal(
              <AddTransaction
                onClose={handleModalClose}
                closeButtonTestId="close-button"
              />,
              document.body
            )
          ) : (
            <AddTransaction
              onClose={handleModalClose}
              closeButtonTestId="close-button"
            />
          )}
        </>
      )}
      {children}
    </section>
  );
};

export default HomeClient;
