import React from "react";
import { UserContext } from "@/context/UserContext";
import { getGreeting } from "@/resources/utils/getGreeting";
import { name } from "@/resources/helpers/name";
import "@/styles/Header/Header.scss";

const Header = () => {
  const { userData } = React.useContext(UserContext);
  const [firstName, setFirstName] = React.useState("");

  React.useEffect(() => {
    userData && setFirstName(name.firstName(userData.name));
  }, [userData]);

  if (userData)
    return (
      <header className="header">
        <h2 className="header__title">
          <span className="header__title__name">
            Bem-vindo(a), <strong>{firstName}</strong>.
          </span>
          <span className="header__title__greeting"> {getGreeting()}</span>
        </h2>
      </header>
    );
};

export default Header;
