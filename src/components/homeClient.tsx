"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import Title from "./title";
import Button from "./button";
import AddBalance from "./addBalance";

const HomeClient = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <section className="px-4 sm:px-10">
      <div className="flex items-center justify-between">
        <Title title="overview" />{" "}
        <Button
          title="add new balance"
          handleModal={() => setShowModal(true)}
        />
      </div>
      {showModal &&
        createPortal(
          <AddBalance onClose={() => setShowModal(false)} />,
          document.body
        )}
      {children}
    </section>
  );
};

export default HomeClient;
