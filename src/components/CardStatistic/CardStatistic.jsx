import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiEmotionUnhappyFill } from "react-icons/ri";
import { BiSolidUserPlus } from "react-icons/bi";
import "@/styles/CardStatistic/CardStatistic.scss";

const CardStatistic = ({ type, data }) => {
  const cardTypes = {
    clients: {
      backgroundColor: "#4D0D63",
      icon: <AiFillHeart />,
      link: "/clients",
    },
    money: {
      backgroundColor: "#209F84",
      icon: <MdOutlineAttachMoney />,
    },
    late: {
      backgroundColor: "#FC2F58",
      icon: <RiEmotionUnhappyFill />,
    },
    monthSubscribes: {
      backgroundColor: "#3E9AEF",
      icon: <BiSolidUserPlus />,
    },
  };

  const handleLink = (type) => {
    if (type === "clients") window.location.href = cardTypes[type].link;
  };
  
  return (
    <div
      className="cardStatistic d-flex flex-column gap-2"
      onClick={() => handleLink(type)}
    >
      <div
        className="cardStatistic__icon d-flex align-items-center justify-center"
        style={{ backgroundColor: cardTypes[`${type}`].backgroundColor }}
      >
        {cardTypes[`${type}`].icon}
      </div>
      <h2 className="cardStatistic__number m-0">{data.value}</h2>
      <p className="cardStatistic__text m-0">{data.text}</p>
    </div>
  );
};

export default CardStatistic;
