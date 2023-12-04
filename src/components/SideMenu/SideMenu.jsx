import React from "react";
import Logo from "../Logo/Logo";
import Link from "next/link";
import { AiOutlineHome, AiFillSetting } from "react-icons/ai";
import { BiMoneyWithdraw, BiLogOut } from "react-icons/bi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import "@/styles/SideMenu/SideMenu.scss";

const SideMenu = () => {
  const pathname = usePathname();

  return (
    <aside className="sideMenu">
      <div className="sideMenu__logo">
        <Logo />
      </div>
      <div className="sideMenu__menu">
        <ul className="sideMenu__list">
          <li className="sideMenu__list__item">
            <Link
              href="/"
              className={`d-flex align-items-center gap-4 ${
                pathname === "/" && "active"
              }`}
            >
              <AiOutlineHome /> Início
            </Link>
          </li>
          {/* <li className="sideMenu__list__item">
            <Link
              href="/finances"
              className={`d-flex align-items-center gap-4 ${
                pathname === "/finances" && "active"
              }`}
            >
              <BiMoneyWithdraw /> Financeiro
            </Link>
          </li> */}
          <li className="sideMenu__list__item">
            <Link
              href="/clients"
              className={`d-flex align-items-center gap-4 ${
                pathname === "/clients" && "active"
              }`}
            >
              <BsFillPersonLinesFill /> Alunos
            </Link>
          </li>          
          <li className="sideMenu__list__item">
            <Link
              href="/logout"
              className={`d-flex align-items-center gap-4 ${
                pathname === "/logout" && "active"
              }`}
            >
              <BiLogOut /> Sair
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideMenu;
