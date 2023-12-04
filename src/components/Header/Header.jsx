import React from "react";
import Logo from "@/components/Logo/Logo";
import { UserContext } from "@/context/UserContext";
import { getGreeting } from "@/resources/utils/getGreeting";
import { name } from "@/resources/helpers/name";
import "@/styles/Header/Header.scss";
import Link from "next/link";

const Header = () => {
  const { userData, logoutUser } = React.useContext(UserContext);
  const [firstName, setFirstName] = React.useState("");

  React.useEffect(() => {
    userData && setFirstName(name.firstName(userData.name));
  }, [userData]);

  if (userData)
    return (
      <header className="header">
        <Link href="/">
          <Logo />
        </Link>
        {/* <h2 className="header__title">
          <span className="header__title__name">
            Bem-vindo(a), <strong>{firstName}</strong>.
          </span>
          <span className="header__title__greeting"> {getGreeting()}</span>
        </h2> */}
        <button
          onClick={logoutUser}
          className="header__title__exit btn btn-warning mx-4"
        >
          Sair
        </button>
      </header>
    );
};

export default Header;
