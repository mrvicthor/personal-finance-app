"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Title from "./title";
import Button from "./button";
import AddBalance from "./addBalance";
import { logout } from "@/app/actions/auth";
import { usePushNotificationManager } from "@/hooks/useNotification";

const HomeClient = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  usePushNotificationManager();
  return (
    <section aria-label="Overview" className="px-4 sm:px-10">
      <div className="flex items-center justify-between gap-4">
        <Title title="overview" />{" "}
        <Button
          title="add new balance"
          handleModal={() => setShowModal(true)}
        />
        <FaArrowRightFromBracket
          className="md:hidden"
          size={24}
          data-testid="logout-icon"
          onClick={() => logout()}
        />
      </div>
      {showModal &&
        createPortal(
          <AddBalance
            onClose={() => setShowModal(false)}
            closeButtonTestId="close-modal-btn"
          />,
          document.body
        )}
      {children}
    </section>
  );
};

export default HomeClient;
