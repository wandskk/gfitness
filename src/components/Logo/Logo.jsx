import React from "react";
import Image from "next/image";
import FFitnessLogo from "@/assets/images/ForFITNESS.png";
import "@/styles/Logo/Logo.scss";

const Logo = () => {
  return (
    <div className="logo">
      <Image priority className="logo__image" src={FFitnessLogo} alt="GFitness Logo" />
    </div>
  );
};

export default Logo;
