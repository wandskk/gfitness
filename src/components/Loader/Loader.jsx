"use client";

import React from "react";
import { UserContext } from "@/context/UserContext";
import { motion } from "framer-motion";
import "@/styles/Loader/Loader.scss";

const Loader = ({ showMe }) => {
  const { loading } = React.useContext(UserContext);

  if (showMe || loading)
    return (
      <motion.div
        className="loading"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <div className="loading__content"></div>
        <small className="loading__text">Por favor, aguarde.</small>
      </motion.div>
    );
};

export default Loader;
